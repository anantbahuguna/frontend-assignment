import { useMemo } from "react";
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

  const pages = useMemo(() => {
    const pageList = [];
    const start = Math.max(2, currentPage + 1 - visibleRange);
    const end = Math.min(totalPages - 1, currentPage + 1 + visibleRange);

    //Always start with first page
    pageList.push(1);

    if (start > 2) {
      pageList.push("...");
    }

    for (let i = start; i <= end; i++) {
      pageList.push(i);
    }

    if (end < totalPages - 1) {
      pageList.push("...");
    }

    if (totalPages > 1) {
      pageList.push(totalPages);
    }

    return pageList;
  }, [currentPage, visibleRange, totalItems, itemsPerPage]);
  return (
    <div className="pagination-container">
      <div className="pagination-page-control">
        <button
          className="page-btn"
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous"
          disabled={currentPage === 0}
        >
          <span className="arrow-icon left" aria-hidden={true} />
        </button>
        {pages.map((page, index) => {
          return page === "..." ? (
            <span key={`dots-${index}`} className="dots" aria-hidden={true}>
              ...
            </span>
          ) : (
            <button
              className={`page-btn ${
                currentPage === page - 1 ? "current" : ""
              }`}
              key={`page-btn-${index}`}
              onClick={() => onPageChange(page - 1)}
            >
              {page}
            </button>
          );
        })}
        <button
          className="page-btn"
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next"
          disabled={totalItems <= (currentPage + 1) * itemsPerPage}
        >
          <span className="arrow-icon right" aria-hidden={true} />
        </button>
      </div>
      <div className="pagination-row-control">
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
