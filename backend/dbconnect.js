const mongoose = require("mongoose");

require("dotenv").config();
const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MANGODB_URL);
    console.log("connected succefully");
  } catch (error) {
    console.log("not connected", error);
  }
};
module.exports = dbconnect;
