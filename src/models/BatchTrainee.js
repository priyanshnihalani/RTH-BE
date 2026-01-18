const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const BatchTrainee = sequelize.define("BatchTrainee", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  trainee_id: {
    type: DataTypes.UUID,
  },
  batch_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  joinedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "batch_trainees",
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ["trainee_id", "batch_id"]
    }
  ]
});

module.exports = BatchTrainee;
