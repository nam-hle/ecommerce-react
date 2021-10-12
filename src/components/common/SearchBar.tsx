import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { AppState, clearRecentSearch, FilterState, removeSelectedRecent } from "../../redux";

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const { filter, isLoading } = useSelector<AppState, { filter: FilterState; isLoading: boolean }>((state) => ({
    filter: state.filter,
    isLoading: state.app.loading,
  }));
  const searchbarRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();

  const dispatch = useDispatch();
  const isMobile = window.screen.width <= 800;

  const onSearchChange = (e: any) => {
    const val = e.target.value.trimStart();
    setSearchInput(val);
  };

  const onKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      // @ts-ignore
      e.target.blur();
      searchbarRef.current?.classList.remove("is-open-recent-search");

      if (isMobile) {
        history.push("/");
      }

      history.push(`/search/${searchInput.trim().toLowerCase()}`);
    }
  };

  const recentSearchClickHandler = (e: any) => {
    const searchBar = e.target.closest(".searchbar");

    if (!searchBar.current) {
      searchbarRef.current?.classList.remove("is-open-recent-search");
      document.removeEventListener("click", recentSearchClickHandler);
    }
  };

  const onFocusInput = (e: any) => {
    e.target.select();

    if (filter.recent?.length !== 0) {
      searchbarRef.current?.classList.add("is-open-recent-search");
      document.addEventListener("click", recentSearchClickHandler);
    }
  };

  const onClickRecentSearch = (keyword: string) => {
    searchbarRef.current?.classList.remove("is-open-recent-search");
    history.push(`/search/${keyword.trim().toLowerCase()}`);
  };

  const onClearRecent = () => {
    dispatch(clearRecentSearch({}));
  };

  return (
    <>
      <div className="searchbar" ref={searchbarRef}>
        <SearchOutlined className="searchbar-icon" />
        <input
          className="search-input searchbar-input"
          onChange={onSearchChange}
          onKeyUp={onKeyUp}
          onFocus={onFocusInput}
          placeholder="Search product..."
          readOnly={isLoading}
          type="text"
          value={searchInput}
        />
        {filter.recent?.length !== 0 && (
          <div className="searchbar-recent">
            <div className="searchbar-recent-header">
              <h5>Recent Search</h5>
              <h5 className="searchbar-recent-clear text-subtle" onClick={onClearRecent} role="presentation">
                Clear
              </h5>
            </div>
            {filter.recent?.map((item, index) => (
              <div className="searchbar-recent-wrapper" key={`search-${item}-${index}`}>
                <h5
                  className="searchbar-recent-keyword margin-0"
                  onClick={() => onClickRecentSearch(item)}
                  role="presentation">
                  {item}
                </h5>
                <span
                  className="searchbar-recent-button text-subtle"
                  onClick={() => dispatch(removeSelectedRecent(item))}
                  role="presentation">
                  X
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
