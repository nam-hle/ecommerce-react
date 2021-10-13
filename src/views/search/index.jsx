import { LoadingOutlined } from "@ant-design/icons";

import PropType from "prop-types";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Boundary, MessageDisplay } from "../../components/common";
import { ProductGrid } from "../../components/product";
import { useDidMount } from "../../hooks";

import { setRequestStatus, searchProduct } from "../../redux";

export const Search : React.FC<SearchProps> = ({ match }) => {
  const { searchKey } = match.params;
  const dispatch = useDispatch();
  const didMount = useDidMount(true);
  const store = useSelector((state) => ({
    isLoading: state.app.loading,
    products: state.products.searchedProducts.items,
    basket: state.basket,
    requestStatus: state.app.requestStatus,
  }));

  useEffect(() => {
    if (didMount && !store.isLoading) {
      dispatch(searchProduct(searchKey));
    }
  }, [didMount, dispatch, searchKey, store.isLoading]);

  useEffect(
    () => () => {
      dispatch(setRequestStatus(""));
    },
    [dispatch]
  );

  if (store.requestStatus && !store.isLoading) {
    return (
      <main className="content">
        <MessageDisplay message={store.requestStatus} desc="Try using correct filters or keyword." />
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
  match: PropType.shape({
    params: PropType.shape({
      searchKey?: string,
    }),
  }).isRequired,
};

export default Search;
