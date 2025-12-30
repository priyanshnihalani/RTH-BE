const bcrypt = require("bcrypt");
const traineeRepo = require("../repository/trainee.repository");
const userRepo = require("../repository/user.repository");
const { sendCredentials } = require("../utils/sendEmail");
const { generatePassword } = require("../utils/generatePassword");

class TraineeService {

  /* ---------- UPDATE TRAINEE DETAILS ---------- */
  async updateTrainee(userId, data) {
    const {
      batchIds = [],
      admissionStatus,
      education,
      semester,
      college,
      technology,
      duration,
      totalFee,
      remainingFee,
      trainingStatus,
      certificateIssued,
      ndaSigned,
      adharSubmitted,
      remarks,
    } = data;

    if (!Array.isArray(batchIds)) {
      throw new Error("batchIds must be an array");
    }

    /* ================= 1. GET CURRENT REGISTRATION ================= */
    const existingRegistration =
      await traineeRepo.findRegistrationByUserId(userId);

    const previousStatus = existingRegistration?.admissionStatus;

    /* ================= 2. UPDATE REGISTRATION ================= */
    await traineeRepo.updateRegistrationByUserId(userId, {
      education,
      semester,
      college,
      technology,
      duration,
      totalFee,
      remainingFee,
      admissionStatus,
      trainingStatus,
      certificateIssued,
      ndaSigned,
      adharSubmitted,
      remarks,
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
    await traineeRepo.assignBatches(userId, batchIds);

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
    const data = (users || []).map(u => ({

      user_id: u?.user_id ?? null,
      name: u?.name ?? null,
      email: u?.email ?? null,
      status: u?.status ?? null,

      registrationId: u?.registration?.id ?? null,
      registration: u?.registration ?? null,

      batches: (u?.TraineeBatches || []).map(b => ({
        id: b?.id ?? null,
        name: b?.name ?? null
      }))

    }));

    return data
  }

  async getBatchTrainees(batchId){
    const batchTrainees = await traineeRepo.getBatchTrainees(batchId)
    return batchTrainees
  }

  /* ---------- DELETE ---------- */
  removeTrainee(id) {
    return traineeRepo.delete(id);
  }
}

module.exports = new TraineeService();
