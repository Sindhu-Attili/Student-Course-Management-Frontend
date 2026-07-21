function PageHeader({
  title,
  subtitle,
  icon,
}) {
  return (
    <div className="mb-4">

      <div className="d-flex align-items-center gap-3">

        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "15px",
            background: "#2563EB",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            boxShadow: "0 8px 20px rgba(37,99,235,.25)",
          }}
        >
          <i className={`bi ${icon}`}></i>
        </div>

        <div>

          <h2
            className="fw-bold mb-1"
            style={{
              color: "#1F2937",
            }}
          >
            {title}
          </h2>

          <p
            className="text-muted mb-0"
            style={{
              fontSize: "16px",
            }}
          >
            {subtitle}
          </p>

        </div>

      </div>

    </div>
  );
}

export default PageHeader;