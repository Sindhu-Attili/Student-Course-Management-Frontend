function EmptyState({
  icon = "bi-folder-x",
  title = "No Data Found",
  message = "There is nothing to display right now.",
}) {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "300px" }}
    >
      <i
        className={`bi ${icon}`}
        style={{
          fontSize: "70px",
          color: "#94A3B8",
        }}
      ></i>

      <h4
        className="mt-3 fw-bold"
        style={{ color: "#1F2937" }}
      >
        {title}
      </h4>

      <p
        className="text-muted"
        style={{ maxWidth: "400px" }}
      >
        {message}
      </p>
    </div>
  );
}

export default EmptyState;