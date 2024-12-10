import React, { useEffect, useState } from "react";
import { fetchselectdep } from "./helperEmployyee";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Editeemp() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    EId: "",
    Dob: "",
    Gendre: "",
    status: "",
    Dsn: "",
    Dep: "",
    salary: "",
    role: "",
  });
  const [depselect, setdepselect] = useState([]);
  const navigate = useNavigate();
  const handkchange = (e) => {
    const { name, value } = e.target;

    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const verifydepselect = async () => {
      const Dep = await fetchselectdep();
      setdepselect(Dep);
    };
    verifydepselect();
  }, []);
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
        console.log(response.data);
        if (response.data.success) {
          const Employee = response.data.employee;
          setEmployee((prev) => {
            return {
              ...prev,
              name: Employee.userId.name,
              email: Employee.userId.email,
              role: Employee.userId.role,
              status: Employee.status,
              EId: Employee.employeeId,
              Dob: Employee.Dob,
              Gendre: Employee.Gendre,
              Dsn: Employee.Dsn,
              Dep: Employee.departments.deptname,
              salary: Employee.Salary,
            };
          });
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log("thisis the errro", error);
        }
      }
    };
    getemp();
  }, [id]);
  const handlUpdate = async (e) => {
    e.preventDefault();
    console.log("hello");
    try {
      const response = await axios.put(
        `http://localhost:3000/api/Employee/${id}`,
        { employee },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/Employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log("thisis the errro", error);
      }
    }
  };
  if (!employee) {
    return <div>Loading...</div>;
  }
  return (
    <div className="d-flex justify-content-center align-items-center p-md-0">
      <form onSubmit={handlUpdate} className="p-2 border w-75  rounded mt-2">
        <h3 className="text-center mb-5">Add Employee</h3>
        <div className="row  row-cols-2 g-4">
          <div className="col">
            <label htmlFor="name">
              <strong>Name:</strong>
            </label>
            <input
              value={employee.name}
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
              value={employee.email}
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
              value={employee.EId}
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
              value={employee.Dob}
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
              value={employee.Gendre}
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
              value={employee.status}
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
              value={employee.Dsn}
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
            <select
              value={employee.Dep}
              name="Dep"
              className="form-select"
              onChange={handkchange}
            >
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
              value={employee.salary}
              type="number"
              name="salary"
              className="form-control"
              placeholder="Salary"
              onChange={handkchange}
            />
          </div>

          <div className="col">
            <label htmlFor="role">
              <strong>Role:</strong>
            </label>
            <select
              value={employee.role}
              name="role"
              className="form-select"
              onChange={handkchange}
            >
              <option value="admin">admin</option>
              <option value="employee">employee</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-success mt-3 w-100">
          update Employee
        </button>
      </form>
    </div>
  );
}

export default Editeemp;
