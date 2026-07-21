import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import StatCard from "../components/StatCard";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    courses: 0,
    assignments: 0,
    payments: 0,
    certificates: 0,
  });

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get("dashboard-stats/");
      setStats(response.data);
    } catch (error) {
      toast.error("Failed to load dashboard statistics!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">

        <div>

          <h1>
            👋 Welcome Back!
          </h1>

          <p>
            Manage your Student Course Management System with ease.
          </p>

        </div>

        <div className="dashboard-date">

          <span>Today</span>

          <h5>{today}</h5>

        </div>

      </div>

      <div className="dashboard-grid">

        <StatCard
          icon="📚"
          title="Courses"
          value={stats.courses}
          subtitle="View Details →"
          color="primary"
          onClick={() => navigate("/courses")}
        />

        <StatCard
          icon="📝"
          title="Assignments"
          value={stats.assignments}
          subtitle="View Details →"
          color="success"
          onClick={() => navigate("/assignments")}
        />

        <StatCard
          icon="💳"
          title="Payments"
          value={stats.payments}
          subtitle="View Details →"
          color="warning"
          onClick={() => navigate("/payments")}
        />

        <StatCard
          icon="🏆"
          title="Certificates"
          value={stats.certificates}
          subtitle="View Details →"
          color="danger"
          onClick={() => navigate("/certificates")}
        />

      </div>

    </div>
  );
}

export default Dashboard;