import React from "react";
import { NavLink } from "react-router-dom";

import {
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
export default function Sidebar() {
  const { user } = useAuth();
  return (
    <div
      className="text-white "
      style={{ backgroundColor: "#003349", width: "250px", height: "100vh" }}
    >
      <div className="p-2 text-center bg-dark-green">
        <h3 style={{ fontFamily: "'Indie Flower', cursive" }}>Emloyee MS</h3>
      </div>
      <div className="d-block p-3">
        <NavLink
          id="navlink"
          to={"/employees-dashboard"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-dark-green" : ""
            } align-items-center d-flex  p-2 mb-2 rounded text-decoration-none text-white`
          }
          end
        >
          <FaTachometerAlt className="me-2" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          id="navlink"
          to={`/employees-dashboard/Profile/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-dark-green" : ""
            } align-items-center d-flex  p-2 mb-2 rounded text-decoration-none text-white`
          }
        >
          <FaUsers className="me-2" />
          <span>Profil</span>
        </NavLink>

        <NavLink
          id="navlink"
          to={`/employees-dashboard/Leaves/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-dark-green" : ""
            } align-items-center d-flex  p-2 mb-2 rounded text-decoration-none text-white`
          }
        >
          <FaCalendarAlt className="me-2" />
          <span>Leave</span>
        </NavLink>
        <NavLink
          id="navlink"
          to={`/employees-dashboard/Salary/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-dark-green" : ""
            } align-items-center d-flex  p-2 mb-2 rounded text-decoration-none text-white`
          }
        >
          <FaMoneyBillWave className="me-2" />
          <span>Salary</span>
        </NavLink>
        <NavLink
          id="navlink"
          to={`/employees-dashboard/Setting`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-dark-green" : ""
            } align-items-center d-flex  p-2 mb-2 rounded text-decoration-none text-white`
          }
        >
          <FaCogs className="me-2" />
          <span>Setting</span>
        </NavLink>
      </div>
    </div>
  );
}
