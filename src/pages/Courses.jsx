import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import api from "../services/api";

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
      fetchCourses();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, ordering, page]);

  // Total pages
  const totalPages = Math.ceil(count / 5);

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">Courses</h2>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search Courses..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Sorting */}
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
          <option value="fee">Fee (Low to High)</option>
          <option value="-fee">Fee (High to Low)</option>
          <option value="duration">Duration (Low to High)</option>
          <option value="-duration">Duration (High to Low)</option>
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
            <p className="mt-3">Loading Courses...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Course Cards */}
          <div className="row">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div className="col-md-4 mb-4" key={course.id}>
                  <div className="card shadow-sm h-100">
                    <div className="card-body text-center">
                      <h4>{course.course_name}</h4>

                      <p>
                        <strong>Duration:</strong> {course.duration} Days
                      </p>

                      <p>
                        <strong>Fee:</strong> ₹{course.fee}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <h5>No Courses Found</h5>
              </div>
            )}
          </div>

          {/* Pagination */}
          {courses.length > 0 && (
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

export default Courses;