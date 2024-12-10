const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const Middlewear = async (req, res, next) => {
  try {
    const athheader = req.headers.authorization;
    if (!athheader) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
    const token = athheader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "no provided token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(401).json({ success: false, error: "invalid token" });
    }
    const user = await User.findById({ _id: decoded._id }).select("-Password");
    if (!user) {
      return res.status(401).json({ success: false, error: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.error("jwt expired");
      return res.status(401).json({
        success: false,
        error: "jwt expired", // This is the exact error returned to the client
      });
    }
    console.log(error);
    return res.status(500).json({ success: false, error: "server side error" });
  }
};
module.exports = Middlewear;
