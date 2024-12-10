import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./EmployeeSidebar";
import EmployeeNavbar from "./EmployeeNavbar";
function EmployeeDash() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="w-100">
        <div className=" bg-dark-green w-100" style={{ height: "58px" }}>
          <EmployeeNavbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeDash;
