function PaginationControls({
  page,
  totalPages,
  previousPage,
  nextPage,
  onPrevious,
  onNext,
}) {
  return (
    <div className="d-flex justify-content-center align-items-center gap-3 mt-4">

      <button
        className="btn btn-outline-primary px-4"
        disabled={!previousPage}
        onClick={onPrevious}
      >
        <i className="bi bi-arrow-left"></i> Previous
      </button>

      <span
        className="fw-semibold"
        style={{
          minWidth: "120px",
          textAlign: "center",
        }}
      >
        Page {page} of {totalPages}
      </span>

      <button
        className="btn btn-outline-primary px-4"
        disabled={!nextPage}
        onClick={onNext}
      >
        Next <i className="bi bi-arrow-right"></i>
      </button>

    </div>
  );
}

export default PaginationControls;