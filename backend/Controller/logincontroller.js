const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ email: Email });
    if (!user) {
      return res.status(401).json({ success: false, error: "user not found" });
    }

    const ismatch = await bcrypt.compare(Password, user.password);
    if (!ismatch) {
      return res
        .status(401)
        .json({ success: false, error: "password is incorrect" });
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      token,
      user: { name: user.name, _id: user._id, role: user.role },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

module.exports = { login, verify };
