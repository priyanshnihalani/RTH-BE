const { User, Batch, BatchTrainer } = require("../models");

class TrainerRepository {

  async assignBatches(trainerId, batchIds = []) {
    // 1. Clear existing batches
    await BatchTrainer.destroy({
      where: { trainer_id: trainerId }
    });

    // 2. If empty array → nothing more to do
    if (batchIds.length === 0) {
      return [];
    }

    // 3. Insert new rows
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
      where: { role: "trainer" },
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

  delete(trainerId) {
    return User.update({ softDelete: true }, {
      where: { user_id: trainerId, role: "trainer" }
    });
  }
}

module.exports = new TrainerRepository();
