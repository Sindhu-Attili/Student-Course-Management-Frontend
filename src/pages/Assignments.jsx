import { useEffect, useState } from "react";
import api from "../services/api";

function Assignments() {
  const [assignments, SetAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const response = await api.get("assignments/");
      console.log(response.data);

      SetAssignments(response.data.results);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAssignments();
  }, []);
  return(
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Assignments</h2>
      <div className="row">
        {assignments.map((assignment)=>(
          <div className="col-md-4 mb-4" key={assignment.id}>
            <div className="card shadow-sm h-100">
              <div className="card-title">
                <h4 className="card-title">
                  {assignment.title}
                </h4>
                <p><strong>Description:</strong><br />
                {assignment.description}</p>
                <p><strong>Due Date:</strong>{" "}
                {assignment.due_date}</p>
                <p><strong>Total Marks:</strong>{" "}
                {assignment.total_marks}</p>
                <p><strong>Course ID:</strong>{" "}
                {assignment.course}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Assignments;