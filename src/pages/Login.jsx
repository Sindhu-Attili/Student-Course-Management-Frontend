import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("token/", {
      username: username,
      password: password,
      
    });

    console.log(response.data);
    localStorage.setItem("access",response.data.access);
    localStorage.setItem("refresh",response.data.refresh);
    
    navigate("/dashboard");

    console.log("Token Saved Successfully");

  } catch (error) {
    console.log(error.response.data);
    
  }
};

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">

          <h2 className="text-center mb-4">Login</h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Login
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;