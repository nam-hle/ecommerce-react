import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { ProductAppliedFilters, ProductList, Boundary } from "../../../components";
import { useDocumentTitle, useScrollTop } from "../../../hooks";
import { AppState, MiscState, Product, ProductState, selectFilter } from "../../../redux";

import { ProductsNavbar, ProductsTable } from "../components";

type ProductsProps = RouteComponentProps;

const _Products: React.FC<ProductsProps> = () => {
  useDocumentTitle("Product List | Salinaka Admin");
  useScrollTop();

  const store = useSelector<
    AppState,
    {
      filteredProducts: Product[];
      requestStatus: MiscState["requestStatus"];
      isLoading: boolean;
      products: ProductState;
    }
  >((state) => ({
    filteredProducts: selectFilter(state.products.items, state.filter),
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    products: state.products,
  }));

  return (
    <Boundary>
      <ProductsNavbar productsCount={store.products.items.length} totalProductsCount={store.products.total} />
      <div className="product-admin-items">
        <ProductList {...store}>
          <ProductAppliedFilters filteredProductsCount={store.filteredProducts.length} />
          <ProductsTable filteredProducts={store.filteredProducts} />
        </ProductList>
      </div>
    </Boundary>
  );
};

export const Products = withRouter(_Products);
