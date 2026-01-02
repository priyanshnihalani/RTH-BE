const { User, Registration, BatchTrainee, Batch, Task } = require("../models");

class TraineeRepository {

  /* ---------- UPDATE USER STATUS ---------- */
  async updateStatus(id, data) {
    const [updated] = await User.update(data, {
      where: { user_id: id, role: "trainee", softDelete: false }
    });

    if (!updated) return null;
    return User.findOne({ where: { user_id: id } });
  }

  /* ---------- UPSERT REGISTRATION ---------- */
  async updateRegistrationByUserId(userId, data) {
    const registration = await Registration.findOne({
      where: { user_id: userId }
    });

    if (!registration) {
      throw new Error("Registration not found for this user");
    }

    return registration.update(data);
  }

  async findRegistrationByUserId(userId) {
    return Registration.findOne({
      where: { user_id: userId }
    });
  }

  /* ---------- ASSIGN BATCHES (MANUAL, SAFE) ---------- */
  async assignBatches(traineeId, batchIds = []) {
    await BatchTrainee.destroy({
      where: { trainee_id: traineeId }
    });

    if (batchIds.length === 0) {
      return [];
    }

    const rows = batchIds.map(batchId => ({
      trainee_id: traineeId,
      batch_id: batchId
    }));

    return BatchTrainee.bulkCreate(rows);
  }

  /* ---------- FETCH ALL ---------- */
  async findAll() {
    return await User.findAll({
      where: {
        role: "trainee",
        softDelete: false
      },
      attributes: ["user_id", "name", "email", "status"],
      include: [
        {
          model: Registration,
          as: "registration"
        },
        {
          association: "TraineeBatches",
          attributes: ["id", "name"],
          through: { attributes: [] },
          required: false
        }
      ]
    });
  }

  async findUserById(id) {
    return await User.findByPk(id)
  }

  async getBatchTrainees(batchId) {
    return Batch.findByPk(batchId, {
      include: [
        {
          model: User,
          as: "Trainees",
          where: { role: "trainee", softDelete: false },
          through: { attributes: [] },
          required: true,
          include: [
            {
              model: Task,
              as: "MyTasks",
              where: { softDelete: false },
              required: false
            }
          ]
        }
      ]
    });
  }

  /* ---------- DELETE ---------- */
  delete(id) {
    return User.update({ softDelete: true }, {
      where: { user_id: id, role: "trainee" },
    });
  }
}

module.exports = new TraineeRepository();
