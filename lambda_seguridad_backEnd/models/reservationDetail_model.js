const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');
const Reservation = require('./reservation_model');
const Room = require('./room_model');

const ReservationDetail = db_connection.define('ReservationDetail', {
    date_in: {
        type: DataTypes.DATE,
        allowNull: true
    },
    date_out: {
        type: DataTypes.DATE,
        allowNull: true
    },
    nights_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    people_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sub_total: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
},
{
    timestamps: false
});

//foreignKey ReservationId
Reservation.hasMany(ReservationDetail, {
    foreignKey: {
        allowNull: false
    }
})
ReservationDetail.Reservation = ReservationDetail.belongsTo(Reservation);

//RoomId
Room.hasMany(ReservationDetail, {
    foreignKey: {
        allowNull: false
    }
});
ReservationDetail.Room = ReservationDetail.belongsTo(Room);

ReservationDetail.sync( { force: false });


module.exports = ReservationDetail;