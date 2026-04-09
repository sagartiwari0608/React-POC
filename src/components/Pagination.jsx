import "./Pagination.css";

const Pagination = ({ page, setPage, total, pageSize = 10 }) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
