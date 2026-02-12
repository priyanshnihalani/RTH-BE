// inquiry.service.js

const repo = require("../repository/inquiry.repository");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { generatePassword } = require("../utils/generatePassword")

class InquiryService {


  async createInquiry(payload) {

    const user = await repo.createUser({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      role: "trainee",
      status: "inquiry"
    });

    const inquiry = await repo.create({
      user_id: user.user_id,
      education: payload.education,
      semester: payload.semester,
      technology: payload.technology,
      duration: payload.duration,
      inquiryType: payload.inquiryType,
      reference: payload.reference,
      inquiryDate: new Date(),
      admissionStatus: "inquiry"
    });

    return { user, inquiry };
  }

  async getAllInquiries() {
    return await repo.findAll();
  }

  async updateStatus(user_id, status) {

    const allowed = ["inquiry", "pending", "approved", "blocked"];

    if (!allowed.includes(status)) {
      throw new Error("Invalid Status");
    }
    
    await repo.updateStatus(user_id, status);

    return "Inquiry Status Updated";
  }

  async notesInquiry(user_id, notes) {
    if (!notes || !user_id) {
      throw new Error("Invalid Data");
    }
    else {
      return await repo.notesInquiry(user_id, notes);
    }
  }

  async approveInquiry(user_id, email) {

    if (!email) {
      throw new Error("Email is required");
    }

    const plainPassword = generatePassword(8);

    const hashedPassword =
      await bcrypt.hash(plainPassword, 10);

    await repo.updateUser(user_id, {
      email,
      password: hashedPassword,
      status: "approved"
    });

    await repo.updateRegistration(user_id, {
      inquiryDate: null,
      admissionStatus: "approved"
    });

    const data =
      await repo.getFullInquiry(user_id);

    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASSWORD
        }
      });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Admission Approved 🎉",
      html: `
        <h2>Welcome ${data.User.name}</h2>

        <p>Your admission has been approved successfully.</p>

        <h3>Login Credentials</h3>
        <p><b>Email:</b> ${email}</p>
        <p><b>Password:</b> ${plainPassword}</p>

        <h3>Training Details</h3>
        <p><b>Technology:</b> ${data.technology}</p>
        <p><b>Duration:</b> ${data.duration}</p>

      `
    });

    return {
      message:
        "Admission Approved & Credentials Sent",
      email,
      password: plainPassword
    };
  }

}

module.exports = new InquiryService();
