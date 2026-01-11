const { Batch } = require("../models");
const Task = require("../models/Task");

class TaskRepository {

  create(data) {
    return Task.create(data);
  }

  async findById(id) {
    return await Task.findByPk(id);
  }

  async findByTrainee(traineeId, batchId) {
    return await Task.findAll({
      where: { trainee_id: traineeId, batch_id: batchId }
    });
  }
  async updateTaskDescriptionTitle(task) {
    return await Task.update(
      {
        title: task.title,
        description: task.description,
      },
      {
        where: { id: task.taskId },
      }
    );
  }

  async getTraineeTasks(trainerId, traineeId, batchId) {
    return Task.findAll({
      where: {
        trainer_id: trainerId,
        trainee_id: traineeId,
        batch_id: batchId
      },
      include: [
        {
          model: Batch,
          as: "Batch",
          where: { softDelete: false },
          required: false
        }
      ]
    });
  }

  findByBatch(batchId) {
    return Task.findAll({
      where: { batch_id: batchId }
    });
  }

  update(task, data) {
    return task.update(data);
  }
}

module.exports = new TaskRepository();
