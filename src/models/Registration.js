const { DataTypes } = require('sequelize')
const sequelize = require("../../config/db");

const Registration = sequelize.define("Registration", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  user_id: {                     
    type: DataTypes.UUID,
    allowNull: false,
    unique: true
  },

  education: DataTypes.STRING,
  semester: DataTypes.STRING,
  college: DataTypes.STRING,
  technology: DataTypes.STRING,
  duration: DataTypes.STRING,
  totalFee: DataTypes.INTEGER,
  remainingFee: DataTypes.INTEGER,
  inquiryDate: DataTypes.DATEONLY,

  admissionStatus: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending"
  },

  trainingStatus: {
    type: DataTypes.ENUM("not_started", "ongoing", "completed", "dropped"),
    defaultValue: "not_started"
  },

  certificateIssued: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  ndaSigned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  adharSubmitted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  remarks1: DataTypes.TEXT,
  remarks2: DataTypes.TEXT
});


module.exports = Registration;
