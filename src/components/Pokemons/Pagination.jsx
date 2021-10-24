import React, { useState } from "react";
import "./PokemonPage.style.css";
export default function Pagination({
  gotoNextPage,
  gotoPrevPage,
  onItemsPerPageChange,
  pokemonsPerPage,
  onPrevNextPageChange,
  isLoading,
}) {

  return (
    <div>
      {console.log("Pagination: pokemonsPerPage", pokemonsPerPage)}
      {console.log("Pagination: next/prev", gotoPrevPage, gotoNextPage)}

      <div className="pagination-buttons">
        {gotoPrevPage && (
          <button onClick={() => onPrevNextPageChange(gotoPrevPage, "prev")}>
            Previous
          </button>
        )}
        {gotoNextPage && (
          <button onClick={() => onPrevNextPageChange(gotoNextPage, "next")}>
            Next
          </button>
        )}
        {onItemsPerPageChange && (
          <select
            className="pagination-select"
            value={pokemonsPerPage}
            onChange={(e) => {
              onItemsPerPageChange(Number(e.target.value));
            }}
          >
            {[10, 20, 50].map((itemsPerPage) => (
              <>
                {console.log("Pagination pokemonsPerPage", pokemonsPerPage)}
                <option key={itemsPerPage} value={itemsPerPage}>
                  Show {itemsPerPage}
                </option>
              </>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
