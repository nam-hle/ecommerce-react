import { LoadingOutlined } from "@ant-design/icons";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Boundary, MessageDisplay, ProductGrid } from "../../components";
import { useDidMount } from "../../hooks";

import { setRequestStatus, searchProduct, AppState, Product, BasketState, MiscState } from "../../redux";

export const Search: React.FC<SearchProps> = ({ match }) => {
  const { searchKey } = match.params;
  const dispatch = useDispatch();
  const didMount = useDidMount(true);
  const store = useSelector<
    AppState,
    { isLoading: boolean; products: Product[]; basket: BasketState; requestStatus: MiscState["requestStatus"] }
  >((state) => ({
    isLoading: state.app.loading,
    products: state.products.searchedProducts.items,
    basket: state.basket,
    requestStatus: state.app.requestStatus,
  }));

  useEffect(() => {
    if (didMount && !store.isLoading && searchKey) {
      dispatch(searchProduct.started({ searchKey }));
    }
  }, [didMount, searchKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(
    () => () => {
      dispatch(setRequestStatus({ message: "" }));
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (store.requestStatus && !store.isLoading) {
    return (
      <main className="content">
        <MessageDisplay message={store.requestStatus.message} description="Try using correct filters or keyword." />
      </main>
    );
  }

  if (!store.requestStatus && !store.isLoading) {
    return (
      <Boundary>
        <main className="content">
          <section className="product-list-wrapper product-list-search">
            {!store.requestStatus && (
              <div className="product-list-header">
                <div className="product-list-header-title">
                  <h5>
                    {`Found ${store.products.length} ${
                      store.products.length > 1 ? "products" : "product"
                    } with keyword ${searchKey}`}
                  </h5>
                </div>
              </div>
            )}
            <ProductGrid products={store.products} />
          </section>
        </main>
      </Boundary>
    );
  }

  return (
    <main className="content">
      <div className="loader">
        <h4>Searching Product...</h4>
        <br />
        <LoadingOutlined style={{ fontSize: "3rem" }} />
      </div>
    </main>
  );
};

type SearchProps = {
  match: {
    params: { searchKey?: string };
  };
};
