import React from "react";

import bannerImg from "../../../static/banner-girl-1.png";
import { MessageDisplay } from "../../components/common";
import { ProductShowcase } from "../../components/product";
import { useDocumentTitle, useRecommendedProducts, useScrollTop } from "../../hooks";

export const RecommendedProducts: React.FC = () => {
  useDocumentTitle("Recommended Products | Salinaka");
  useScrollTop();

  const { recommendedProducts, fetchRecommendedProducts, isLoading, error } = useRecommendedProducts(12);

  return (
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>Recommended Products</h1>
          </div>
          <div className="banner-img">
            <img src={bannerImg} alt="" />
          </div>
        </div>
        <div className="display">
          <div className="product-display-grid">
            {error && !isLoading ? (
              <MessageDisplay message={error} action={fetchRecommendedProducts} buttonLabel="Try Again" />
            ) : (
              <ProductShowcase products={recommendedProducts} skeletonCount={6} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
