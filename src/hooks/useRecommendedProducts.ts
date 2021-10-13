import { useCallback, useEffect, useState } from "react";

import { Product } from "../redux";
import firebase from "../services/firebase";

import { useDidMount } from "./useDidMount";

export const useRecommendedProducts = (itemsCount: number) => {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const didMount = useDidMount(true);

  const fetchRecommendedProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const docs = await firebase.getRecommendedProducts(itemsCount);

      if (docs.empty) {
        if (didMount) {
          setError("No recommended products found.");
          setLoading(false);
        }
      } else {
        const items: Product[] = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ ...data, id: snap.ref.id });
        });

        if (didMount) {
          setRecommendedProducts(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError("Failed to fetch recommended products");
        setLoading(false);
      }
    }
  }, [didMount, itemsCount]);

  useEffect(() => {
    if (recommendedProducts.length === 0 && didMount) {
      fetchRecommendedProducts();
    }
  }, [didMount, fetchRecommendedProducts, recommendedProducts.length]);

  return {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading,
    error,
  };
};
