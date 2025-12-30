const trainerRepo = require("../repository/trainer.repository");
const User = require("../models/User");

class TrainerService {

  async assignBatches(trainerId, batchIds = []) {
    if (!Array.isArray(batchIds)) {
      throw new Error("batchIds must be an array");
    }

    const trainer = await User.findOne({
      where: { user_id: trainerId, role: "trainer" }
    });

    if (!trainer) {
      throw new Error("Trainer not found");
    }

    await trainerRepo.assignBatches(trainerId, batchIds);

    return true;
  }
  
  async getTrainerBatches(trainerId) {
    const data = await trainerRepo.getTrainerBatches(trainerId)
    return data
  }

  async updateTrainer(id, data) {
    const { batches = [] } = data;

    if (!Array.isArray(batches)) {
      throw new Error("batches must be an array");
    }

    await trainerRepo.assignBatches(id, batches);

    return true;
  }

  async getAllTrainers() {
    const trainers = await trainerRepo.findAll();

    return trainers.map(t => {
      const p = t.get({ plain: true });
      const batches = p.TrainerBatches || [];

      return {
        id: p.user_id,
        name: p.name,
        email: p.email,
        batchCount: batches.length,
        batches: batches.map(b => b.name),
        batchIds: batches.map(b => b.id)
      };
    });
  }

  removeTrainer(id) {
    return trainerRepo.delete(id);
  }
}

module.exports = new TrainerService();
