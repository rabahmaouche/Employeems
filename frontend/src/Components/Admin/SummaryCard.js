import React from "react";
import "./Admin.css";
export default function SummaryCard({ icon, text, number, color }) {
  return (
    <div className="d-flex rounded  border">
      <div
        className={`d-flex align-items-center justify-content-center px-4 text-white ${color} fs-3`}
      >
        <div>{icon}</div>
      </div>
      <div className="p-1 ms-3">
        <p style={{ fontWeight: "550" }}>{text}</p>
        <p className="fw-bold">{number}</p>
      </div>
    </div>
  );
}
