const { Resend } = require('resend');
require("dotenv").config()


const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email, name, token) => {
  try {
    await resend.emails.send({
      from: 'Sphere@resend.dev',
      to: email,
      subject: 'Verify Your Email',
      html: `
        <p>Hi ${name},</p>
        <p>Use the code below to verify your email:</p>
        <h2>${token}</h2>
      `,
    });
  } catch (err) {
    console.error('Failed to send verification email:', err);
  }
};

const welcomeEmail = async(name,email)=>{
  try {
    await resend.emails.send({
     from: 'Sphere@resend.dev',
      to: email,
      subject: 'Welcome to Sphere',
      html: `
        <p>Hi ${name},</p>
        <p>Welcome t0 Sphere, a weather app that's one of a kind </p>
        <p>Follow the link to see wants in store for you</p>
        <a>Explore the Application</a>
      `,
    })
  } catch (error) {
    console.error("Error sending welcome email")    
  }
}
module.exports = {sendVerificationEmail,welcomeEmail};
