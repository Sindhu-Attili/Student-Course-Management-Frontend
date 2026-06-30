import { useEffect,useState } from "react";
import api from "../services/api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCourses = async () => {
    try{
      const response = await api.get(`courses/?search=${searchTerm}`);

      setCourses(response.data.results);

    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log("Response:" ,error.response.status);
        console.log("Status:",error.response.status);
        console.log("Data:",error.response.data);
      }
    }
  };
  useEffect(()=> {
    fetchCourses();
  },[searchTerm]);

  console.log(searchTerm);

  return (
  <div className="container mt-5">
    <h2 className="mb-4">Courses</h2>

    {/*Search Box */}
    <div className="mb-4">
     <input type="text"
  className="form-control"
  placeholder="🔍 Search Courses..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}/>
    </div>


    <div className="row">
      {courses.map((course) => (
        <div className="col-md-4 mb-4" key={course.id}>
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h4 className="card-title">{course.course_name}</h4>

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