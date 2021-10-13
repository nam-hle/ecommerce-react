import PropType from "prop-types";
import React, { useRef } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";

import { ImageLoader } from "../../../components/common";
import { EDIT_PRODUCT } from "../../../constants";
import { displayActionMessage, displayDate, displayMoney } from "../../../helpers";
import { removeProduct } from "../../../redux";

export const ProductItem : React.FC<ProductItemProps> = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const productRef = useRef(null);

  export const onClickEdit : React.FC<onClickEditProps> = () => {
    history.push(`${EDIT_PRODUCT}/${product.id}`);
  };

  export const onDeleteProduct : React.FC<onDeleteProductProps> = () => {
    productRef.current.classList.toggle("item-active");
  };

  export const onConfirmDelete : React.FC<onConfirmDeleteProps> = () => {
    dispatch(removeProduct(product.id));
    displayActionMessage("Item successfully deleted");
    productRef.current.classList.remove("item-active");
  };

  export const onCancelDelete : React.FC<onCancelDeleteProps> = () => {
    productRef.current.classList.remove("item-active");
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div className={`item item-products ${!product.id && "item-loading"}`} ref={productRef}>
        <div className="grid grid-count-6">
          <div className="grid-col item-img-wrapper">
            {product.image ? (
              <ImageLoader alt={product.name} className="item-img" src={product.image} />
            ) : (
              <Skeleton width={50} height={30} />
            )}
          </div>
          <div className="grid-col">
            <span className="text-overflow-ellipsis">{product.name || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col">
            <span>{product.brand || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col">
            <span>{product.price ? displayMoney(product.price) : <Skeleton width={30} />}</span>
          </div>
          <div className="grid-col">
            <span>{product.dateAdded ? displayDate(product.dateAdded) : <Skeleton width={30} />}</span>
          </div>
          <div className="grid-col">
            <span>{product.maxQuantity || <Skeleton width={20} />}</span>
          </div>
        </div>
        {product.id && (
          <div className="item-action">
            <button className="button button-border button-small" onClick={onClickEdit} type="button">
              Edit
            </button>
            &nbsp;
            <button className="button button-border button-small button-danger" onClick={onDeleteProduct} type="button">
              Delete
            </button>
            <div className="item-action-confirm">
              <h5>Are you sure you want to delete this?</h5>
              <button className="button button-small button-border" onClick={onCancelDelete} type="button">
                No
              </button>
              &nbsp;
              <button className="button button-small button-danger" onClick={onConfirmDelete} type="button">
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

type ProductItemProps = {
  product: PropType.shape({
    id?: string,
    name?: string,
    brand?: string,
    price?: number,
    maxQuantity?: number,
    description?: string,
    keywords: PropType.arrayOf(PropType.string),
    imageCollection: PropType.arrayOf(PropType.object),
    sizes: PropType.arrayOf(PropType.string),
    image?: string,
    imageUrl?: string,
    isFeatured?: bool,
    isRecommended?: bool,
    dateAdded?: number,
    availableColors: PropType.arrayOf(PropType.string),
  }).isRequired,
};

export default withRouter(ProductItem);
