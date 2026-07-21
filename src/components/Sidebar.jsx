import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    toast.success("Logged out successfully 👋");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div>
        <div className="sidebar-logo">
          <h2>
            <i className="bi bi-mortarboard-fill me-2"></i>
            Student LMS
          </h2>

          <p>Learning Portal</p>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <i className="bi bi-speedometer2"></i>
            Dashboard
          </NavLink>

          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <i className="bi bi-book"></i>
            Courses
          </NavLink>

          <NavLink
            to="/assignments"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <i className="bi bi-journal-text"></i>
            Assignments
          </NavLink>

          <NavLink
            to="/payments"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <i className="bi bi-credit-card"></i>
            Payments
          </NavLink>

          <NavLink
            to="/certificates"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <i className="bi bi-award"></i>
            Certificates
          </NavLink>
        </nav>
      </div>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <div className="user-card">
          <div className="user-avatar">
            <i className="bi bi-person-circle"></i>
          </div>

          <h5>Student LMS</h5>

          <p>Administrator</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;