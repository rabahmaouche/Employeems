import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Actionbutton, column } from "../../../utile/HelperDepartments";

function Department() {
  const [depData, setdepartment] = useState([]);
  const [filterdepData, setfilterdep] = useState([]);

  const ondelete = useCallback(
    async (id) => {
      const data = depData.filter((dep) => dep._id !== id);
      setdepartment(data);
    },
    [depData]
  );
  useEffect(() => {
    const getdepartments = async () => {
      try {
        const Department = await axios.get(
          "http://localhost:3000/api/auth/Department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (Department.data.success) {
          let sno = 1;
          const data = await Department.data.Departments.map((dep) => {
            return {
              id: dep._id,
              sno: sno++,
              name: dep.deptname,
              action: <Actionbutton depid={dep._id} ondelete={ondelete} />,
            };
          });

          setfilterdep(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log("thisis the errro", error);
        }
      }
    };
    getdepartments();
  }, [ondelete]);

  const handlfilterdep = (e) => {
    const record = depData.filter((dep) =>
      dep.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setfilterdep(record);
  };
  return (
    <div className="p-4">
      <h1>Department</h1>
      <div className="w-100  d-flex justify-content-between align-items-center ">
        <div className="d-inline-flex">
          <label htmlFor="saerch" className="fs-5 me-1">
            <strong>Search:</strong>
          </label>
          <input
            type="search"
            id="search"
            name="search"
            placeholder="Search departement .."
            className="form-control w-100"
            onChange={handlfilterdep}
          />
        </div>
        <Link to={"/admin-dashboard/Add-depatements"}>
          <button className="btn btn-secondary ms-5">Add department</button>
        </Link>
      </div>
      <div>
        <div className="bg-secondary ">
          <DataTable columns={column} data={filterdepData} pagination />
        </div>
      </div>
    </div>
  );
}

export default Department;
