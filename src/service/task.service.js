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

  async getTraineeTasks(trainerId, traineeId, batchId) {
    return await taskRepository.getTraineeTasks(trainerId, traineeId, batchId)
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

  async updateTaskDescriptionTitle(task) {
    return await taskRepository.updateTaskDescriptionTitle(task)
  }

  async getMyTasks(traineeId, batchId) {
    return await taskRepository.findByTrainee(traineeId, batchId);
  }

  async updateTaskStatus(taskId, traineeId, newStatus, isTrainerView = false) {
    const task = await taskRepository.findById(taskId);

    if (!task) throw new Error("Task not found");

    if (!isTrainerView && task.trainee_id !== traineeId)
      throw new Error("Not authorized");

    // Forward-only (for trainee)
    const forwardOnly = {
      ASSIGNED: ["IN_PROGRESS"],
      IN_PROGRESS: ["COMPLETED"],
      COMPLETED: [],
    };

    // Forward + backward (for trainer)
    const bidirectional = {
      ASSIGNED: ["IN_PROGRESS"],
      IN_PROGRESS: ["ASSIGNED", "COMPLETED"],
      COMPLETED: ["IN_PROGRESS"],
    };

    const rules = isTrainerView ? bidirectional : forwardOnly;

    if (!rules[task.status]?.includes(newStatus)) {
      throw new Error("Invalid status transition");
    }

    return taskRepository.update(task, {
      status: newStatus,
      reviewComment: null,
    });
  }

}

module.exports = new TaskService();
