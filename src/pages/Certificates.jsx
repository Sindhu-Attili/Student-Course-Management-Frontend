import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import api from "../services/api";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ordering, setOrdering] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCertificates = async () => {
    setLoading(true);

    try {
      let url = "certificates/?";

      if (searchTerm) {
        url += `search=${searchTerm}&`;
      }

      if (ordering) {
        url += `ordering=${ordering}`;
      }

      const response = await api.get(url);
      setCertificates(response.data.results);

    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCertificates();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, ordering]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Certificates</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search Certificates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <select
          className="form-select"
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="issued_at">Issued Date (Oldest First)</option>
          <option value="-issued_at">Issued Date (Newest First)</option>
          <option value="certificate_number">Certificate No (Ascending)</option>
          <option value="-certificate_number">Certificate No (Descending)</option>
        </select>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading Certificates...</p>
          </div>
        </div>
      ) : (
        <div className="row">
          {certificates.length > 0 ? (
            certificates.map((certificate) => (
              <div className="col-md-4 mb-4" key={certificate.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      🏆 Certificate
                    </h5>

                    <p><strong>Certificate No:</strong> {certificate.certificate_number}</p>

                    <p><strong>Issued Date:</strong> {certificate.issued_at.substring(0,10)}</p>

                    <p><strong>Student ID:</strong> {certificate.student}</p>

                    <p><strong>Course ID:</strong> {certificate.course}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h5>No Certificates Found</h5>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Certificates;