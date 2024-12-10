import React from "react";
import SummaryCard from "./SumaryempCard";

export default function EmployeeSummary() {
  return (
    <div className="p-3">
      <h3 className="fw-bold text-center">Employee Dashboard </h3>
      <div className="row row-cols-1   g-4 mt-3  ">
        <div className="col">
          <SummaryCard color="bg-dark-green" />
        </div>
      </div>
    </div>
  );
}
