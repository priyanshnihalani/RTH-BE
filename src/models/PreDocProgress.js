const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const PreDocProgress = sequelize.define("PreDocProgress", {
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

    status: {
        type: DataTypes.ENUM("NOT_STARTED", "IN_PROGRESS", "COMPLETED"),
        defaultValue: "NOT_STARTED"
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ["user_id", "module_id"]
        }
    ]
});

module.exports = PreDocProgress;
