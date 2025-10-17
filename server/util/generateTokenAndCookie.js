const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateTokeAndCookie = async (res, user) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT,
    {
      expiresIn: "2d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    samesite: "none",
    secure:true
  });
};

module.exports = { generateTokeAndCookie };
