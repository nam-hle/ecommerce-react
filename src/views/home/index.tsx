import { ArrowRightOutlined } from "@ant-design/icons";

import React from "react";

import { Link } from "react-router-dom";

import bannerImg from "../../../static/banner-girl.png";
import { MessageDisplay, ProductShowcase } from "../../components";
import { FEATURED_PRODUCTS, RECOMMENDED_PRODUCTS, SHOP } from "../../constants";
import { useDocumentTitle, useFeaturedProducts, useRecommendedProducts, useScrollTop } from "../../hooks";

export const Home: React.FC = () => {
  useDocumentTitle("Salinaka | Home");
  useScrollTop();

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured,
  } = useFeaturedProducts(6);
  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingRecommended,
    error: errorRecommended,
  } = useRecommendedProducts(6);

  return (
    <main className="content">
      <div className="home">
        <div className="banner">
          <div className="banner-desc">
            <h1 className="text-thin">
              <strong>See</strong>
              &nbsp;everything with&nbsp;
              <strong>Clarity</strong>
            </h1>
            <p>
              Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses,
              and contacts—we’ve got your eyes covered.
            </p>
            <br />
            <Link to={SHOP} className="button">
              Shop Now &nbsp;
              <ArrowRightOutlined />
            </Link>
          </div>
          <div className="banner-img">
            <img src={bannerImg} alt="" />
          </div>
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Featured Products</h1>
            <Link to={FEATURED_PRODUCTS}>See All</Link>
          </div>
          {errorFeatured && !isLoadingFeatured ? (
            <MessageDisplay message={errorFeatured} action={fetchFeaturedProducts} buttonLabel="Try Again" />
          ) : (
            <ProductShowcase products={featuredProducts} skeletonCount={6} />
          )}
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Recommended Products</h1>
            <Link to={RECOMMENDED_PRODUCTS}>See All</Link>
          </div>
          {errorRecommended && !isLoadingRecommended ? (
            <MessageDisplay message={errorRecommended} action={fetchRecommendedProducts} buttonLabel="Try Again" />
          ) : (
            <ProductShowcase products={recommendedProducts} skeletonCount={6} />
          )}
        </div>
      </div>
    </main>
  );
};
