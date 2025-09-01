const jwt = require("jsonwebtoken");

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
    samesite: "Strict",
  });
};

module.exports = { generateTokeAndCookie };
