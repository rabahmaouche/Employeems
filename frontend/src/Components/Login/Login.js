import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handlsubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { Email, Password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employees-dashboard");
        }
        setEmail("");
        setPassword("");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("server error");
      }
    }
  };
  return (
    <div
      className=" d-flex justify-content-center align-items-center"
      style={{ height: "100vh ", background: "grey" }}
    >
      <form onSubmit={handlsubmit} className="w-30 bg-light p-3 rounded mt-5 ">
        <h2 className="text-center mb-4">Login</h2>
        {Error && <p className="text text-warning text-center">{Error}</p>}
        <div>
          <label>
            <strong>Email:</strong>
          </label>
          <input
            className="form-control"
            value={Email}
            type="email"
            name="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mt-2">
          <label>
            <strong>Password:</strong>
          </label>
          <input
            className="form-control"
            value={Password}
            type="password"
            name="Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <label className="d-inline-flex align-items-center">
            <input type="checkbox" className="me-1"></input>Remember me
          </label>
          <a href="/" className="fs-7">
            forgot passwod
          </a>
        </div>

        <button type="submit" className="btn btn-success mt-4 w-100">
          Login
        </button>
        <p>d you agree with terms and condition</p>
      </form>
    </div>
  );
}
