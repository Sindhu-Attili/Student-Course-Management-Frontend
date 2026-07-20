import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import api from "../services/api";

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
      fetchPayments();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, ordering, page]);

  const totalPages = Math.ceil(count / 5);

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">Payments</h2>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search Payments..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Sort */}
      <div className="mb-4">
        <select
          className="form-select"
          value={ordering}
          onChange={(e) => {
            setOrdering(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Sort By</option>
          <option value="amount">Amount (Low to High)</option>
          <option value="-amount">Amount (High to Low)</option>
          <option value="payment_date">Payment Date (Oldest First)</option>
          <option value="-payment_date">Payment Date (Newest First)</option>
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "300px" }}
        >
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading Payments...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Payment Cards */}
          <div className="row">
            {payments.length > 0 ? (
              payments.map((payment) => (
                <div className="col-md-4 mb-4" key={payment.id}>
                  <div className="card shadow-sm h-100">
                    <div className="card-body">

                      <h5 className="card-title">
                        Transaction: {payment.transaction_id}
                      </h5>

                      <p>
                        <strong>Amount:</strong> ₹{payment.amount}
                      </p>

                      <p>
                        <strong>Date:</strong>{" "}
                        {payment.payment_date.substring(0, 10)}
                      </p>

                      <p>
                        <strong>Course ID:</strong> {payment.course}
                      </p>

                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`badge ${
                            payment.payment_status === "PAID"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {payment.payment_status}
                        </span>
                      </p>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <h5>No Payments Found</h5>
              </div>
            )}
          </div>

          {/* Pagination */}
          {payments.length > 0 && (
            <div className="d-flex justify-content-center align-items-center gap-3 mt-4">

              <button
                className="btn btn-outline-primary"
                disabled={!previousPage}
                onClick={() => setPage(page - 1)}
              >
                ◀ Previous
              </button>

              <strong>
                Page {page} of {totalPages}
              </strong>

              <button
                className="btn btn-outline-primary"
                disabled={!nextPage}
                onClick={() => setPage(page + 1)}
              >
                Next ▶
              </button>

            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Payments;