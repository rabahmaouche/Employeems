const mongoose = require("mongoose");

const Leaveschema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Employee",
  },
  leaveType: {
    type: String,
    enum: ["Sick Leave", "Casual Leave", "Annaul Leave"],
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Leave = mongoose.model("Leaves", Leaveschema);
module.exports = Leave;
