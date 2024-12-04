//RESERVATIONSTATE MODEL
const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');

const ReservationState = db_connection.define('ReservationState', {
    reservationState_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    reservationState: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},
{
    timestamps: false
});

ReservationState.sync({ force: false});

module.exports = ReservationState;