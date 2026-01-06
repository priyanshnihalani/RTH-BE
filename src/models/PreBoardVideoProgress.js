const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const PreBoardVideoProgress = sequelize.define("PreBoardVideoProgress", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },

  module_id: {
    type: DataTypes.STRING,
    allowNull: false
  },

  video_id: {
    type: DataTypes.STRING,
    allowNull: false
  },

  last_watched_second: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ["user_id", "module_id"]
    }
  ]
});

module.exports = PreBoardVideoProgress;
