import * as fs from "fs";
import * as Path from "path";

import * as axios from "axios";
import DotEnv from "dotenv";
import Faker from "faker";
import app from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { Product } from "../redux";
DotEnv.config({ path: Path.join(__dirname, "..", "..", ".env.dev") });

import firebaseConfig from "./config";

class Firebase {
  private storage: ReturnType<typeof app.storage>;
  private db: ReturnType<typeof app.firestore>;
  public auth: ReturnType<typeof app.auth>;

  constructor() {
    console.log(firebaseConfig);
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }

    this.storage = app.storage();
    this.db = app.firestore();
    this.auth = app.auth();
  }
  generateKey = () => this.db.collection("products").doc().id;

  storeImage = async (id: string, folder: string, imageFile: ArrayBuffer) => {
    const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
    return await snapshot.ref.getDownloadURL();
  };

  // AUTH ACTIONS ------------
  addProduct = async () => {
    await this.auth.signInWithEmailAndPassword("test@gmail.com", "A123123123");
    for (let i = 0; i < 10; i++) {
      console.log(i);
      const key = this.generateKey();
      const imageFile = fs.readFileSync(
        Path.join(__dirname, "..", "..", "generate", Math.floor(Math.random() * 10) + ".png")
      );
      const downloadURL = await this.storeImage(key, "products", imageFile);
      const image = { id: key, url: downloadURL };

      const maxQuantity = Math.floor(Math.random() * 1000);
      const description = Faker.commerce.productDescription();
      const product: Product = {
        id: uuidv4(),
        imageUrl: "",
        quantity: Math.floor(Math.random() * maxQuantity),
        availableColors: Faker.random.arrayElements(
          [
            "LightCoral",
            "Crimson",
            "HotPink",
            "PaleVioletRed",
            "Coral",
            "LightSalmon",
            "Gold",
            "MediumPurple",
            "Purple",
            "YellowGreen",
            "Teal",
            "Cyan",
            "LightBlue",
          ],
          7
        ),
        brand: Faker.company.companyName(),
        description,
        maxQuantity,
        name: Faker.commerce.productName(),
        price: Math.floor(Math.random() * 1000),
        sizes: Faker.random.arrayElements([3, 4, 5, 6, 7, 8, 9, 10], 4),
        isFeatured: Math.random() < 0.7,
        isRecommended: Math.random() < 0.7,
        keywords: Faker.random.arrayElements(description.split(" "), 3),
        image: downloadURL,
        imageCollection: [image],
      };

      await this.db.collection("products").doc(key).set(product);
    }
  };
}

// @ts-ignore
const firebaseInstance = new Firebase();

firebaseInstance
  .addProduct()
  .then(() => {
    console.log("Successfully added product");
    process.exit(0);
  })
  .catch((e) => console.log(e));

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const download_image = (url: string, image_path: string) =>
  axios
    .default({
      url,
      responseType: "stream",
    })
    .then(
      (response) =>
        new Promise((resolve, reject) => {
          (response as any).data
            .pipe(fs.createWriteStream(image_path))
            .on("finish", () => resolve({}))
            .on("error", (e: any) => reject(e));
        })
    );

// (async () => {
//   for (let i = 0; i < 10; i++) {
//     console.log(i);
//     await download_image(Faker.image.fashion(480, 480), Path.join(__dirname, "..", "..", "generate", i + ".png"));
//   }
// })();
