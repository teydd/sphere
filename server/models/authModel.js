const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role:{
      type:String,
      enum:["customer","admin"],
      default:"customer"
    },
    verificationToken: String,
    verificationTokenExpiresAt: String,
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: String,
  },
  { timestamps: true }
);

const User = mongoose.model("sphere", UserSchema);

module.exports = User;
