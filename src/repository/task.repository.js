const Task = require("../models/Task");

class TaskRepository {

  create(data) {
    return Task.create(data);
  }

  findById(id) {
    return Task.findByPk(id);
  }

  findByTrainee(traineeId) {
    return Task.findAll({
      where: { traineeId }
    });
  }

  async getTraineeTasks(trainerId, traineeId, batchId) {
    return Task.findAll({
      where: {
        trainerId,
        traineeId,
        batchId
      }
    });
  }

  findByBatch(batchId) {
    return Task.findAll({
      where: { batchId }
    });
  }

  update(task, data) {
    return task.update(data);
  }
}

module.exports = new TaskRepository();
