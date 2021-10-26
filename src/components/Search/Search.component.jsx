import React from "react";
import { Input } from "antd";

function Search({ search, cachedSearchTerm, onSearch }) {
  const { Search } = Input;

  return (
    <div>
      <div className="search-field">
        {search ? (
          <Search
            value={search}
            placeholder={search}
            allowClear
            onSearch={(e) => onSearch(e)}
            enterButton={"search..."}
            data-testid={"search-input"}
          />
        ) : (
          <Search
            placeholder={search}
            allowClear
            onSearch={(e) => onSearch(e)}
            enterButton={"search..."}
            data-testid={"search-input"}
          />
        )}
      </div>
      ;
    </div>
  );
}

export default Search;
