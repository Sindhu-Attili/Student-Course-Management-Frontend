import { useEffect, useState } from "react";
import api from "../services/api";

import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import PaginationControls from "../components/PaginationControls";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ordering, setOrdering] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);

    try {
      let url = `courses/?page=${page}&`;

      if (searchTerm) {
        url += `search=${searchTerm}&`;
      }

      if (ordering) {
        url += `ordering=${ordering}`;
      }

      const response = await api.get(url);

      setCourses(response.data.results);
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
      fetchCourses();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, ordering, page]);

  const totalPages = Math.ceil(count / 5);

  return (
    <div className="container-fluid p-4">

      <PageHeader
        title="Courses"
        subtitle="Manage all available courses."
        icon="bi-book"
      />

      {/* Search & Sort Card */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body">

          <div className="row g-3">

            <div className="col-md-8">
              <SearchBar
                value={searchTerm}
                placeholder="Search Courses..."
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
                <option value="fee">Fee (Low to High)</option>
                <option value="-fee">Fee (High to Low)</option>
                <option value="duration">Duration (Low to High)</option>
                <option value="-duration">Duration (High to Low)</option>
              </select>
            </div>

          </div>

        </div>
      </div>

      {/* Course List Card */}
      <div className="card shadow-sm border-0 rounded-4">

        <div className="card-body">

          {loading ? (
            <LoadingSpinner text="Loading Courses..." />
          ) : courses.length === 0 ? (
            <EmptyState
              icon="bi-book"
              title="No Courses Found"
              message="Try changing your search or sorting options."
            />
          ) : (
            <>
              <div className="row">

                {courses.map((course) => (
                  <div className="col-lg-4 col-md-6 mb-4" key={course.id}>

                    <div className="card border-0 shadow-sm h-100 rounded-4">

                      <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center mb-3">

                          <h5 className="fw-bold mb-0">
                            {course.course_name}
                          </h5>

                          <span className="badge bg-primary">
                            Active
                          </span>

                        </div>

                        <hr />

                        <p className="mb-2">
                          <i className="bi bi-clock me-2 text-primary"></i>

                          <strong>Duration:</strong>{" "}
                          {course.duration} Days
                        </p>

                        <p className="mb-0">
                          <i className="bi bi-currency-rupee me-2 text-success"></i>

                          <strong>Fee:</strong> ₹{course.fee}
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

export default Courses;