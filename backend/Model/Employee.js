const mongoose = require("mongoose");

const Employeeschema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  employeeId: { type: String, required: true, unique: true },
  Dob: { type: String },
  Gendre: { type: String },
  status: { type: String },
  Dsn: { type: String },
  departments: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Deppartments",
  },
  Salary: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Employee = mongoose.model("Employee", Employeeschema);
module.exports = Employee;
