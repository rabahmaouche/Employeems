const SalaryModel = require("../Model/Salary");
const Employee = require("../Model/Employee");

const AddSalary = async (req, res) => {
  const { Allowences, BasicSalary, Deducation, Pay_Date, EId } = req.body;
  console.log("Request Body:", req.body);
  try {
    const TotalSalary =
      parseInt(BasicSalary) + parseInt(Allowences) - parseInt(Deducation);

    const empId = await Employee.findOne({ employeeId: EId });
    if (!empId) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const newSalary = new SalaryModel({
      employeeId: empId._id,
      Allowences,
      BasicSalary,
      Deducation,
      netSalary: TotalSalary,
      Pay_Date,
    });

    await newSalary.save();
    res.status(200).json({
      success: true,
      newSalary,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

/*get Salary*/

const getSalary = async (req, res) => {
  const { id } = req.params;
  try {
    let salaries;
    salaries = await SalaryModel.find({ employeeId: id }).populate(
      "employeeId",
      "employeeId"
    );
    if (!salaries || salaries.length < 1) {
      const emp = await Employee.findOne({
        userId: id,
      });
      salaries = await SalaryModel.find({
        employeeId: emp._id,
      }).populate("employeeId");
    }
    res.status(200).json({ success: true, salaries });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { AddSalary, getSalary };
