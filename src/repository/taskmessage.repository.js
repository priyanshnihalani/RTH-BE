const TaskMessage = require("../models/TaskMessage");

class TaskMessageRepository {
  create(data) {
    return TaskMessage.create(data);
  }

  findByTaskId(taskId) {
    return TaskMessage.findAll({
      where: { taskId },
      order: [["createdAt", "ASC"]],
    });
  }
}

module.exports = new TaskMessageRepository();
