import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";

import { useDidMount } from "../../hooks";
import { applyFilter, AppState, FilterState, ProductState, resetFilter, selectMax, selectMin } from "../../redux";

import { PriceRange } from "./PriceRange";

const _Filters: React.FC<FiltersProps> = ({ closeModal }) => {
  const { filter, isLoading, products } = useSelector<
    AppState,
    { filter: FilterState; isLoading: boolean; products: ProductState["items"] }
  >((state) => ({
    filter: state.filter,
    isLoading: state.app.loading,
    products: state.products.items,
  }));
  const [field, setFilter] = useState<FilterState>({
    brand: filter.brand,
    minPrice: filter.minPrice,
    maxPrice: filter.maxPrice,
    sortBy: filter.sortBy,
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const didMount = useDidMount();

  const max = selectMax(products);
  const min = selectMin(products);

  useEffect(() => {
    if (didMount && window.screen.width <= 480) {
      history.push("/");
    }

    if (didMount && closeModal) {
      closeModal("useEffect");
    }

    setFilter(filter);
    window.scrollTo(0, 0);
  }, [filter, history]); // eslint-disable-line react-hooks/exhaustive-deps

  const onPriceChange = (values: ReadonlyArray<number>) => {
    setFilter({ ...field, minPrice: values[0], maxPrice: values[1] });
  };

  const onBrandFilterChange: React.ChangeEventHandler<{ value: string }> = (e) => {
    const val = e.target.value;

    setFilter({ ...field, brand: val });
  };

  const onSortFilterChange: React.ChangeEventHandler<{ value: string }> = (e) => {
    setFilter({ ...field, sortBy: e.target.value });
  };

  const onApplyFilter = () => {
    const isChanged = Object.entries(field).some(([fieldKey, fieldValue]) => fieldValue !== (filter as any)[fieldKey]);

    if (field.minPrice > field.maxPrice) {
      return;
    }

    if (isChanged) {
      dispatch(applyFilter(field));
    } else {
      closeModal("onApplyFilter");
    }
  };

  const onResetFilter = () => {
    const filterFields = ["brand", "minPrice", "maxPrice", "sortBy"];

    if (filterFields.some((key) => !!(filter as any)[key])) {
      dispatch(resetFilter({}));
    } else {
      closeModal("onresetFilter");
    }
  };

  return (
    <div className="filters">
      <div className="filters-field">
        <span>Brand</span>
        <br />
        <br />
        {products.length === 0 && isLoading ? (
          <h5 className="text-subtle">Loading Filter</h5>
        ) : (
          <select
            className="filters-brand"
            value={field.brand}
            disabled={isLoading || products.length === 0}
            onChange={onBrandFilterChange}>
            {products.map((p, i) => {
              return (
                <option key={i} value={p.brand}>
                  {p.brand}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <div className="filters-field">
        <span>Sort By</span>
        <br />
        <br />
        <select
          className="filters-sort-by d-block"
          value={field.sortBy}
          disabled={isLoading || products.length === 0}
          onChange={onSortFilterChange}>
          <option value="">None</option>
          <option value="name-asc">Name Ascending A - Z</option>
          <option value="name-desc">Name Descending Z - A</option>
          <option value="price-desc">Price High - Low</option>
          <option value="price-asc">Price Low - High</option>
        </select>
      </div>
      <div className="filters-field">
        <span>Price Range</span>
        <br />
        <br />
        {(products.length === 0 && isLoading) || max === 0 ? (
          <h5 className="text-subtle">Loading Filter</h5>
        ) : products.length === 1 ? (
          <h5 className="text-subtle">No Price Range</h5>
        ) : (
          <PriceRange
            min={min}
            max={max}
            initMin={field.minPrice}
            initMax={field.maxPrice}
            onPriceChange={onPriceChange}
            productsCount={products.length}
          />
        )}
      </div>
      <div className="filters-action">
        <button
          className="filters-button button button-small"
          disabled={isLoading || products.length === 0}
          onClick={onApplyFilter}
          type="button">
          Apply filters
        </button>
        <button
          className="filters-button button button-border button-small"
          disabled={isLoading || products.length === 0}
          onClick={onResetFilter}
          type="button">
          Reset filters
        </button>
      </div>
    </div>
  );
};

type FiltersProps = RouteComponentProps & {
  closeModal: (path: string) => void;
};

export const Filters = withRouter(_Filters);
