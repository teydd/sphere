const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(400)
      .json({ message: "Unauthorised - no token provided" });
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT);
    req.userId = userId;
    next();
  } catch (error) {
    console.log("Error checking auth");
    res.status(400).json({ message: error.message });
  }
};

module.exports = { verifyToken };
