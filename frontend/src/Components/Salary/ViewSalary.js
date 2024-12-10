import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewSalary() {
  const [Salaries, setSalaries] = useState([]);
  const [filterslr, setfilter] = useState([]);
  const [Loading, setloading] = useState(false);
  const { id } = useParams();
  let sno = 1;

  useEffect(() => {
    setloading(true);
    const getSalary = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/Salary/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data.success);
        if (response.data.success) {
          setSalaries(response.data.salaries);
          setfilter(response.data.salaries);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          console.log("thisis the errro", error);
        }
      } finally {
        setloading(false);
      }
    };
    getSalary();
  }, [id]);
  const handfilter = (e) => {
    const filterdata = Salaries.filter((slr) =>
      slr.name.toLowerCase().includes(e.target.value)
    );
    setfilter(filterdata);
  };
  return (
    <>
      {Loading ? (
        <div>Lodding ...</div>
      ) : (
        <div className="p-4">
          <h1 className="text-center mb-2">Salary</h1>
          <div className="w-100  d-flex justify-content-between align-items-center ">
            <div className="d-inline-flex">
              <label htmlFor="search" className="fs-5 me-1">
                <strong>Search:</strong>
              </label>
              <input
                type="search"
                id="search"
                name="search"
                placeholder="Search Salary .."
                className="form-control w-100"
                onChange={handfilter}
              />
            </div>
          </div>
          {filterslr.length > 0 ? (
            <table className="w-100 mt-3 ">
              <thead className="border">
                <tr className="text-center">
                  <th className="border p-1">S no</th>
                  <th className="border p1">Eid</th>
                  <th className="border p-1">Allowences</th>
                  <th className="border p-1">Deducation</th>
                  <th className="border p-1">Total</th>
                  <th className="border p-1">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filterslr.map((salary) => (
                  <tr key={salary._id} className="text-center border p-1">
                    <td className="border p-1">{sno++}</td>
                    <td className="border p-1">
                      {salary.employeeId.employeeId}
                    </td>
                    <td className="border p-1">{salary.Allowences}</td>
                    <td className="border p-1">{salary.Deducation}</td>
                    <td className="border p-1">{salary.netSalary}</td>
                    <td className="border p-1">
                      {new Date(salary.netSalary).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-100 text-center">No record</div>
          )}
        </div>
      )}
    </>
  );
}

export default ViewSalary;
