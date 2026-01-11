const taskMessageRepo = require("../repository/taskmessage.repository");

class TaskMessageService {
  async addMessage({ taskId, senderId, senderRole, message }) {
    return taskMessageRepo.create({
      taskId,
      senderId,
      senderRole,
      message,
    });
  }

  async getMessages(taskId) {
    return taskMessageRepo.findByTaskId(taskId);
  }
}

module.exports = new TaskMessageService();
