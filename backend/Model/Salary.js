const mongoose = require("mongoose");

const Salaryschema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Employee",
  },
  BasicSalary: { type: String, required: true },
  Allowences: { type: String },
  Deducation: { type: String },

  netSalary: { type: Number },
  Pay_Date: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const SalaryModel = mongoose.model("Salary", Salaryschema);
module.exports = SalaryModel;
