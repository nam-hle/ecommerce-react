import React from "react";

import { Product } from "../../redux";

import { ProductFeatured } from "./ProductFeatured";

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ products, skeletonCount }) => (
  <div className="product-display-grid">
    {products.length === 0
      ? new Array(skeletonCount)
          .fill({})
          .map((product, index) => <ProductFeatured key={`product-skeleton ${index}`} product={product} />)
      : products.map((product) => <ProductFeatured key={product.id} product={product} />)}
  </div>
);

ProductShowcase.defaultProps = {
  skeletonCount: 4,
};

type ProductShowcaseProps = {
  products: Product[];
  skeletonCount?: number;
};
