import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddDep() {
  const [department, setDepartment] = useState({
    deptname: "",
    deptdesc: "",
  });
  const [fillfields, setfill] = useState("");
  const navigate = useNavigate();

  const handlhchange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handlsubmit = async (e) => {
    e.preventDefault();
    if (department.deptname === "" || department.deptdesc === "") {
      setfill("Please fill all fields");
    }
    // API call to add department
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/Adddep",
        { department },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/department");
        setDepartment({
          deptname: "",
          deptdesc: "",
        });
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log("thisis the errro", error);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center p-5 p-md-0">
      <form onSubmit={handlsubmit} className="p-3 border  rounded mt-5">
        <h3 className="text-center mb-5">Add Department</h3>
        {fillfields && <p className="text-warning">{fillfields}</p>}
        <div className="mb-3">
          <label>
            <strong>Department Name:</strong>
          </label>
          <input
            value={department.deptname}
            type="text"
            name="deptname"
            className="form-control"
            onChange={handlhchange}
          />
        </div>
        <div>
          <label>
            <strong>Department Description:</strong>
          </label>
          <textarea
            value={department.deptdesc}
            rows={5}
            cols={3}
            name="deptdesc"
            className="form-control"
            onChange={handlhchange}
          />
        </div>
        <button className="btn btn-success mt-3 w-100">Add departments</button>
      </form>
    </div>
  );
}

export default AddDep;
