 //ROOMTYPE MODEL
 
const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');

const RoomState = db_connection.define('RoomState', {
    roomState_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    roomState: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: true
    },
},
{
    timestamps: false
});

RoomState.sync({ force: false });

module.exports = RoomState;
