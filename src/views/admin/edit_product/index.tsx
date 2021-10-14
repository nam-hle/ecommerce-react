import { LoadingOutlined } from "@ant-design/icons";
import React, { lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";

import { useDocumentTitle, useProduct, useScrollTop } from "../../../hooks";
import { editProduct } from "../../../redux";
import { ProductFormSchema } from "../components/ProductForm";

const ProductForm = lazy(() =>
  import("../components/ProductForm").then(({ ProductForm }) => ({ default: ProductForm }))
);

const _EditProduct: React.FC<EditProductProps> = ({ match }) => {
  useDocumentTitle("Edit Product | Salinaka");
  useScrollTop();
  const { product, error, isLoading } = useProduct(match.params.id ?? "");
  const dispatch = useDispatch();

  const onSubmitForm = (updates: ProductFormSchema) => {
    dispatch(editProduct.started({ id: product?.id ?? "", updates }));
  };

  return (
    <div className="product-form-container">
      {error && <Redirect to="/dashboard/products" />}
      <h2>Edit Product</h2>
      {product && (
        <Suspense
          fallback={
            <div className="loader" style={{ minHeight: "80vh" }}>
              <h6>Loading ... </h6>
              <br />
              <LoadingOutlined />
            </div>
          }>
          <ProductForm isLoading={isLoading} onSubmit={onSubmitForm} product={product} />
        </Suspense>
      )}
    </div>
  );
};

type EditProductProps = RouteComponentProps & {
  match: {
    params: { id?: string };
  };
};

export const EditProduct = withRouter(_EditProduct);
