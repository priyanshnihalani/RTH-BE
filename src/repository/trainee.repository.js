const { fn, col, where, Op, literal, } = require("sequelize");
const sequelize = require("../../config/db")
const { User, Registration, BatchTrainee, Batch, Task } = require("../models");
const UserRepository = require("./user.repository");
const PaymentLog = require("../models/PaymentLog");
class TraineeRepository {

  /* ---------- UPDATE USER STATUS ---------- */
  async updateStatus(id, data) {
    const [updated] = await User.update(data, {
      where: { user_id: id, role: "trainee", softDelete: false }
    });

    if (!updated) return null;
    return User.findOne({ where: { user_id: id } });
  }

  /* ---------- UPSERT REGISTRATION ---------- */
  async updateRegistrationByUserId(userId, data) {
    const { name, email, phone } = data

    const registration = await Registration.findOne({
      where: { user_id: userId }
    });

    if (!registration) {
      throw new Error("Registration not found for this user");
    }

    await UserRepository.updateUser(userId, { name, email, phone })
    return registration.update(data);
  }

  async findRegistrationByUserId(userId) {
    return Registration.findOne({
      where: { user_id: userId }
    });
  }


  /* ---------- ASSIGN BATCHES (MANUAL, SAFE) ---------- */
  async assignBatches(traineeId, batchIds = []) {
    if (!Array.isArray(batchIds) || batchIds.length === 0) return [];

    const normalized = batchIds
      .map(b => (typeof b === "object" ? Number(b.id) : Number(b)))
      .filter(Boolean);

    if (!normalized.length) return [];

    const currentSelected = normalized.at(-1);

    const existing = await BatchTrainee.findOne({
      where: {
        trainee_id: traineeId,
        batch_id: currentSelected,
      },
    });

    if (existing) {
      await existing.update({ joinedAt: new Date() });
      return existing;
    }

    return BatchTrainee.create({
      trainee_id: traineeId,
      batch_id: currentSelected,
    });
  }

  /* ---------- FETCH ALL ---------- */
  async findAll() {
    return User.findAll({
      where: {
        role: "trainee",
        status: "approved",
        softDelete: false,
      },
      include: [
        {
          model: Registration,
          as: "registration",
          required: false,
        },
        {
          model: BatchTrainee,
          as: "TraineeLinks",
          required: false,
          include: [
            {
              model: PaymentLog,
              as: "PaymentLogs",
            },
            {
              model: Batch,
              as: "batch",
            }
          ],
        },
      ],
      order: [
        [
          { model: BatchTrainee, as: "TraineeLinks" },
          "joinedAt",
          "ASC",
        ],
      ],
    });
  }

  async findAllBatchSpecific() {
    return BatchTrainee.findAll({
      include: [
        {
          model: User,
          as: "trainee",
          where: {
            role: "trainee",
            status: "approved",
            softDelete: false
          },
          include: [
            { model: Registration, as: "registration", required: false }
          ]
        },
        {
          model: Batch,
          as: "batch"
        }
      ]
    });

  }
  async BatchTraineeId({ trainee_id, batch_id }) {
    return BatchTrainee.findOne({ where: { trainee_id, batch_id } })
  }

  async findAllTraineeByMonths(year) {
    const [data] = await sequelize.query(`
    SELECT
      EXTRACT(YEAR FROM u."createdAt") AS year,
      EXTRACT(MONTH FROM u."createdAt") AS month,
      COUNT(DISTINCT u.user_id) AS "totalTrainees"
    FROM "Users" u
    WHERE
      u.role = 'trainee'
      AND u.status = 'approved'   -- ✅ ADDED
      AND u."softDelete" = false
      AND EXTRACT(YEAR FROM u."createdAt") = :year
    GROUP BY
      EXTRACT(YEAR FROM u."createdAt"),
      EXTRACT(MONTH FROM u."createdAt")
    ORDER BY
      month ASC
  `, {
      replacements: { year }
    });

    return data;
  }

  async findTraineeCountByCollege(year) {
    const [data] = await sequelize.query(`
    SELECT
      r.college AS college,
      COUNT(DISTINCT u.user_id) AS "totalTrainees"
    FROM "Users" u
    INNER JOIN "Registrations" r 
      ON r.user_id = u.user_id
    WHERE
      u.role = 'trainee'
      AND u.status = 'approved'   -- ✅ ADDED
      AND u."softDelete" = false
      AND EXTRACT(YEAR FROM u."createdAt") = :year
    GROUP BY
      r.college
    ORDER BY
      "totalTrainees" DESC
  `, {
      replacements: { year }
    });

    return data;
  }

  async findTraineeCountByTechnology(year) {
    const [data] = await sequelize.query(`
    SELECT
      b.technology AS technology,
      COUNT(DISTINCT u.user_id) AS "totalTrainees"
    FROM "Users" u
    INNER JOIN batch_trainees bt 
      ON bt.trainee_id = u.user_id
    INNER JOIN "Batches" b 
      ON b.id = bt.batch_id
    WHERE
      u.role = 'trainee'
      AND u.status = 'approved'   -- ✅ ADDED
      AND u."softDelete" = false
      AND EXTRACT(YEAR FROM u."createdAt") = :year
    GROUP BY
      b.technology
    ORDER BY
      "totalTrainees" DESC
  `, {
      replacements: { year }
    });

    return data;
  }

  async findUserById(id) {
    return await User.findOne({
      where: {
        user_id: id,
        role: "trainee",
        status: "approved",
        softDelete: false,
      },
      include: [
        {
          model: Registration,
          as: "registration",
          required: false,
        },
        {
          model: Batch,
          as: "TraineeBatches",
          where: { softDelete: false },
          through: { attributes: [] },
          required: false,
        },
      ],
      order: [
        [
          { model: Batch, as: "TraineeBatches" },
          BatchTrainee,
          "joinedAt",
          "ASC",
        ],
      ],
    });
  }

  async getBatchTrainees(batch_id) {
    return await Batch.findByPk(batch_id, {
      include: [
        {
          model: User,
          as: "Trainees",
          where: { role: "trainee", status: "approved", softDelete: false },
          through: { attributes: [] },
          required: true,
          include: [
            {
              model: Task,
              as: "MyTasks",
              where: {
                softDelete: false,
                batch_id
              },
              required: false,
            },
            {
              model: Registration,
              as: "registration",
              required: false
            }
          ]
        }
      ]
    });
  }

  /* ---------- DELETE ---------- */
  delete(id) {
    return User.update({ softDelete: true }, {
      where: { user_id: id, role: "trainee" },
    });
  }
}

module.exports = new TraineeRepository();