const dbconnect = require("./dbconnect");
const User = require("./Model/User");
const bcrypt = require("bcrypt");

const SetUser = async () => {
  dbconnect();
  try {
    const hashpassword = await bcrypt.hash("admin", 10);
    const newuser = new User({
      name: "admin",
      email: "admin@example.com",
      password: hashpassword,
      role: "admin",
    });
    await newuser.save();
  } catch (error) {
    console.error(error);
  }
};
SetUser();
