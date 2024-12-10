const DepartmentModel = require("../Model/Adddepschema");

// get the all the department api
const getdepController = async (req, res) => {
  try {
    const Departments = await DepartmentModel.find();

    res.status(200).json({
      success: true,
      Departments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// creacte department api
const AdddepController = async (req, res) => {
  const { deptname, deptdesc } = req.body.department;
  try {
    const Dep = await DepartmentModel.create({
      deptname,
      deptdesc,
    });
    res.status(200).json({
      success: true,
      Dep: { name: Dep.deptname, desc: Dep.deptdesc },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// get the departments by params
const geteditdepcontroller = async (req, res) => {
  const { id } = req.params;
  try {
    const Departments = await DepartmentModel.findById({ _id: id });

    res.status(200).json({
      success: true,
      Departments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// update departments api
const Updatedepcontroller = async (req, res) => {
  const { id } = req.params;
  const { deptname, deptdesc } = req.body.department;

  try {
    const updateDep = await DepartmentModel.findByIdAndUpdate(
      { _id: id },
      { deptname, deptdesc },
      { new: true }
    );

    if (!updateDep) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      updateDep,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// delete dep api
const Deletedepcontroller = async (req, res) => {
  const { id } = req.params;
  try {
    const Deletedep = await DepartmentModel.findById({ _id: id });
    await Deletedep.deleteOne();
    res.status(200).json({
      success: true,
      Deletedep,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
module.exports = {
  AdddepController,
  getdepController,
  geteditdepcontroller,
  Updatedepcontroller,
  Deletedepcontroller,
};
