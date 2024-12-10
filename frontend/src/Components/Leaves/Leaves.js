import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function Leaves() {
  const [Leave, setLeaves] = useState([]);
  const [Loading, setloading] = useState();
  const [filterslr, setfilter] = useState([]);
  const { id } = useParams();
  const { user } = useAuth();
  let sno = 1;

  useEffect(() => {
    setloading(true);
    const getLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/Leaves/${id}`,
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
    getLeave();
  }, [id]);
  const handfilter = (e) => {
    const filterdata = Leave.filter((Leave) =>
      Leave.leaveType.toLowerCase().includes(e.target.value.toLowerCase())
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
            {user.role === "employee" && (
              <Link to={"/employees-dashboard/Leaves/AddLeave"}>
                <button className="btn btn-success ms-5">Add Leave</button>
              </Link>
            )}
          </div>
          <table className="w-100 mt-3 ">
            <thead className="border">
              <tr className="text-center">
                <th className="border p-1">S no</th>
                <th className="border p1">Leave Type</th>
                <th className="border p-1">From</th>
                <th className="border p-1">To</th>
                <th className="border p-1">Reason</th>
                <th className="border p-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {filterslr.map((Leave) => (
                <tr key={Leave?._id} className="text-center border p-1">
                  <td className="border p-1">{sno++}</td>
                  <td className="border p-1">{Leave?.leaveType}</td>
                  <td className="border p-1">
                    {new Date(Leave?.startDate).toLocaleDateString()}
                  </td>
                  <td className="border p-1">
                    {new Date(Leave?.endDate).toLocaleDateString()}
                  </td>
                  <td className="border p-1">{Leave?.reason}</td>
                  <td className="border p-1">{Leave?.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
