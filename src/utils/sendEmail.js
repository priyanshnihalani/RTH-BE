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
    subject: "Your Rover Training Hub Account",
    html: `
    <div style="
      background-color:#FFF7F0;
      padding:40px 0;
      font-family:Arial, Helvetica, sans-serif;
    ">
      <div style="
        max-width:520px;
        margin:0 auto;
        background:#ffffff;
        border-radius:14px;
        box-shadow:0 8px 24px rgba(0,0,0,0.08);
        overflow:hidden;
      ">

        <!-- Header -->
        <div style="
          background:#FF7A18;
          padding:20px;
          text-align:center;
          color:#fff;
        ">
          <h2 style="margin:0;font-weight:600;">
            Rover Training Hub
          </h2>
          <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">
            Account Created Successfully
          </p>
        </div>

        <!-- Body -->
        <div style="padding:30px;color:#333;">
          <p style="font-size:15px;margin-bottom:20px;">
            Hello 👋,<br/>
            Your account has been created. Below are your login credentials:
          </p>

          <!-- Credentials Box -->
          <div style="
            background:#FFF3E8;
            padding:16px;
            border-radius:10px;
            margin-bottom:24px;
          ">
            <p style="margin:8px 0;">
              <strong>Email:</strong><br/>
              <span style="color:#FF7A18;">${email}</span>
            </p>
            <p style="margin:8px 0;">
              <strong>Password:</strong><br/>
              <span style="color:#FF7A18;">${password}</span>
            </p>
          </div>

          <p style="font-size:14px;color:#666;margin-bottom:24px;">
            For security reasons, please log in and change your password immediately.
          </p>

          <!-- Button -->
          <div style="text-align:center;">
            <a href="http://localhost:5173/login"
              style="
                display:inline-block;
                background:#FF7A18;
                color:#fff;
                text-decoration:none;
                padding:12px 26px;
                border-radius:8px;
                font-size:15px;
                font-weight:600;
              ">
              Login to Dashboard
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="
          padding:16px;
          text-align:center;
          font-size:12px;
          color:#999;
          background:#FFF7F0;
        ">
          © ${new Date().getFullYear()} Rover Training Hub<br/>
          This is an automated email. Please do not reply.
        </div>

      </div>
    </div>
    `
  });
};

