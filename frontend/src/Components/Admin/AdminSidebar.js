import React from "react";
import { NavLink } from "react-router-dom";
import "./Admin.css";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
export default function Sidebar() {
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
          to={"/admin-dashboard"}
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
          to={"/admin-dashboard/Employees"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-dark-green" : ""
            } align-items-center d-flex  p-2 mb-2 rounded text-decoration-none text-white`
          }
        >
          <FaUsers className="me-2" />
          <span>Employees</span>
        </NavLink>
        <NavLink
          id="navlink"
          to={"/admin-dashboard/department"}
          className={({ isActive }) =>
            `${
              isActive ? "bg-dark-green" : ""
            } align-items-center d-flex  p-2 mb-2 rounded text-decoration-none text-white`
          }
        >
          <FaBuilding className="me-2" />
          <span>Deppartment</span>
        </NavLink>
        <NavLink
          id="navlink"
          to={"/admin-dashboard/Leaves"}
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
          to={"/admin-dashboard/Salary/Add"}
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
          to={"/admin-dashboard/Setting"}
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
