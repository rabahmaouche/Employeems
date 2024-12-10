import React from "react";
import { useAuth } from "../../Context/AuthContext";

function EmployeeNavbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar ">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <h5 className="text-center text-white ">welcome,{user.name}</h5>
        <button className="btn btn-danger" onClick={logout}>
          logout
        </button>
      </div>
    </nav>
  );
}

export default EmployeeNavbar;
