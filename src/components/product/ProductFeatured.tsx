import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useHistory } from "react-router-dom";

import { Product } from "../../redux";
import { ImageLoader } from "../common";

export const ProductFeatured: React.FC<ProductFeaturedProps> = ({ product }) => {
  const history = useHistory();
  const onClickItem = () => {
    if (!product) {
      return;
    }

    history.push(`/product/${product.id}`);
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div className="product-display" onClick={onClickItem} role="presentation">
        <div className="product-display-img">
          {product.image ? (
            <ImageLoader alt="" className="product-card-img" src={product.image} />
          ) : (
            <Skeleton width="100%" height="100%" />
          )}
        </div>
        <div className="product-display-details">
          <h2>{product.name || <Skeleton width={80} />}</h2>
          <p className="text-subtle text-italic">{product.brand || <Skeleton width={40} />}</p>
        </div>
      </div>
    </SkeletonTheme>
  );
};

type ProductFeaturedProps = {
  product: Product;
};
