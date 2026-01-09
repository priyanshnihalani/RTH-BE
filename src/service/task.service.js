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

  async getMyTasks(traineeId, batchId) {
    return taskRepository.findByTrainee(traineeId, batchId);
  }

  async updateTaskStatus(taskId, traineeId, newStatus) {
    const task = await taskRepository.findById(taskId);

    if (!task) throw new Error("Task not found");

    if (task.trainee_id !== traineeId)
      throw new Error("Not authorized");

    const allowedTransitions = {
      ASSIGNED: ["IN_PROGRESS"],
      IN_PROGRESS: ["ASSIGNED", "COMPLETED"], 
      COMPLETED: ["IN_PROGRESS"],             
    };

    if (!allowedTransitions[task.status]?.includes(newStatus)) {
      throw new Error("Invalid status transition");
    }

    return taskRepository.update(task, {
      status: newStatus,
      reviewComment: null,
    });
  }
}

module.exports = new TaskService();
