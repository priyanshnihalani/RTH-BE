const { Batch } = require("../models");
const Task = require("../models/Task");
const { fn, col } = require("sequelize");
const TaskMessage = require('../models/TaskMessage')
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
      attributes: {
        include: [
          [fn("COUNT", col("TaskMessages.id")), "messageCount"]
        ]
      },
      include: [
        {
          model: Batch,
          as: "Batch",
          where: { softDelete: false },
          required: false
        },
        {
          model: TaskMessage,
          attributes: [],
          required: false
        }
      ],
      group: ["Task.id", "Batch.id"],
      order: [["createdAt", "DESC"]]
    });
  }

  async findByBatch(batchId) {
    return await Task.findAll({
      where: { batch_id: batchId }
    });
  }

  async update(task, data) {
    return await task.update(data);
  }
}

module.exports = new TaskRepository();
