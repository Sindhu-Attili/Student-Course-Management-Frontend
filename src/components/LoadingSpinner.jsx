import { Spinner } from "react-bootstrap";

function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "300px" }}
    >
      <div className="text-center">
        <Spinner animation="border" variant="primary" />

        <p className="mt-3 text-muted fw-semibold">
          {text}
        </p>
      </div>
    </div>
  );
}

export default LoadingSpinner;