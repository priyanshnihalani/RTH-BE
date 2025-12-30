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
    allowNull: true
  },

  trainerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  batchId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  traineeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
  softDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Task;
