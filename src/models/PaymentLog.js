const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const PaymentLog = sequelize.define("PaymentLog", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  batch_trainee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "batch_trainees",
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  receivedBy: {
    type: DataTypes.STRING,
    allowNull: false
  },

  receivedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});


module.exports = PaymentLog