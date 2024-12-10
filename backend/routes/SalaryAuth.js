const express = require("express");

const Middlewear = require("../middlewear/AuthMiddlewear");
const { getSalary, AddSalary } = require("../Controller/SalaryControler");

const router = express.Router();

router.post("/AddSalary", Middlewear, AddSalary);
router.get("/:id", getSalary);

module.exports = router;
