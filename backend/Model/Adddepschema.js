const mongoose = require("mongoose");
const Employee = require("./Employee");
const Leave = require("./Leave");
const SalaryModel = require("./Salary");

const DepSchema = new mongoose.Schema({
  deptname: { type: String, required: true },
  deptdesc: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

DepSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const employees = await Employee.find({ departments: this._id });
      const emp = employees.map((emp) => emp._id);

      await Employee.deleteMany({ departments: this._id });
      await Leave.deleteMany({ employeeId: { $in: emp } });
      await SalaryModel.deleteMany({ employeeId: { $in: emp } });
      next();
    } catch (error) {
      next(error);
    }
  }
);

const DepartmentModel = mongoose.model("Deppartments", DepSchema);

module.exports = DepartmentModel;
