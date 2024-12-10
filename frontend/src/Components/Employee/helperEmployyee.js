import axios from "axios";
import { useNavigate } from "react-router-dom";

export const fetchselectdep = async () => {
  let Dep;
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
      Dep = Department.data.Departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      console.log("thisis the errro", error);
    }
  }
  return Dep;
};

/* get employee by dep*/

export const getemployeebydep = async (id) => {
  let emp;
  try {
    const response = await axios.get(
      `http://localhost:3000/api/Employee/Salary/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      emp = response.data.employee;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      console.log("thisis the errro", error);
    }
  }
  return emp;
};
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    sortable: true,
    width: "70px",
  },

  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Image",
    selector: (row) => <div className="d-flex  ">{row.ProfileImage}</div>,

    width: "150px",
  },
  {
    name: "Departments",
    selector: (row) => row.Dep,
    width: "150px",
  },
  {
    name: "Date of Birth",
    selector: (row) => row.Dob,
    width: "150px",
  },
  {
    name: <div className="w-100 text-center">Action</div>,
    selector: (row) => row.action,
    // centers the column header
    cell: (row) => (
      <div className="d-flex justify-content-center    w-100 ">
        {row.action}
      </div>
    ),
  },
];

export const Actionempbutton = ({ empid }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-between w-75 ">
      <button
        className="btn btn-success "
        onClick={() => {
          navigate(`/admin-dashboard/Employees/${empid}`);
        }}
      >
        View
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate(`/admin-dashboard/Employees/Edite/${empid}`);
        }}
      >
        Edite
      </button>
      <button
        className="btn btn-warning"
        onClick={() => {
          navigate(`/admin-dashboard/Salary/View/${empid}`);
        }}
      >
        Salary
      </button>
      <button
        className="btn btn-danger"
        onClick={() => {
          navigate(`/admin-dashboard/EmployeeLeaves/${empid}`);
        }}
      >
        leave
      </button>
    </div>
  );
};
