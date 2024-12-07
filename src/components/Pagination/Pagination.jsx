import "./pagination.css";

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  setItemsPerPage,
  setCurrentPage,
  visibleRange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startingVisiblePage = currentPage - visibleRange;
  const endingVisibleRange = currentPage + visibleRange;
  const noOfVisiblePages = endingVisibleRange - startingVisiblePage + 1;
  return (
    <div className="pagination-container">
      <div className="pagination-control">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous"
          disabled={currentPage === 0}
        >
          <span className="arrow-icon left" aria-hidden={true} />
        </button>
        <button className="page-btn">{1}</button>
        <button className="page-btn">{startingVisiblePage + 1}</button>
        <button className="page-btn">{currentPage + 1}</button>
        <button className="page-btn">{endingVisibleRange + 1}</button>
        {"..."}
        {/* <span className="dots" aria-hidden={true} /> */}
        <button className="page-btn">{totalPages}</button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next"
          disabled={totalItems <= (currentPage + 1) * itemsPerPage}
        >
          <span className="arrow-icon right" aria-hidden={true} />
        </button>
      </div>
      <div className="pagination-control">
        Rows:{" "}
        <span>
          <select
            name="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(e.target.value);
              setCurrentPage(0);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={totalItems}>All</option>
          </select>
        </span>
      </div>
    </div>
  );
}
