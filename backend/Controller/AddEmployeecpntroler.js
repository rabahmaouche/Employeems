const multer = require("multer");
const mongoose = require("mongoose");
const Employee = require("../Model/Employee");
const User = require("../Model/User");
const bcrypt = require("bcrypt");
const DepartmentModel = require("../Model/Adddepschema");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/image");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

const AddEmployee = async (req, res) => {
  const { name, email, Dob, Dep, pwd, EId, Gendre, Dsn, Salary, status, role } =
    req.body;
  console.log("file:", req.file); // Check if the file is properly uploaded
  console.log("body:", req.body);
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // create user
    const hashedPassword = await bcrypt.hash(pwd, 10);
    const newuser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      Profileimage: req.file ? req.file.filename : "",
    });
    const saveuser = await newuser.save();
    console.log("user created succefully");
    // check deppartments
    const depid = await DepartmentModel.findOne({ deptname: Dep });
    // creat employee
    const setEmployee = new Employee({
      userId: saveuser._id,
      employeeId: EId,
      Gendre,
      Dob,
      status,
      Dsn,
      departments: depid._id,
      Salary,
    });
    await setEmployee.save();
    console.log("employee created");
    res.send({ success: true, message: "Employee added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: "Error adding employee" });
  }
};

// get employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId")
      .populate("departments");

    res.send({
      success: true,
      employees,
      message: "Employees got successfully!",
    });
  } catch (error) {
    res.status(500).json({ error, message: "Error getting employees" });
  }
};
// get employee by id

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee;
    employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("departments");
    if (!employee) {
      employee = await Employee.findOne({
        userId: id,
      })
        .populate("userId", { password: 0 })
        .populate("departments");
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
// update employee
const UpdateEmp = async (req, res) => {
  const { id } = req.params;
  const { name, email, Dob, Dep, EId, Gendre, Dsn, Salary, status, role } =
    req.body.employee;
  try {
    //finf employee
    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    //fing user
    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // find departments
    const department = await DepartmentModel.findOne({ deptname: Dep });
    if (!department) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }
    const updateuser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      {
        name,
        email,
        role,
      }
    );
    const updateemp = await Employee.findByIdAndUpdate(
      { _id: id },
      {
        employeeId: EId,
        Gendre,
        Dob,
        status,
        Dsn,
        departments: department._id,
        Salary,
      },
      { new: true }
    );

    if (!updateemp || !updateemp || !updateuser) {
      return res.status(404).json({
        success: false,
        message: "update not  not done",
      });
    }

    res.status(200).json({
      success: true,
      message: "employee updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getemployeebydep = async (req, res) => {
  const { id } = req.params;
  try {
    /*find dep name */
    const dep = await DepartmentModel.findOne({ deptname: id });
    if (!dep) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }
    const employee = await Employee.find({ departments: dep._id })
      .populate("userId")
      .populate("departments");

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
module.exports = {
  AddEmployee,
  upload,
  getEmployees,
  getEmployee,
  UpdateEmp,
  getemployeebydep,
};
