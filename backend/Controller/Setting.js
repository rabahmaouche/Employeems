const User = require("../Model/User");
const bcrypt = require("bcrypt");

const updatepwd = async (req, res) => {
  const { oldpassword, newpassword, userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(oldpassword, user.password);
    if (!isValidPassword) {
      return res.status(404).json({ message: "wrong old password" });
    }
    const hashpwd = await bcrypt.hash(newpassword, 10);

    const newpwd = await User.findByIdAndUpdate(
      { _id: userId },
      { password: hashpwd }
    );
    res.status(200).json({
      success: true,
      newpwd,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { updatepwd };
