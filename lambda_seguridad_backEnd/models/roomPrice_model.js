const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');

const RoomPrice = db_connection.define('RoomPrice', {
    room_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    room_price_state: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, 
{
    timestamps: false
});

RoomPrice.sync( {force: false} );

module.exports = RoomPrice;