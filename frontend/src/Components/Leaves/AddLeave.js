import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";

export default function AddLeave() {
  const { user } = useAuth();
  const [Leave, setLeave] = useState({
    userId: user._id,
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const navigate = useNavigate();
  const handkchange = (e) => {
    const { name, value } = e.target;

    setLeave((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlhLeave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/Leaves/AddLeave",
        Leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/employees-dashboard/Leaves");
      }
    } catch (error) {}
  };
  return (
    <div className="d-flex justify-content-center align-items-center p-md-0">
      <form onSubmit={handlhLeave} className="p-2 border w-75  rounded mt-2">
        <h3 className="text-center mb-5">Add Leave</h3>
        <div className="row  row-cols-2 g-4">
          <div className="col">
            <label htmlFor="leaveType">
              <strong>Leave Type:</strong>
            </label>
            <select
              name="leaveType"
              className="form-select"
              onChange={handkchange}
            >
              <option value={""}>select Leave</option>
              <option value={"Sick Leave"}>Sick Leave</option>
              <option value={"Casual Leave"}>Casual Leave</option>
              <option value={"Annaul Leave"}>Annaul Leave</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="startDate">
              <strong>From Date:</strong>
            </label>
            <input
              type="Date"
              name="startDate"
              className="form-control"
              onChange={handkchange}
            />
          </div>

          <div className="col">
            <label htmlFor="endDate">
              <strong>To Date:</strong>
            </label>
            <input
              type="Date"
              name="endDate"
              className="form-control"
              onChange={handkchange}
            />
          </div>

          <div className="w-100">
            <label htmlFor="reason">
              <strong>Desciption:</strong>
            </label>
            <textarea
              name="reason"
              className="form-control"
              onChange={handkchange}
            ></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-success mt-3 w-100">
          Add
        </button>
      </form>
    </div>
  );
}
