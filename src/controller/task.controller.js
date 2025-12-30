const taskService = require("../service/task.service");

/* ================= TRAINER ================= */

exports.assignTask = async (req, res) => {
  try {
    const task = await taskService.assignTask({
      ...req.body,
      trainerId: req.user.id
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTraineeTasks = async (req, res) => {
  const { trainerId, traineeId, batchId } = req.body
  try {
    const tasks = await taskService.getTraineeTasks(trainerId, traineeId, batchId)
    res.status(201).json(tasks);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}


exports.sendBackForRework = async (req, res) => {
  try {
    const task = await taskService.sendBackForRework(
      req.params.id,
      req.user.id,
      req.body.reviewComment
    );

    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ================= TRAINEE ================= */

exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await taskService.getMyTasks(req.user.id);
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await taskService.updateTaskStatus(
      req.params.id,
      req.user.id,
      req.body.status
    );

    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
