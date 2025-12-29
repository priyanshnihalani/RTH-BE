const { DataTypes } = require('sequelize');
const sequelize = require("../../config/db");

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM("admin", "trainer", "trainee"),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("approved", "pending", "blocked"),
    defaultValue: "pending"
  },
  softDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = User;
