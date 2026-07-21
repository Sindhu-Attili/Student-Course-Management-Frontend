import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import "../Styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post("token/", {
        username,
        password,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      toast.success("Welcome back! Login successful 🎉");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid username or password.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }

      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">

          <div className="login-logo">
            <i className="bi bi-mortarboard-fill"></i>
          </div>

          <h1>Student LMS</h1>

          <p>
            Student Course Management System
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label className="form-label">
              Username
            </label>

            <div className="input-group">

              <span className="input-group-text">
                <i className="bi bi-person"></i>
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

            </div>

          </div>

          <div className="mb-4">

            <label className="form-label">
              Password
            </label>

            <div className="input-group">

              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>

              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="btn btn-light border"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                <i
                  className={`bi ${
                    showPassword
                      ? "bi-eye-slash"
                      : "bi-eye"
                  }`}
                ></i>
              </button>

            </div>

          </div>

          <button
            className="btn login-btn"
            type="submit"
            disabled={loading}
          >

            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                ></span>

                Signing In...
              </>
            ) : (
              <>
                Sign In
                <i className="bi bi-arrow-right ms-2"></i>
              </>
            )}

          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;