// src/utils/sendEmail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
  }
});

exports.sendCredentials = async (email, password) => {
  return await transporter.sendMail({
    from: `"Rover Training Hub" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Account Created",
    html: `
      <h3>Your Account</h3>
      <p>Email: <b>${email}</b></p>
      <p>Password: <b>${password}</b></p>
      <p>Please login and change your password.</p>
      <a href="http://localhost:5173/login">Link To Website</a>
    `
  });
};
