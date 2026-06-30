import { useNavigate } from "react-router-dom";
import {useEffect,useState} from "react";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [stats,setStats] = useState({
    courses:0,
    assignments:0,
    payments:0,
    certificates:0,
  });
  const fetchDashboardStats = async () => {
    try{
      const response = await api.get("dashboard-stats/");
      console.log(response.data);
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchDashboardStats();
  },[]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  return (
    <div className="container mt-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="fw-bold mb-2">Student Dashboard</h1>
          <p className="text-muted">
            Welcome! Choose a module to continue your learning.
          </p>
        </div>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="row g-4">

        {/* Courses */}
        <div className="col-md-3">
          <div
            className="card shadow-sm text-center h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/courses")}
          >
            <div className="card-body">
              <h1 className="mb-3">📚</h1>
              <h4>Courses</h4>
            <p className="text-muted">{stats.courses} Courses Available</p>
            </div>
          </div>
        </div>

        {/* Assignments */}
        <div className="col-md-3">
          <div
            className="card shadow-sm text-center h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/assignments")}
          >
            <div className="card-body">
              <h1 className="mb-3">📝</h1>
              <h4>Assignments</h4>
              <p className="text-muted">{stats.assignments}  Assignments Available</p>
            </div>
          </div>
        </div>

        {/* Payments */}
        <div className="col-md-3">
          <div
            className="card shadow-sm text-center h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/payments")}
          >
            <div className="card-body">
              <h1 className="mb-3">💳</h1>
              <h4>Payments</h4>
              <p className="text-muted">{stats.payments} Payment Records</p>
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="col-md-3">
          <div
            className="card shadow-sm text-center h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/certificates")}
          >
            <div className="card-body">
              <h1 className="mb-3">🏆</h1>
              <h4>Certificates</h4>
              <p className="text-muted">{stats.certificates} Certificates Issued</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;