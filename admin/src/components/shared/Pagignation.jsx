const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="font-semibold">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
