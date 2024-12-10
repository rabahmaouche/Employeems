import React, { useEffect, useState } from "react";
import "./Employee.css";
import { fetchselectdep } from "./helperEmployyee";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const [depselect, setdepselect] = useState([]);
  const [formData, setfromData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const verifydepselect = async () => {
      const Dep = await fetchselectdep();
      setdepselect(Dep);
    };
    verifydepselect();
  }, []);

  const handkchange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setfromData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setfromData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handlhsubmit = async (e) => {
    e.preventDefault();
    const formDataobj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataobj.append(key, formData[key]);
    });
    for (let pair of formDataobj.entries()) {
      console.log(pair[0], pair[1]);
    }
    // API call to add Employment
    try {
      const response = await axios.post(
        "http://localhost:3000/api/Employee/AddEmployee",

        formDataobj,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(formData);
      if (response.data.success) {
        navigate("/admin-dashboard/Employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log("thisis the errro", error);
      }
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center p-md-0">
      <form onSubmit={handlhsubmit} className="p-2 border w-75  rounded mt-2">
        <h3 className="text-center mb-5">Add Employee</h3>
        <div className="row  row-cols-2 g-4">
          <div className="col">
            <label htmlFor="name">
              <strong>Name:</strong>
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Insert Name"
              onChange={handkchange}
            />
          </div>

          <div className="col">
            <label htmlFor="email ">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Insert Email"
              onChange={handkchange}
            />
          </div>

          <div className="col">
            <label htmlFor="EId">
              <strong>Employee Id:</strong>
            </label>
            <input
              type="text"
              name="EId"
              className="form-control"
              placeholder="Insert ID"
              onChange={handkchange}
            />
          </div>

          <div className="col">
            <label htmlFor="Dob">
              <strong>Date of Birth</strong>
            </label>
            <input
              type="date"
              name="Dob"
              className="form-control"
              onChange={handkchange}
            />
          </div>

          <div className="col">
            <label htmlFor="Gendre">
              <strong>Gendre</strong>
            </label>
            <select
              name="Gendre"
              className="form-select"
              onChange={handkchange}
            >
              <option value="">select Gendre</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="col">
            <label htmlFor="status">
              <strong>Marital status</strong>
            </label>
            <select
              name="status"
              className="form-select"
              onChange={handkchange}
            >
              <option value="">select status</option>
              <option value="Sigle">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>

          <div className="col">
            <label htmlFor="Dsn">
              <strong>Desingation</strong>
            </label>
            <input
              type="text"
              name="Dsn"
              className="form-control"
              onChange={handkchange}
            />
          </div>

          <div className="col">
            <label htmlFor="Dep">
              <strong>Select Department</strong>
            </label>
            <select name="Dep" className="form-select" onChange={handkchange}>
              {depselect.map((dep) => (
                <option key={dep._id} value={dep.deptname}>
                  {dep.deptname}
                </option>
              ))}
            </select>
          </div>

          <div className="col">
            <label htmlFor="salary">
              <strong>Salary</strong>
            </label>
            <input
              type="number"
              name="Salary"
              className="form-control"
              placeholder="Salary"
              onChange={handkchange}
            />
          </div>

          <div className="col">
            <label htmlFor="pwd">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="pwd"
              className="form-control"
              placeholder="*****"
              onChange={handkchange}
            />
          </div>

          <div className="col">
            <label htmlFor="role">
              <strong>Role:</strong>
            </label>
            <select name="role" className="form-select" onChange={handkchange}>
              <option value="admin">admin</option>
              <option value="employee">employee</option>
            </select>
          </div>

          <div className="col">
            <label htmlFor="image">
              <strong>Uploid Image:</strong>
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="form-control"
              onChange={handkchange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success mt-3 w-100">
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
