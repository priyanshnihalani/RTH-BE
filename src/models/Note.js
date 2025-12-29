const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Note = sequelize.define("Note", {
  author_id: {
    type: DataTypes.UUID,
    allowNull: false
  },

  noteDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },

  endTime: {
    type: DataTypes.TIME,
    allowNull: false
  },

  notes: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Note;
