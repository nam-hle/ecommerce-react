import React from "react";
import { shallowEqual, useSelector } from "react-redux";

import { ProductAppliedFilters, ProductGrid, ProductList } from "../../components/product";
import { useDocumentTitle, useScrollTop } from "../../hooks";
import { MiscState, AppState, Product, ProductState, selectFilter } from "../../redux";

type ShopSelectorResult = {
  filteredProducts: Product[];
  products: ProductState;
  requestStatus: MiscState["requestStatus"];
  isLoading: MiscState["loading"];
};

export const Shop = () => {
  useDocumentTitle("Shop | Salinaka");
  useScrollTop();

  const store = useSelector<AppState, ShopSelectorResult>(
    (state) => ({
      filteredProducts: selectFilter(state.products.items, state.filter),
      products: state.products,
      requestStatus: state.app.requestStatus,
      isLoading: state.app.loading,
    }),
    shallowEqual
  );

  return (
    <main className="content">
      <section className="product-list-wrapper">
        <ProductAppliedFilters filteredProductsCount={store.filteredProducts.length} />
        <ProductList {...store}>
          <ProductGrid products={store.filteredProducts} />
        </ProductList>
      </section>
    </main>
  );
};
