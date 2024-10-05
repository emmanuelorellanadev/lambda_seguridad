const { DataTypes } = require('sequelize');

const db_connection = require ('../database/conf_database');
const Room = require ('../models/room_model');
const RoomPrice = require('../models/roomPrice_model');

const RoomPrice_Room = db_connection.define('RoomPrice_Room', {},
    {
        timestamps: false
    }
);

Room.belongsToMany(RoomPrice, {through: RoomPrice_Room});
RoomPrice.belongsToMany(Room, {through: RoomPrice_Room});


// SUPER MANY TO SUPER MUCH
Room.hasMany(RoomPrice_Room);
RoomPrice_Room.belongsTo(Room);
RoomPrice.hasMany(RoomPrice_Room);
RoomPrice_Room.belongsTo(RoomPrice);

RoomPrice_Room.sync( { force: false } );

module.exports = RoomPrice_Room;