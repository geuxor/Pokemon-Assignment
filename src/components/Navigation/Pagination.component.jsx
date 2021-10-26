import "../../styles/Pokemon.style.css";
export default function Pagination({
  gotoNextPage,
  gotoPrevPage,
  onItemsPerPageChange,
  pokemonsPerPage,
  onPrevNextPageChange,
}) {
  return (
    <div>
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
            {[10, 20, 50].map((itemsPerPage, i) => (
              <option key={i} value={itemsPerPage}>
                Show {itemsPerPage}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
