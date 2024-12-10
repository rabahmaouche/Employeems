import React from "react";
import "./Admin.css";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

export default function AdminSummary() {
  return (
    <div className="p-3">
      <h3 className="fw-bold">Dashboard Overview</h3>
      <div className="row row-cols-1  row-cols-md-2 row-cols-lg-3 g-4 mt-3  ">
        <div className="col">
          <SummaryCard
            icon={<FaUsers />}
            text="Total Employees"
            number={13}
            color="bg-dark-green"
          />
        </div>
        <div className="col">
          <SummaryCard
            icon={<FaBuilding />}
            text="Total Department"
            number={8}
            color="bg-warning"
          />
        </div>
        <div className="col">
          <SummaryCard
            icon={<FaMoneyBillWave />}
            text="Monthly Pay"
            number={5}
            color="bg-danger"
          />
        </div>
      </div>
      <h3 className="fw-bold mt-5 text-center">Leave Details</h3>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4 mt-3 ">
        <div className="col">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={13}
            color="bg-dark-green"
          />
        </div>
        <div className="col">
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Appproved"
            number={8}
            color="bg-approved-green"
          />
        </div>
        <div className="col">
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave pending "
            number={5}
            color="bg-warning"
          />
        </div>
        <div className="col">
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave reject"
            number={5}
            color="bg-danger"
          />
        </div>
      </div>
    </div>
  );
}
