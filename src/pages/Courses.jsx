import { useEffect, useState } from "react";
import api from "../services/api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ordering, setOrdering] = useState("");

  const fetchCourses = async () => {
    try {
      let url = "courses/?";

      if (searchTerm) {
        url += `search=${searchTerm}&`;
      }

      if (ordering) {
        url += `ordering=${ordering}`;
      }

      const response = await api.get(url);
      setCourses(response.data.results);
    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, ordering]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Courses</h2>

      {/* Search Box */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search Courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sort Dropdown */}
      <div className="mb-4">
        <select
          className="form-select"
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="fee">Fee (Low to High)</option>
          <option value="-fee">Fee (High to Low)</option>
          <option value="duration">Duration (Low to High)</option>
          <option value="-duration">Duration (High to Low)</option>
        </select>
      </div>

      {/* Course Cards */}
      <div className="row">
        {courses.map((course) => (
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
        ))}
      </div>
    </div>
  );
}

export default Courses;