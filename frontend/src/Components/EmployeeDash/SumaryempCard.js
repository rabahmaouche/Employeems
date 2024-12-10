import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
export default function SummaryCard({ color }) {
  const { user } = useAuth();
  return (
    <div className="d-flex rounded  border">
      <div
        className={`d-flex align-items-center justify-content-center px-4 text-white ${color} fs-3`}
      >
        <FaUser />
      </div>
      <div className="p-1 ms-3">
        <p style={{ fontWeight: "550" }}>
          <strong>Welcome Back</strong>
        </p>
        <p className="fw-bold text-danger">{user.name}</p>
      </div>
    </div>
  );
}
