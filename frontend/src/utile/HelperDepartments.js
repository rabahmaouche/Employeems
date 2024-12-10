import { useNavigate } from "react-router-dom";
import axios from "axios";
export const column = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },

  {
    name: "Departments Name",
    selector: (row) => row.name,
  },
  {
    name: "Actions",
    selector: (row) => row.action,
  },
];

export const Actionbutton = ({ depid, ondelete }) => {
  const navigate = useNavigate();

  const handlDelete = async (id) => {
    const confirm = window.confirm("do you want to delete");
    if (confirm) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/auth/${depid}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          ondelete(depid);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log("thisis the errro", error);
        }
      }
    }
  };
  return (
    <div>
      <button
        className="btn btn-success me-3"
        onClick={() => navigate(`/admin-dashboard/department/${depid}`)}
      >
        Edite
      </button>
      <button className="btn btn-danger" onClick={handlDelete}>
        Delete
      </button>
    </div>
  );
};
