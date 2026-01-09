const { DataTypes } = require('sequelize')
const sequelize = require("../../config/db");

const Batch = sequelize.define("Batch", {
  technology: DataTypes.STRING,
  softDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Batch;