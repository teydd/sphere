const { Resend } = require("resend");
const { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } = require("./templates");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email, token) => {
  try {
    await resend.emails.send({
      from: "Sphere@resend.dev",
      to: email,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",token),
    });
  } catch (err) {
    console.error("Failed to send verification email:", err);
  }
};

const welcomeEmail = async (name, email) => {
  try {
    await resend.emails.send({
      from: "Sphere@resend.dev",
      to: email,
      subject: "Welcome to Sphere",
      html: `
        <p>Hi ${name},</p>
        <p>Welcome to Sphere, a weather app that's one of a kind </p>
        <p>Follow the link to see wants in store for you</p>
        <a>Explore the Application</a>
      `,
    });
  } catch (error) {
    console.error("Error sending welcome email");
  }
};

const forgotPass = async(email, resetToken)=>{
  try {
    await resend.emails.send({
      from: "Sphere@resend.dev",
      to: email,
      subject: "Forgot Password Link",
      html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetToken)
    });
  } catch (error) {
    console.error("Error sending forgot password link");
    console.log(error)
  }

}

const resetPass = async(email)=>{
   try {
    await resend.emails.send({
      from: "Sphere@resend.dev",
      to: email,
      subject: "Reset Password Successful",
      html:PASSWORD_RESET_SUCCESS_TEMPLATE
    });
  } catch (error) {
    console.error("Error sending forgot password link");
    console.log(error)
  }
}
module.exports = { sendVerificationEmail, welcomeEmail,forgotPass, resetPass };
