const { Batch, User, BatchTrainer, BatchTrainee } = require("../models");
const { Sequelize } = require("sequelize");

class BatchRepository {

  /* ---------- CREATE ---------- */
  create(data) {
    return Batch.create(data);
  }

  /* ---------- FIND ALL WITH COUNTS ---------- */
  async findAllWithDetails() {
    return Batch.findAll({
      attributes: [
        "id",
        "name",
        "technology",
        "startDate",
        "endDate",
        [
          Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "BatchTrainees"
          WHERE "BatchTrainees"."batch_id" = "Batch"."id"
        )`),
          "traineeCount"
        ]
      ],
      include: [
        {
          association: "Trainers",
          attributes: ["user_id", "name"],
          through: { attributes: [] },
          required: false
        },
        {
          association: "Trainees",
          attributes: ["user_id", "name"],
          through: { attributes: [] },
          required: false
        }
      ]
    });
  }


  /* ---------- FIND BY ID ---------- */
  findById(id) {
    return Batch.findByPk(id);
  }

  /* ---------- UPDATE ---------- */
  update(id, data) {
    return Batch.update(data, { where: { id } });
  }

  /* ---------- DELETE ---------- */
  delete(id) {
    return Batch.update({ softDelete: true }, { where: { id } });
  }
}

module.exports = new BatchRepository();
