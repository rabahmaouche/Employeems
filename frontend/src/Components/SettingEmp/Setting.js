import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function Setting() {
  const { user } = useAuth();
  const [Setting, setSetting] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
    userId: user._id,
  });

  const [errors, setEror] = useState("");
  const navigate = useNavigate();
  const handlhchange = (e) => {
    const { name, value } = e.target;
    setSetting((set) => ({ ...set, [name]: value }));
  };
  const changepassword = async (e) => {
    e.preventDefault();
    setEror("");
    if (Setting.newpassword !== Setting.confirmpwd) {
      setEror("Password do not match");
      console.log("new password is not match");
    } else {
      try {
        const response = await axios.put(
          "http://localhost:3000/api/Setting/changepwd",
          Setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          alert("chnaged success");
          navigate("/employees-dashboard");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setEror(error.response.data.message);
          console.log("thisis the errro", error);
        }
      }
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center p-5 p-md-0">
      <form onSubmit={changepassword} className="p-3 border w-35 rounded mt-5">
        <h3 className="text-center mb-5">Change Password</h3>
        {errors && <p className="text-warning">{errors}</p>}
        <div className="mb-3">
          <label htmlFor="oldpassword">
            <strong>old Password:</strong>
          </label>
          <input
            type="password"
            name="oldpassword"
            className="form-control"
            onChange={handlhchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newpassword">
            <strong>new Password:</strong>
          </label>
          <input
            type="password"
            name="newpassword"
            className="form-control"
            onChange={handlhchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpwd">
            <strong>confirm Password:</strong>
          </label>
          <input
            type="password"
            name="confirmpwd"
            className="form-control"
            onChange={handlhchange}
          />
        </div>

        <button type="submit" className="btn btn-success mt-3 w-100">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default Setting;
