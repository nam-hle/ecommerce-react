import { LoadingOutlined } from "@ant-design/icons";

import React, { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import { useDocumentTitle, useScrollTop } from "../../../hooks";
import { addProduct, AddProductPayload, AppState } from "../../../redux";

const ProductForm = lazy(() =>
  import("../components/ProductForm").then(({ ProductForm }) => ({ default: ProductForm }))
);

const _AddProduct: React.FC<AddProductProps> = () => {
  useScrollTop();
  useDocumentTitle("Add New Product | Salinaka");
  const isLoading = useSelector<AppState, boolean>((state) => state.app.loading);
  const dispatch = useDispatch();

  const onSubmit = (product: AddProductPayload) => {
    dispatch(addProduct.started(product));
  };

  return (
    <div className="product-form-container">
      <h2>Add New Product</h2>
      <Suspense
        fallback={
          <div className="loader" style={{ minHeight: "80vh" }}>
            <h6>Loading ... </h6>
            <br />
            <LoadingOutlined />
          </div>
        }>
        <ProductForm
          isLoading={isLoading}
          onSubmit={onSubmit}
          product={{
            id: uuidv4(),
            name: "",
            brand: "",
            price: 0,
            maxQuantity: 0,
            description: "",
            keywords: [],
            sizes: [],
            image: "",
            isFeatured: false,
            isRecommended: false,
            availableColors: [],
            imageCollection: [],
            imageUrl: "",
            quantity: 1,
          }}
        />
      </Suspense>
    </div>
  );
};

type AddProductProps = RouteComponentProps;

export const AddProduct = withRouter(_AddProduct);
