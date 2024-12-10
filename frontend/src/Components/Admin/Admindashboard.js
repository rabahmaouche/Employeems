import React from "react";
import Sidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";

function Admindashboard() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="w-100">
        <div className=" bg-dark-green w-100" style={{ height: "58px" }}>
          <AdminNavbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Admindashboard;
