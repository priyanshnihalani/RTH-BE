const { User, Batch, BatchTrainer, Task } = require("../models");

class TrainerRepository {

  async assignBatches(trainerId, batchIds = []) {
    await BatchTrainer.destroy({
      where: { trainer_id: trainerId }
    });

    if (batchIds.length === 0) {
      return [];
    }

    const rows = batchIds.map(batchId => ({
      trainer_id: trainerId,
      batch_id: batchId
    }));

    return BatchTrainer.bulkCreate(rows);
  }


  async clearBatches(trainerId) {
    return BatchTrainer.destroy({
      where: { trainer_id: trainerId }
    });
  }

  findAll() {
    return User.findAll({
      where: { role: "trainer", softDelete: false },
      attributes: ["user_id", "name", "email"],
      include: [
        {
          association: "TrainerBatches",
          attributes: ["id", "name"],
          through: { attributes: [] },
          required: false
        }
      ]
    });
  }

  async getTrainerBatches(trainerId) {
    return Batch.findAll({
      include: [
        {
          model: User,
          as: "Trainers",
          where: { user_id: trainerId },
          through: { attributes: [] },
          include: [
            {
              model: Task,
              as: "AssignedTasks",
              where: { softDelete: false },
              required: false
            }
          ]
        },
        {
          model: User,
          as: "Trainees",
          through: { attributes: [] },
        },
      ]
    });
  }


  delete(trainerId) {
    return User.update({ softDelete: true }, {
      where: { user_id: trainerId, role: "trainer" }
    });
  }
}

module.exports = new TrainerRepository();
