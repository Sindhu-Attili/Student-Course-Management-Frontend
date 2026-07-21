import { useEffect, useState } from "react";
import api from "../services/api";

import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import PaginationControls from "../components/PaginationControls";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ordering, setOrdering] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const fetchPayments = async () => {
    setLoading(true);

    try {
      let url = `payments/?page=${page}&`;

      if (searchTerm) {
        url += `search=${searchTerm}&`;
      }

      if (ordering) {
        url += `ordering=${ordering}`;
      }

      const response = await api.get(url);

      setPayments(response.data.results);
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
      fetchPayments();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, ordering, page]);

  const totalPages = Math.ceil(count / 5);

  return (
    <div className="container-fluid p-4">

      <PageHeader
        title="Payments"
        subtitle="Manage student payment records."
        icon="bi-credit-card"
      />

      {/* Search & Sort */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body">

          <div className="row g-3">

            <div className="col-md-8">
              <SearchBar
                value={searchTerm}
                placeholder="Search Payments..."
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
                <option value="amount">Amount (Low to High)</option>
                <option value="-amount">Amount (High to Low)</option>
                <option value="payment_date">
                  Payment Date (Oldest First)
                </option>
                <option value="-payment_date">
                  Payment Date (Newest First)
                </option>
              </select>
            </div>

          </div>

        </div>
      </div>

      {/* Payment Cards */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body">

          {loading ? (
            <LoadingSpinner text="Loading Payments..." />
          ) : payments.length === 0 ? (
            <EmptyState
              icon="bi-credit-card"
              title="No Payments Found"
              message="Try changing your search or sorting options."
            />
          ) : (
            <>
              <div className="row">

                {payments.map((payment) => (
                  <div
                    className="col-lg-4 col-md-6 mb-4"
                    key={payment.id}
                  >
                    <div className="card border-0 shadow-sm h-100 rounded-4 course-card">

                      <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center mb-3">

                          <h6 className="fw-bold mb-0">
                            #{payment.transaction_id}
                          </h6>

                          <span
                            className={`badge ${
                              payment.payment_status === "PAID"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {payment.payment_status}
                          </span>

                        </div>

                        <hr />

                        <p className="mb-2">
                          <i className="bi bi-currency-rupee me-2 text-success"></i>
                          <strong>Amount:</strong> ₹{payment.amount}
                        </p>

                        <p className="mb-2">
                          <i className="bi bi-calendar-event me-2 text-primary"></i>
                          <strong>Date:</strong>{" "}
                          {payment.payment_date.substring(0, 10)}
                        </p>

                        <p className="mb-0">
                          <i className="bi bi-book me-2 text-warning"></i>
                          <strong>Course ID:</strong> {payment.course}
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

export default Payments;