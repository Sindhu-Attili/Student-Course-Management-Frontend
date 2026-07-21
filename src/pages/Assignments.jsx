import { useEffect, useState } from "react";
import api from "../services/api";

import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import PaginationControls from "../components/PaginationControls";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ordering, setOrdering] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const fetchAssignments = async () => {
    setLoading(true);

    try {
      let url = `assignments/?page=${page}&`;

      if (searchTerm) {
        url += `search=${searchTerm}&`;
      }

      if (ordering) {
        url += `ordering=${ordering}`;
      }

      const response = await api.get(url);

      setAssignments(response.data.results);
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
      fetchAssignments();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, ordering, page]);

  const totalPages = Math.ceil(count / 5);

  return (
    <div className="container-fluid p-4">

      <PageHeader
        title="Assignments"
        subtitle="Manage student assignments."
        icon="bi-journal-text"
      />

      {/* Search & Sort */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body">

          <div className="row g-3">

            <div className="col-md-8">
              <SearchBar
                value={searchTerm}
                placeholder="Search Assignments..."
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
                <option value="due_date">Due Date (Oldest First)</option>
                <option value="-due_date">Due Date (Newest First)</option>
                <option value="total_marks">Marks (Low to High)</option>
                <option value="-total_marks">Marks (High to Low)</option>
              </select>
            </div>

          </div>

        </div>
      </div>

      {/* Assignment List */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body">

          {loading ? (
            <LoadingSpinner text="Loading Assignments..." />
          ) : assignments.length === 0 ? (
            <EmptyState
              icon="bi-journal-text"
              title="No Assignments Found"
              message="Try changing your search or sorting options."
            />
          ) : (
            <>
              <div className="row">

                {assignments.map((assignment) => (
                  <div
                    className="col-lg-4 col-md-6 mb-4"
                    key={assignment.id}
                  >
                    <div className="card border-0 shadow-sm h-100 rounded-4 course-card">

                      <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center mb-3">

                          <h5 className="fw-bold mb-0">
                            {assignment.title}
                          </h5>

                          <span className="badge bg-success">
                            Open
                          </span>

                        </div>

                        <hr />

                        <p className="mb-2">
                          <i className="bi bi-card-text me-2 text-primary"></i>
                          {assignment.description}
                        </p>

                        <p className="mb-2">
                          <i className="bi bi-calendar-event me-2 text-danger"></i>
                          <strong>Due:</strong> {assignment.due_date}
                        </p>

                        <p className="mb-2">
                          <i className="bi bi-award me-2 text-warning"></i>
                          <strong>Marks:</strong> {assignment.total_marks}
                        </p>

                        <p className="mb-0">
                          <i className="bi bi-book me-2 text-success"></i>
                          <strong>Course ID:</strong> {assignment.course}
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

export default Assignments;