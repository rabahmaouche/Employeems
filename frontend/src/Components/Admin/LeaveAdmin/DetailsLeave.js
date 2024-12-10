import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
function Details() {
  const { id } = useParams();
  const [Leaves, setLeaves] = useState([]);
  const Navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    const getLeavesDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/Leaves/LeavesDetails/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeaves(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log("thisis the errro", error);
        }
      }
    };
    getLeavesDetails();
  }, [id]);

  const statuschange = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/Leaves/Status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        Navigate("/admin-dashboard/Leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log("thisis the errro", error);
      }
    }
  };
  if (!Leaves) {
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
              src={`http://localhost:3000/${Leaves?.employeeId?.userId?.Profileimage}`}
              alt=""
            />
          </div>
          <div className=" mt-2 p-2">
            <div>
              <p>
                <strong>Name:</strong>{" "}
                {Leaves?.employeeId?.userId?.name || "no name"}
              </p>
            </div>
            <div>
              <p>
                <strong>Employee ID:</strong> {Leaves?.employeeId?.employeeId}
              </p>
            </div>
            <div>
              <p>
                <strong>Date of birth:</strong>{" "}
                {new Date(Leaves?.employeeId?.Dob).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p>
                <strong>Gendre:</strong> {Leaves?.employeeId?.Gendre}
              </p>
            </div>
            <div>
              <p>
                <strong>Department</strong>{" "}
                {Leaves?.employeeId?.departments?.deptname}
              </p>
            </div>
            <div>
              <p>
                <strong>Leave From : </strong>{" "}
                {new Date(Leaves.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p>
                <strong>To : </strong>{" "}
                {new Date(Leaves.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p>
                <strong>Reason: </strong> {Leaves.reason}
              </p>
            </div>
            <div>
              <p>
                <strong>
                  {Leaves.status === "Pending" ? "Pending... : " : "Status : "}
                </strong>{" "}
                {Leaves?.status === "Pending" ? (
                  <>
                    <button
                      className="btn btn-success mx-2"
                      onClick={(e) => {
                        e.preventDefault();
                        statuschange(Leaves._id, "Approved");
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => statuschange(Leaves._id, "Rejected")}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  Leaves?.status
                )}
              </p>
            </div>
          </div>
        </div>
        <button
          className="btn btn-warning"
          onClick={(e) => {
            e.preventDefault();
            if (user.role === "admin") {
              Navigate("/admin-dashboard/Leaves");
            } else {
              Navigate("/employees-dashboard/Leaves");
            }
          }}
        >{`<< back`}</button>
      </form>
    </div>
  );
}

export default Details;
