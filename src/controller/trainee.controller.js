const traineeService = require("../service/trainee.service");

/* ---------- UPDATE ---------- */
exports.update = async (req, res) => {
  try {
    await traineeService.updateTrainee(req.params.id, req.body);
    res.json({ message: "Trainee updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ---------- GET ALL ---------- */
exports.getAll = async (req, res) => {
  const data = await traineeService.getAllTrainees();
  res.json(data);
};

/* ---------- UPDATE STATUS ---------- */

exports.updateTrainee = async (req, res) => {
  try {
    const traineeId = req.params.id;
    const data = req.body;

    await traineeService.updateTrainee(traineeId, data);

    res.status(200).json({
      success: true,
      message: "Trainee updated successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/* ---------- DELETE ---------- */
exports.remove = async (req, res) => {
  await traineeService.removeTrainee(req.params.id);
  res.json({ message: "Trainee removed" });
};
