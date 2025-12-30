const trainerService = require("../service/trainer.service");

exports.assignBatches = async (req, res) => {
  try {
    const { trainerId, batchIds } = req.body;

    const updatedTrainer =
      await trainerService.assignBatches(trainerId, batchIds);

    res.json({
      message: "Batches assigned successfully",
      trainer: updatedTrainer
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await trainerService.updateTrainer(req.params.id, req.body);
    res.json({ message: "Trainer updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTrainerBatches = async (req, res) => {
  const data = trainerService.getTrainerBatches(req.body.trainerId)
  return data
}

exports.getAll = async (req, res) => {
  const data = await trainerService.getAllTrainers();
  res.json(data);
};

exports.remove = async (req, res) => {
  await trainerService.removeTrainer(req.params.id);
  res.json({ message: "Trainer removed" });
};
