import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
function ViewEmploee() {
  const { id } = useParams();
  const [Employee, setEmployee] = useState([]);
  const Navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    const getemp = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/Employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log("thisis the errro", error);
        }
      }
    };
    getemp();
  }, [id]);
  if (!Employee || !Employee.userId) {
    return <div>Loading...</div>;
  }
  return (
    <div className="d-flex justify-content-center align-items-center p-3">
      {" "}
      <form className="p-3 mt-5 border w-75 rounded ">
        <h3 className="text-center mb-3">Employee details</h3>
        <div className="d-flex">
          <div className="w-50 me-3 ">
            <img
              className="rounded-circle w-100 "
              src={`http://localhost:3000/${Employee.userId.Profileimage}`}
              alt=""
            />
          </div>
          <div className=" mt-2 p-2">
            <div>
              <p>
                <strong>Name:</strong> {Employee.userId.name}
              </p>
            </div>
            <div>
              <p>
                <strong>Employee ID:</strong> {Employee.employeeId}
              </p>
            </div>
            <div>
              <p>
                <strong>Date of birth:</strong>{" "}
                {new Date(Employee.Dob).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p>
                <strong>Gendre:</strong> {Employee.Gendre}
              </p>
            </div>
            <div>
              <p>
                <strong>Department</strong> {Employee.departments.deptname}
              </p>
            </div>
            <div>
              <p>
                <strong>Marital state:</strong> {Employee.status}
              </p>
            </div>
          </div>
        </div>
        <button
          className="btn btn-warning"
          onClick={(e) => {
            e.preventDefault();
            if (user.role === "admin") {
              Navigate("/admin-dashboard/Employees");
            } else {
              Navigate("/employees-dashboard");
            }
          }}
        >{`<< back`}</button>
      </form>
    </div>
  );
}

export default ViewEmploee;
