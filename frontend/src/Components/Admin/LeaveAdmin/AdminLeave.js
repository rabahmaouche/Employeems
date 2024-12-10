import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLeaves() {
  const [Leave, setLeaves] = useState();
  const [Loading, setloading] = useState();
  const [filterslr, setfilter] = useState([]);
  const navigate = useNavigate();
  let sno = 1;

  useEffect(() => {
    setloading(true);
    const getLeaves = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/Leaves/Leaves`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeaves(response.data.leave);
          setfilter(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log("thisis the errro", error);
        }
      } finally {
        setloading(false);
      }
    };
    getLeaves();
  }, []);
  const handfilter = (e) => {
    const filterdata = Leave.filter((Leave) =>
      Leave.employeeId.userId.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setfilter(filterdata);
  };
  const filterByButtun = (status) => {
    const filterdata = Leave.filter((Leave) =>
      Leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setfilter(filterdata);
  };
  return (
    <>
      {Loading ? (
        <div>Looding...</div>
      ) : (
        <div className="p-4">
          <h1>Leaves</h1>
          <div className="w-100  d-flex justify-content-between align-items-center ">
            <div className="d-inline-flex">
              <label htmlFor="saerch" className="fs-5 me-1">
                <strong>Search:</strong>
              </label>
              <input
                type="search"
                id="search"
                name="search"
                placeholder="Search Leaves .."
                className="form-control w-100"
                onChange={handfilter}
              />
            </div>
            <div>
              <button
                className="btn  btn-success ms-1"
                onClick={() => filterByButtun("Pending")}
              >
                pending
              </button>

              <button
                className="btn btn-success ms-1"
                onClick={() => filterByButtun("Approved")}
              >
                accepted
              </button>

              <button
                className="btn btn-success ms-1"
                onClick={() => filterByButtun("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          {filterslr && filterslr.length !== 0 ? (
            <table className="w-100 mt-3 ">
              <thead className="border">
                <tr className="text-center">
                  <th className="border p-1">S no</th>
                  <th className="border p-1">Name</th>
                  <th className="border p-1">leaveType</th>
                  <th className="border p-1">Department</th>
                  <th className="border p-1">Days</th>
                  <th className="border p-1">Status</th>
                  <th className="border p-1">View</th>
                </tr>
              </thead>
              <tbody>
                {filterslr.map((Leave) => (
                  <tr key={Leave._id} className="text-center border p-1">
                    <td className="border p-1">{sno++}</td>
                    <td className="border p-1">
                      {Leave.employeeId?.userId?.name || "no name"}
                    </td>
                    <td className="border p-1">{Leave.leaveType}</td>
                    <td className="border p-1">
                      {Leave.employeeId.departments.deptname}
                    </td>

                    <td className="border p-1">
                      {new Date(Leave.endDate).getDate() -
                        new Date(Leave.startDate).getDate()}
                    </td>
                    <td className="border p-1">{Leave.status}</td>

                    <td className="border p-1">
                      <button
                        className="btn btn-success w-75 "
                        onClick={() => {
                          navigate(`/admin-dashboard/Leaves/${Leave._id}`);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center mt-5 p-3 w-75 bg-secondary m-auto">
              No Record Yet
            </div>
          )}
        </div>
      )}
    </>
  );
}
