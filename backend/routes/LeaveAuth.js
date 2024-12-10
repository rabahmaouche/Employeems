const express = require("express");

const Middlewear = require("../middlewear/AuthMiddlewear");
const {
  AddLeave,
  getLeave,
  getLeaves,
  getDetails,
  updateStatus,
} = require("../Controller/Leavecontroller");

const router = express.Router();

router.post("/AddLeave", Middlewear, AddLeave);
router.get("/Leaves", Middlewear, getLeaves);
router.get("/:id", Middlewear, getLeave);
router.get("/LeavesDetails/:id", Middlewear, getDetails);
router.put("/Status/:id", updateStatus);

module.exports = router;
