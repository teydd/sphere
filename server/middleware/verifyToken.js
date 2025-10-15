const jwt = require("jsonwebtoken");
require("dotenv").config()

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(400)
      .json({ message: "Unauthorised - no token provided" });
  }

  try {
    const { userId, role } = jwt.verify(token, process.env.JWT);
    req.userId = userId;
    req.role = role;
    next();
  } catch (error) {
    console.log("Error checking auth");
    res.status(400).json({ message: error.message });
  }
};

const isAdmin = async (req, res, next) => {
  if (!req.role || req.role != "admin") {
    return res.status(400).json({
      message: "Forbidden - admin access required",
    });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
