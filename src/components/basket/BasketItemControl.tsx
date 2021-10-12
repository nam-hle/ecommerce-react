import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import * as React from "react";
import { useDispatch } from "react-redux";

import { addQtyItem, minusQtyItem, Product } from "../../redux";

interface BasketItemControlProps {
  product: Product;
}

export const BasketItemControl: React.FC<BasketItemControlProps> = ({ product }) => {
  const dispatch = useDispatch();

  const onAddQty = () => {
    if (product.quantity < product.maxQuantity) {
      dispatch(addQtyItem(product.id));
    }
  };

  const onMinusQty = () => {
    if (product.maxQuantity >= product.quantity && product.quantity !== 0) {
      dispatch(minusQtyItem(product.id));
    }
  };

  return (
    <div className="basket-item-control">
      <button
        className="button button-border button-border-gray button-small basket-control basket-control-add"
        disabled={product.maxQuantity === product.quantity}
        onClick={onAddQty}
        type="button">
        <PlusOutlined style={{ fontSize: "9px" }} />
      </button>
      <button
        className="button button-border button-border-gray button-small basket-control basket-control-minus"
        disabled={product.quantity === 1}
        onClick={onMinusQty}
        type="button">
        <MinusOutlined style={{ fontSize: "9px" }} />
      </button>
    </div>
  );
};
