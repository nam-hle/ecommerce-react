import { useCallback, useEffect, useState } from "react";

import { Product } from "../redux";
import firebase from "../services/firebase";

import { useDidMount } from "./useDidMount";

export const useFeaturedProducts = (itemsCount: number) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const didMount = useDidMount(true);

  const fetchFeaturedProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const docs = await firebase.getFeaturedProducts(itemsCount);

      if (docs.empty) {
        if (didMount) {
          setError("No featured products found.");
          setLoading(false);
        }
      } else {
        const items: Product[] = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ ...data, id: snap.ref.id });
        });

        if (didMount) {
          setFeaturedProducts(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError("Failed to fetch featured products");
        setLoading(false);
      }
    }
  }, [didMount, itemsCount]);

  useEffect(() => {
    if (featuredProducts.length === 0 && didMount) {
      fetchFeaturedProducts();
    }
  }, [didMount, featuredProducts.length, fetchFeaturedProducts]);

  return {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading,
    error,
  };
};
