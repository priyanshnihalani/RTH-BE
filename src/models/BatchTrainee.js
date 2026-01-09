const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const BatchTrainee = sequelize.define("BatchTrainee", {
  trainee_id: {
    type: DataTypes.UUID,
    primaryKey: true
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
