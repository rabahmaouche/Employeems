const Leave = require("../Model/Leave");
const Employee = require("../Model/Employee");

const AddLeave = async (req, res) => {
  const { userId, leaveType, startDate, endDate, reason } = req.body;
  console.log("data", req.body);
  try {
    const emp = await Employee.findOne({ userId });
    if (!emp) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const newLeave = new Leave({
      employeeId: emp._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();
    res.status(200).json({
      success: true,
      newLeave,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getLeave = async (req, res) => {
  try {
    const { id } = req.params;
    let leave;
    leave = await Leave.find({ employeeId: id });
    if (!leave) {
      const emp = await Employee.find({ userId: id });
      leave = await Leave.find({ employeeId: emp._id });
    }
    res.status(200).json({
      success: true,
      leave,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
/*get Leaves for Admin*/
const getLeaves = async (req, res) => {
  try {
    const leave = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "departments",
          select: "deptname",
        },
        {
          path: "userId",
          select: "name",
        },
      ],
    });

    res.status(200).json({
      success: true,
      leave,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        {
          path: "departments",
          select: "deptname",
        },
        {
          path: "userId",
          select: "name Profileimage",
        },
      ],
    });

    res.status(200).json({
      success: true,
      leave,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const Status = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: status }
    );
    if (!Status) {
      return res
        .status(404)
        .json({ success: false, message: "Leave not found" });
    }

    res.status(200).json({
      success: true,
      Status,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { AddLeave, getLeave, getLeaves, getDetails, updateStatus };
