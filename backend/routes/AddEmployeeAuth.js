const express = require("express");

const Middlewear = require("../middlewear/AuthMiddlewear");
const {
  upload,
  AddEmployee,
  getEmployees,
  getEmployee,
  UpdateEmp,
  getemployeebydep,
} = require("../Controller/AddEmployeecpntroler");

const router = express.Router();

router.post("/AddEmployee", Middlewear, upload.single("image"), AddEmployee);
router.get("/getemployees", Middlewear, getEmployees);
router.get("/:id", Middlewear, getEmployee);
router.put("/:id", Middlewear, UpdateEmp);
router.get("/Salary/:id", getemployeebydep);

module.exports = router;
