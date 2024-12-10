import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchselectdep, getemployeebydep } from "../Employee/helperEmployyee";

function Editeemp() {
  const [Salary, setSalary] = useState({
    Allowences: 0,
    BasicSalary: "",
    Deducation: "",
    Pay_Date: "",
    EId: "",
  });
  const [depselect, setdepselect] = useState([]);
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();
  const handkchange = (e) => {
    const { name, value } = e.target;

    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const verifydepselect = async () => {
      const Dep = await fetchselectdep();
      setdepselect(Dep);
    };
    verifydepselect();
  }, []);

  const handldep = async (e) => {
    const emp = await getemployeebydep(e.target.value);
    setEmployee(emp);
  };

  const addsalary = async (e) => {
    e.preventDefault();
    alert("you are going to add salry");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/Salary/AddSalary",
        Salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("this is Data", response.data.newSalary);
      if (response.data.success) {
        navigate("/admin-dashboard/Employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log("thisis the errro", error);
      }
    }
  };
  if (!Salary) {
    return <div>Loading...</div>;
  }
  return (
    <div className="d-flex justify-content-center align-items-center p-md-0">
      <form
        onSubmit={addsalary}
        className="p-2 border w-75 mt-5 p-5 rounded mt-2"
      >
        <h3 className="text-center mb-5">Add Salary</h3>
        <div className="row  row-cols-2 g-4">
          {/*departmments fetch */}
          <div className="col">
            <label htmlFor="Dep">
              <strong>Select Department</strong>
            </label>
            <select name="Dep" className="form-select" onChange={handldep}>
              <option value="select Depatments">Select dep</option>
              {depselect.map((dep) => (
                <option key={dep._id} value={dep.deptname}>
                  {dep.deptname}
                </option>
              ))}
            </select>
          </div>
          {/*employees fetch */}
          <div className="col">
            <label htmlFor="EId">
              <strong>Select Employee</strong>
            </label>
            <select name="EId" className="form-select" onChange={handkchange}>
              <option value="select Depatments">Select dep</option>
              {employee &&
                employee.map((emp) => (
                  <option key={emp._id} value={emp.employeeId}>
                    {emp.employeeId}
                  </option>
                ))}
            </select>
          </div>
          <div className="col">
            <label htmlFor="BasicSalary">
              <strong>Salary</strong>
            </label>
            <input
              type="number"
              name="BasicSalary"
              className="form-control"
              placeholder="Salary"
              onChange={handkchange}
            />
          </div>
          <div className="col">
            <label htmlFor="Allowences">
              <strong>Allowences</strong>
            </label>
            <input
              type="number"
              name="Allowences"
              className="form-control"
              onChange={handkchange}
            />
          </div>
          <div className="col">
            <label htmlFor="Deducation">
              <strong>Deducation</strong>
            </label>
            <input
              type="number"
              name="Deducation"
              className="form-control"
              onChange={handkchange}
            />
          </div>

          <div className="col">
            <label htmlFor="Pay_Date">
              <strong>Pay Date</strong>
            </label>
            <input
              type="Date"
              name="Pay_Date"
              className="form-control"
              onChange={handkchange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success mt-3 w-100">
          Add Salary
        </button>
      </form>
    </div>
  );
}

export default Editeemp;
