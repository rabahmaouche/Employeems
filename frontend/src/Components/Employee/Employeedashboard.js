import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { Actionempbutton, columns } from "./helperEmployyee";

function Employeedashboard() {
  const [Employees, setemployee] = useState([]);
  const [filteremp, setfilter] = useState([]);
  const [Loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    const getemployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/Employee/getemployees",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          let sno = 1;
          const Data = await response.data.employees.map((emp) => {
            return {
              id: emp._id,
              sno: sno++,
              Dob: emp.Dob
                ? new Date(emp.Dob).toLocaleDateString()
                : "invalide Date",
              name: emp.userId?.name || "no name",
              ProfileImage: emp.userId?.Profileimage ? (
                <img
                  className="rounded-circle  w-25"
                  src={`http://localhost:3000/${emp.userId.Profileimage}`}
                  alt=""
                />
              ) : (
                "no image"
              ),
              Dep: emp.departments?.deptname || "Without Department",
              action: <Actionempbutton empid={emp._id} />,
            };
          });
          setemployee(Data);
          setfilter(Data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log("thisis the errro", error);
        }
      } finally {
        setloading(false);
      }
    };
    getemployees();
  }, []);
  const handfilter = (e) => {
    const filterdata = Employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value)
    );
    setfilter(filterdata);
  };
  return (
    <>
      {Loading ? (
        <div>Lodding ...</div>
      ) : (
        <div className="p-4">
          <h1 className="text-center mb-2">Manage Employees</h1>
          <div className="w-100  d-flex justify-content-between align-items-center ">
            <div className="d-inline-flex">
              <label htmlFor="search" className="fs-5 me-1">
                <strong>Search:</strong>
              </label>
              <input
                type="search"
                id="search"
                name="search"
                placeholder="Search departement .."
                className="form-control w-100"
                onChange={handfilter}
              />
            </div>
            <Link to={"/admin-dashboard/Add-Employee"}>
              <button className="btn btn-success ms-5">Add Employee</button>
            </Link>
          </div>
          <div>
            <div className="bg-secondary ">
              <DataTable
                columns={columns}
                data={filteremp}
                noDataComponent="no employee"
                pagination
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Employeedashboard;
