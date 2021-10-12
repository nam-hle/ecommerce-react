import React from "react";

import { useBasket } from "../../hooks";
import { Product } from "../../redux";

import { ProductItem } from "./ProductItem";

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { addToBasket, isItemOnBasket } = useBasket();

  return (
    <div className="product-grid">
      {products.length === 0
        ? new Array(12)
            .fill({})
            .map((product, index) => <ProductItem key={`product-skeleton ${index}`} product={product} />)
        : products.map((product) => (
            <ProductItem key={product.id} isItemOnBasket={isItemOnBasket} addToBasket={addToBasket} product={product} />
          ))}
    </div>
  );
};

type ProductGridProps = {
  products: Product[];
};
