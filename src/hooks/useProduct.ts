import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Product, AppState } from "../redux";
import firebase from "../services/firebase";

import { useDidMount } from "./useDidMount";

export const useProduct = (id: string) => {
  // get and check if product exists in store
  const storeProduct = useSelector<AppState, Product | undefined>((state) =>
    state.products.items.find((item) => item.id === id)
  );

  const [product, setProduct] = useState(storeProduct);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const didMount = useDidMount(true);

  useEffect(() => {
    (async () => {
      try {
        if (!product || product.id !== id) {
          setLoading(true);
          const doc: { exists: boolean; ref: { id: string }; data: () => any } = await firebase.getSingleProduct(id);

          if (doc.exists) {
            const data: Product = { ...doc.data(), id: doc.ref.id };

            if (didMount) {
              setProduct(data);
              setLoading(false);
            }
          } else {
            setError("Product not found.");
          }
        }
      } catch (err: any) {
        if (didMount) {
          setLoading(false);
          setError(err?.message || "Something went wrong.");
        }
      }
    })();
  }, [didMount, id, product]);

  return { product, isLoading, error };
};
