const { DataTypes } = require('sequelize')
const sequelize = require("../../config/db");

const Batch = sequelize.define("Batch", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  technology: DataTypes.STRING,
  startDate: DataTypes.DATEONLY,
  endDate: DataTypes.DATEONLY,
  softDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Batch;
