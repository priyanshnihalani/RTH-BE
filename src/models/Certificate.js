const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Certificate = sequelize.define("Certificate", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  certificateId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  batch: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  manager: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "certificates",
  timestamps: true,
});

module.exports = Certificate;
