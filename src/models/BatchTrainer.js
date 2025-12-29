const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const BatchTrainer = sequelize.define("BatchTrainer", {
  trainer_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  batch_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: "batch_trainers",
  timestamps: false
});

module.exports = BatchTrainer;
