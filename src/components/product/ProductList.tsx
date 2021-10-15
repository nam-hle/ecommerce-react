import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setLoading, getProducts, Product, SearchedProduct } from "../../redux";
import { Boundary, MessageDisplay } from "../common";

export const ProductList: React.FC<ProductListProps> = (props) => {
  const { products, filteredProducts, isLoading, requestStatus, children } = props;
  const [isFetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  const fetchProducts = useCallback(() => {
    setFetching(true);
    dispatch(getProducts.started(products.lastRefKey));
  }, [products.lastRefKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // @ts-ignore
  useEffect(() => {
    if (products.items.length === 0 || !products.lastRefKey) {
      fetchProducts();
    }

    window.scrollTo(0, 0);
    return () => dispatch(setLoading(false));
  }, [fetchProducts, products.items.length, products.lastRefKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setFetching(false);
  }, [products.lastRefKey]);

  if (filteredProducts.length === 0 && !isLoading) {
    return <MessageDisplay message={requestStatus?.message || "No products found."} />;
  }
  if (filteredProducts.length === 0 && requestStatus) {
    return (
      <MessageDisplay
        message={requestStatus?.message || "Something went wrong :("}
        action={fetchProducts}
        buttonLabel="Try Again"
      />
    );
  }
  return (
    <Boundary>
      {children}
      {/* Show 'Show More' button if products length is less than total products */}
      {products.items.length < products.total && (
        <div className="d-flex-center padding-l">
          <button className="button button-small" disabled={isFetching} onClick={fetchProducts} type="button">
            {isFetching ? "Fetching Items..." : "Show More Items"}
          </button>
        </div>
      )}
    </Boundary>
  );
};

ProductList.defaultProps = {
  requestStatus: undefined,
};

type ProductListProps = {
  products: SearchedProduct;
  filteredProducts: Product[];
  isLoading: boolean;
  requestStatus?: { message: string };
  children: React.ReactNode[] | React.ReactNode;
};
