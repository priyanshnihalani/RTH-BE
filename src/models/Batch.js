const { DataTypes } = require('sequelize')
const sequelize = require("../../config/db");

const Batch = sequelize.define("Batch", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  technology: DataTypes.STRING,
  startDate: { type: DataTypes.DATEONLY, allowNull: true },
  endDate: { type: DataTypes.DATEONLY, allowNull: true },
  softDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Batch;