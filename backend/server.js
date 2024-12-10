const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
const dbconnect = require("./dbconnect");
const routerDepartment = require("./routes/AdddepAuth");
const routerEmployee = require("./routes/AddEmployeeAuth");
const SalaryRouter = require("./routes/SalaryAuth");
const Leaverouter = require("./routes/LeaveAuth");
const Settingrouter = require("./routes/SettingAuth");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static("Public/image"));
app.use(cors());
//use autho routes
app.use("/api/auth", authRouter);
app.use("/api/auth", routerDepartment);
app.use("/api/Employee", routerEmployee);
app.use("/api/Salary", SalaryRouter);
app.use("/api/Leaves", Leaverouter);
app.use("/api/Setting", Settingrouter);

dbconnect();

const Port = process.env.Port;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
