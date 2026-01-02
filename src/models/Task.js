// models/Task.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT
  },

  status: {
    type: DataTypes.ENUM(
      "ASSIGNED",
      "IN_PROGRESS",
      "COMPLETED"
    ),
    defaultValue: "ASSIGNED"
  },

  reviewComment: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "reviewComment"
  },

  assignedBy: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "assigned_by"
  },

  batchId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "batch_id"
  },

  trainerId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "trainee_id"
  },

  traineeId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "trainee_id"
  },

  softDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: "Tasks",
  timestamps: true
});

module.exports = Task;
