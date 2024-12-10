import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Editedep() {
  const { id } = useParams();
  const [department, setDepartment] = useState({
    deptname: "",
    deptdesc: "",
  });
  const navigate = useNavigate();

  const handlhchange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  useEffect(() => {
    const geteditdep = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/auth/${id}`,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setDepartment(response.data.Departments);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log("thisis the errro", error);
        }
      }
    };
    geteditdep();
  }, [id]);

  const handlUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/auth/${id}`,
        { department },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.updateDep);
        alert("update succefully");
        navigate("/admin-dashboard/department");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log("thisis the errro", error);
      }
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center p-5 p-md-0">
      <form onSubmit={handlUpdate} className="p-3 border w-25 rounded mt-5">
        <h3 className="text-center mb-5">Edit Department</h3>
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
        <button type="submit" className="btn btn-success mt-3 w-100">
          Edite departments
        </button>
      </form>
    </div>
  );
}

export default Editedep;
