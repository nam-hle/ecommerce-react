import React from "react";
import { shallowEqual, useSelector } from "react-redux";

import { AppliedFilters, ProductGrid, ProductList } from "../../components/product";
import { useDocumentTitle, useScrollTop } from "../../hooks";
import { AppState } from "../../redux/reducers";
import { MiscState } from "../../redux/reducers/miscReducer";
import { Product, ProductState } from "../../redux/reducers/productReducer";
import { selectFilter } from "../../selectors/selector";

type ShopSelectorResult = {
  filteredProducts: Product[];
  products: ProductState;
  requestStatus: MiscState["requestStatus"];
  isLoading: MiscState["loading"];
};

const Shop = () => {
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
        <AppliedFilters filteredProductsCount={store.filteredProducts.length} />
        <ProductList {...store}>
          <ProductGrid products={store.filteredProducts} />
        </ProductList>
      </section>
    </main>
  );
};

export default Shop;
