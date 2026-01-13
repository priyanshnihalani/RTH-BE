const bcrypt = require("bcrypt");
const traineeRepo = require("../repository/trainee.repository");
const userRepo = require("../repository/user.repository");
const { sendCredentials } = require("../utils/sendEmail");
const { generatePassword } = require("../utils/generatePassword");

class TraineeService {

  async getTraineeById(id) {
    const result = await traineeRepo.findUserById(id);
    return result;
  }
  /* ---------- UPDATE TRAINEE DETAILS ---------- */
  async updateTrainee(userId, data) {
    const {
      name,
      email,
      phone,
      batches = [],
      admissionStatus,
      education,
      semester,
      college,
      technology,
      duration,
      totalFee,
      paidFees,
      feesToPay,
      trainingStatus,
      certificateIssued,
      ndaSigned,
      adharSubmitted,
      remarks2,
      wantToBoard,
      joinedDate,
      shift,
    } = data;

    if (!Array.isArray(batches)) {
      throw new Error("batches must be an array");
    }

    /* ================= 1. GET CURRENT REGISTRATION ================= */
    const existingRegistration =
      await traineeRepo.findRegistrationByUserId(userId);

    const previousStatus = existingRegistration?.admissionStatus;

    /* ================= 2. UPDATE REGISTRATION ================= */
    await traineeRepo.updateRegistrationByUserId(userId, {
      name,
      email,
      phone,
      education,
      semester,
      college,
      technology,
      duration,
      totalFee,
      paidFees,
      feesToPay,
      admissionStatus,
      trainingStatus,
      certificateIssued,
      ndaSigned,
      adharSubmitted,
      remarks2,
      wantToBoard,
      joinedDate,
      shift,
    });

    /* ================= 3. STATUS TRANSITIONS ================= */

    if (previousStatus !== "approved" && admissionStatus === "approved") {
      const user = await userRepo.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const plainPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      const [affectedRows] = await userRepo.updateUser(userId, {
        password: hashedPassword,
        status: "approved",
      });

      if (affectedRows === 0) {
        throw new Error("Failed to activate user");
      }

      await sendCredentials(user.email, plainPassword);
    }

    if (previousStatus === "approved" && admissionStatus === "pending") {
      const [affectedRows] = await userRepo.updateUser(userId, {
        status: "pending",
      });

      if (affectedRows === 0) {
        throw new Error("Failed to revoke user access");
      }
    }

    /* ================= 4. ASSIGN BATCHES ================= */
    await traineeRepo.assignBatches(userId, batches);

    return true;
  }

  /* ---------- APPROVE / ACTIVATE ---------- */
  async updateStatus(id, status) {
    const user = await userRepo.findById(id);
    if (!user) throw new Error("User not found");

    if (status === "active") {
      const plainPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      const updated = await traineeRepo.updateStatus(id, {
        status,
        password: hashedPassword
      });

      if (!updated) {
        throw new Error("Failed to activate trainee");
      }

      await sendCredentials(user.email, plainPassword);
      return updated;
    }

    return traineeRepo.updateStatus(id, { status });
  }

  /* ---------- GET ALL ---------- */
  async getAllTrainees() {
    const users = await traineeRepo.findAll();
    const today = new Date();

    const data = (users || []).map(u => {
      const notification = {};

      if (u?.registration?.endDate) {
        const endDate = new Date(u.registration.endDate);
        const diffMs = endDate - today;
        const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        if (daysLeft <= 7 && daysLeft >= 0) {
          notification.finish = `${daysLeft} days remaining`;
        }
      }

      if (u?.registration?.createdAt) {

        const createdAt = new Date(u.registration.createdAt);
        const diffMs = today - createdAt;
        const daysPassed = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (daysPassed >= 7 && u?.registration?.paidFees == 0) {
          notification.feesReminder = `Ask ${u?.name} To Pay Fees`;
        }
      }
      return {
        notification: Object.keys(notification).length ? notification : null,
        user_id: u?.user_id ?? null,
        name: u?.name ?? null,
        email: u?.email ?? null,
        status: u?.status ?? null,
        phone: u?.phone ?? null,
        joinedAt: u?.joinedAt ?? null,
        shift: u?.shift,
        registrationId: u?.registration?.id ?? null,
        registration: u?.registration ?? null,
        batches: (u?.TraineeBatches || []).map(b => ({
          id: b?.id ?? null,
          name: b?.technology ?? null
        })),
        wantToBoard: u?.wantToBoard
      };
    });

    return data;
  }

  async getBatchTrainees(batchId) {
    const batchTrainees = await traineeRepo.getBatchTrainees(batchId)
    return batchTrainees
  }

  /* ---------- DELETE ---------- */
  removeTrainee(id) {
    return traineeRepo.delete(id);
  }
}

module.exports = new TraineeService();