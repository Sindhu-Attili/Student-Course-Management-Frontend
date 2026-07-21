import { useEffect, useState } from "react";
import api from "../services/api";

import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import PaginationControls from "../components/PaginationControls";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ordering, setOrdering] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const fetchCertificates = async () => {
    setLoading(true);

    try {
      let url = `certificates/?page=${page}&`;

      if (searchTerm) {
        url += `search=${searchTerm}&`;
      }

      if (ordering) {
        url += `ordering=${ordering}`;
      }

      const response = await api.get(url);

      setCertificates(response.data.results);
      setCount(response.data.count);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCertificates();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, ordering, page]);

  const totalPages = Math.ceil(count / 5);

  return (
    <div className="container-fluid p-4">

      <PageHeader
        title="Certificates"
        subtitle="Manage student certificates."
        icon="bi-award"
      />

      {/* Search & Sort */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body">

          <div className="row g-3">

            <div className="col-md-8">
              <SearchBar
                value={searchTerm}
                placeholder="Search Certificates..."
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                style={{ height: "50px" }}
                value={ordering}
                onChange={(e) => {
                  setOrdering(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">Sort By</option>

                <option value="issued_at">
                  Issued Date (Oldest First)
                </option>

                <option value="-issued_at">
                  Issued Date (Newest First)
                </option>

                <option value="certificate_number">
                  Certificate No (Ascending)
                </option>

                <option value="-certificate_number">
                  Certificate No (Descending)
                </option>

              </select>
            </div>

          </div>

        </div>
      </div>

      {/* Certificate Cards */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body">

          {loading ? (
            <LoadingSpinner text="Loading Certificates..." />
          ) : certificates.length === 0 ? (
            <EmptyState
              icon="bi-award"
              title="No Certificates Found"
              message="Try changing your search or sorting options."
            />
          ) : (
            <>
              <div className="row">

                {certificates.map((certificate) => (
                  <div
                    className="col-lg-4 col-md-6 mb-4"
                    key={certificate.id}
                  >
                    <div className="card border-0 shadow-sm h-100 rounded-4 course-card">

                      <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center mb-3">

                          <h5 className="fw-bold mb-0">
                            Certificate
                          </h5>

                          <span className="badge bg-warning text-dark">
                            Issued
                          </span>

                        </div>

                        <hr />

                        <p className="mb-2">
                          <i className="bi bi-patch-check me-2 text-success"></i>

                          <strong>No:</strong>{" "}
                          {certificate.certificate_number}
                        </p>

                        <p className="mb-2">
                          <i className="bi bi-calendar-event me-2 text-primary"></i>

                          <strong>Issued:</strong>{" "}
                          {certificate.issued_at.substring(0, 10)}
                        </p>

                        <p className="mb-2">
                          <i className="bi bi-person me-2 text-info"></i>

                          <strong>Student ID:</strong>{" "}
                          {certificate.student}
                        </p>

                        <p className="mb-0">
                          <i className="bi bi-book me-2 text-danger"></i>

                          <strong>Course ID:</strong>{" "}
                          {certificate.course}
                        </p>

                      </div>

                    </div>
                  </div>
                ))}

              </div>

              <PaginationControls
                page={page}
                totalPages={totalPages}
                previousPage={previousPage}
                nextPage={nextPage}
                onPrevious={() => setPage(page - 1)}
                onNext={() => setPage(page + 1)}
              />

            </>
          )}

        </div>
      </div>

    </div>
  );
}

export default Certificates;