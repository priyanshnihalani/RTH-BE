const taskRepository = require("../repository/task.repository");

class TaskService {

  /* ================= TRAINER ================= */

  async assignTask({ title, description, batchId, traineeId, trainerId }) {
    return taskRepository.create({
      title,
      description,
      batchId,
      traineeId,
      trainerId,
      status: "ASSIGNED"
    });
  }

  async sendBackForRework(taskId, trainerId, reviewComment) {
    const task = await taskRepository.findById(taskId);

    if (!task) throw new Error("Task not found");

    if (task.trainerId !== trainerId)
      throw new Error("Not authorized");

    if (task.status !== "COMPLETED")
      throw new Error("Only completed tasks can be sent back");

    return taskRepository.update(task, {
      status: "IN_PROGRESS",
      reviewComment
    });
  }

  /* ================= TRAINEE ================= */

  async getMyTasks(traineeId) {
    return taskRepository.findByTrainee(traineeId);
  }

  async updateTaskStatus(taskId, traineeId, newStatus) {
    const task = await taskRepository.findById(taskId);

    if (!task) throw new Error("Task not found");

    if (task.traineeId !== traineeId)
      throw new Error("Not authorized");

    // Status transition rules
    if (
      (task.status === "ASSIGNED" && newStatus !== "IN_PROGRESS") ||
      (task.status === "IN_PROGRESS" && newStatus !== "COMPLETED")
    ) {
      throw new Error("Invalid status transition");
    }

    return taskRepository.update(task, {
      status: newStatus,
      reviewComment: null
    });
  }
}

module.exports = new TaskService();
