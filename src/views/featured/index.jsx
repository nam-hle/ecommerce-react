import React from "react";

import bannerImg from "../../../static/banner-guy.png";
import { MessageDisplay } from "../../components/common";
import { ProductShowcase } from "../../components/product";
import { useDocumentTitle, useFeaturedProducts, useScrollTop } from "../../hooks";

export const FeaturedProducts: React.FC<FeaturedProductsProps> = () => {
  useDocumentTitle("Featured Products | Salinaka");
  useScrollTop();

  const { featuredProducts, fetchFeaturedProducts, isLoading, error } = useFeaturedProducts();

  return (
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>Featured Products</h1>
          </div>
          <div className="banner-img">
            <img src={bannerImg} alt="" />
          </div>
        </div>
        <div className="display">
          <div className="product-display-grid">
            {error && !isLoading ? (
              <MessageDisplay message={error} action={fetchFeaturedProducts} buttonLabel="Try Again" />
            ) : (
              <ProductShowcase products={featuredProducts} skeletonCount={6} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FeaturedProducts;
