import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";

import { BasketState, Profile, Product, EditProductPayload } from "../redux";

import firebaseConfig from "./config";

import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

class Firebase {
  private storage: ReturnType<typeof app.storage>;
  private db: ReturnType<typeof app.firestore>;
  public auth: ReturnType<typeof app.auth>;

  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }

    this.storage = app.storage();
    this.db = app.firestore();
    this.auth = app.auth();
  }

  // AUTH ACTIONS ------------

  createAccount = (email: string, password: string) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  signIn = (email: string, password: string) => this.auth.signInWithEmailAndPassword(email, password);

  signInWithGoogle = () => this.auth.signInWithPopup(new app.auth.GoogleAuthProvider());

  signInWithFacebook = () => this.auth.signInWithPopup(new app.auth.FacebookAuthProvider());

  signInWithGithub = () => this.auth.signInWithPopup(new app.auth.GithubAuthProvider());

  signOut = () => this.auth.signOut();

  passwordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  addUser = (id: string, user: Profile) => this.db.collection("users").doc(id).set(user);

  getUser = (id: string) => this.db.collection("users").doc(id).get();

  passwordUpdate = (password: string) => this.auth.currentUser?.updatePassword(password);

  changePassword = (currentPassword: string, newPassword: string) =>
    new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = this.auth.currentUser;
          user
            ?.updatePassword(newPassword)
            .then(() => resolve("Password updated successfully!"))
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });

  reauthenticate = (currentPassword: string) => {
    const user = this.auth.currentUser;
    if (!user?.email) {
      throw new Error("reauthenticate");
    }
    const cred = app.auth.EmailAuthProvider.credential(user.email, currentPassword);

    return user.reauthenticateWithCredential(cred);
  };

  updateEmail = (currentPassword: string, newEmail: string) =>
    new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = this.auth.currentUser;
          user
            ?.updateEmail(newEmail)
            .then(() => resolve("Email Successfully updated"))
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });

  updateProfile = (id: string, updates: Partial<Profile>) => this.db.collection("users").doc(id).update(updates);

  onAuthStateChanged = () =>
    new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error("Auth State Changed failed"));
        }
      });
    });

  saveBasketItems = (items: BasketState, userId: string) =>
    this.db.collection("users").doc(userId).update({ basket: items });

  setAuthPersistence = () => this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);

  // PRODUCT ACTIONS --------------

  getSingleProduct = (id: string) => this.db.collection("products").doc(id).get() as Promise<DocumentSnapshot<Product>>;

  getProducts = (lastRefKey: string | null) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          console.log({ lastRefKey });
          try {
            const query = this.db
              .collection("products")
              .orderBy(app.firestore.FieldPath.documentId())
              .startAfter(lastRefKey)
              .limit(12);

            const snapshot = (await query.get()) as app.firestore.QuerySnapshot<Product>;
            const products: Product[] = [];
            snapshot.forEach((doc) => products.push({ ...doc.data(), id: doc.id }));
            console.log({ snapshot, products });
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ items: products, lastKey });
          } catch (e: any) {
            reject(e?.message || ":( Failed to fetch products.");
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error("Request timeout, please try again"));
          }, 15000);

          try {
            const totalQuery = await this.db.collection("products").get();
            const total = totalQuery.docs.length;
            const query = this.db.collection("products").orderBy(app.firestore.FieldPath.documentId()).limit(12);
            const snapshot = (await query.get()) as app.firestore.QuerySnapshot<Product>;

            clearTimeout(timeout);
            if (!didTimeout) {
              const products: Product[] = [];
              snapshot.forEach((doc) => products.push({ ...doc.data(), id: doc.id }));
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ items: products, lastKey, total });
            }
          } catch (e: any) {
            if (didTimeout) {
              return;
            }
            reject(e?.message || ":( Failed to fetch products.");
          }
        }
      })();
    });
  };

  searchProducts = (searchKey: string) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        const productsRef = this.db.collection("products");

        const timeout = setTimeout(() => {
          didTimeout = true;
          reject(new Error("Request timeout, please try again"));
        }, 15000);

        try {
          const searchedNameRef = productsRef
            .orderBy("name_lower")
            .where("name_lower", ">=", searchKey)
            .where("name_lower", "<=", `${searchKey}\uf8ff`)
            .limit(12) as app.firestore.Query<Product>;
          const searchedKeywordsRef = productsRef
            .orderBy("dateAdded", "desc")
            .where("keywords", "array-contains-any", searchKey.split(" "))
            .limit(12) as app.firestore.Query<Product>;

          // const totalResult = await totalQueryRef.get();
          const nameSnaps = await searchedNameRef.get();
          const keywordsSnaps = await searchedKeywordsRef.get();
          // const total = totalResult.docs.length;

          clearTimeout(timeout);
          if (!didTimeout) {
            const searchedNameProducts: Product[] = [];
            const searchedKeywordsProducts: Product[] = [];
            let lastKey = null;

            if (!nameSnaps.empty) {
              nameSnaps.forEach((doc) => {
                searchedNameProducts.push({ ...doc.data(), id: doc.id });
              });
              lastKey = nameSnaps.docs[nameSnaps.docs.length - 1];
            }

            if (!keywordsSnaps.empty) {
              keywordsSnaps.forEach((doc) => {
                searchedKeywordsProducts.push({ ...doc.data(), id: doc.id });
              });
            }

            // MERGE PRODUCTS
            const mergedProducts = [...searchedNameProducts, ...searchedKeywordsProducts];
            const hash: Record<string, Product> = {};

            mergedProducts.forEach((product) => {
              hash[product.id] = product;
            });

            resolve({ products: Object.values(hash), lastKey });
          }
        } catch (e) {
          if (didTimeout) {
            return;
          }
          reject(e);
        }
      })();
    });
  };

  getFeaturedProducts = (itemsCount = 12) =>
    this.db.collection("products").where("isFeatured", "==", true).limit(itemsCount).get() as Promise<
      app.firestore.QuerySnapshot<Product>
    >;

  getRecommendedProducts = (itemsCount = 12) =>
    this.db.collection("products").where("isRecommended", "==", true).limit(itemsCount).get() as Promise<
      app.firestore.QuerySnapshot<Product>
    >;

  addProduct = (id: string, product: Product) => this.db.collection("products").doc(id).set(product);

  generateKey = () => this.db.collection("products").doc().id;

  storeImage = async (id: string, folder: string, imageFile: File) => {
    const snapshot = await this.storage
      .ref(folder)
      .child(id)
      .put(new Blob([imageFile], { type: "text/plain" }));
    const downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
  };

  deleteImage = (id: string) => this.storage.ref("products").child(id).delete();

  editProduct = (id: string, updates: EditProductPayload["updates"]) =>
    this.db.collection("products").doc(id).update(updates);

  removeProduct = (id: string) => this.db.collection("products").doc(id).delete();
}

export const firebaseInstance = new Firebase();

export default firebaseInstance;
