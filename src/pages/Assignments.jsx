import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import api from "../services/api";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ordering, setOrdering] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAssignments = async () => {
    setLoading(true);

    try {
      let url = "assignments/?";

      if (searchTerm) {
        url += `search=${searchTerm}&`;
      }

      if (ordering) {
        url += `ordering=${ordering}`;
      }

      const response = await api.get(url);
      setAssignments(response.data.results);

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
      fetchAssignments();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, ordering]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Assignments</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search Assignments..."
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
          <option value="due_date">Due Date (Oldest First)</option>
          <option value="-due_date">Due Date (Newest First)</option>
          <option value="total_marks">Marks (Low to High)</option>
          <option value="-total_marks">Marks (High to Low)</option>
        </select>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading Assignments...</p>
          </div>
        </div>
      ) : (
        <div className="row">
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <div className="col-md-4 mb-4" key={assignment.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body text-center">
                    <h4>{assignment.title}</h4>

                    <p><strong>Description:</strong><br />{assignment.description}</p>

                    <p><strong>Due Date:</strong> {assignment.due_date}</p>

                    <p><strong>Total Marks:</strong> {assignment.total_marks}</p>

                    <p><strong>Course ID:</strong> {assignment.course}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h5>No Assignments Found</h5>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Assignments;