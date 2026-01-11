const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const TaskMessage = sequelize.define("TaskMessage", {
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "task_id"
  },

  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "sender_id"
  },

  senderRole: {
    type: DataTypes.ENUM("TRAINER", "TRAINEE"),
    allowNull: false,
    field: "sender_role"
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: "TaskMessages",
  timestamps: true
});

module.exports = TaskMessage;
