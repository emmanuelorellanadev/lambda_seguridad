//ROOM MODEL

const { DataTypes } = require('sequelize');

const db_connection = require ('../database/conf_database');
const RoomStatus = require('./roomState_model');
const Branch = require('./branch_model');

const Room = db_connection.define('Room', {
    room_number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    room_info: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    room_beds: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    room_people: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    room_phone: {
        type: DataTypes.STRING
    },
},
{
    timestamps: false
});

//RoomStatusId
RoomStatus.hasMany(Room, {
    foreignKey: {
        allowNull: false 
    } 
});
Room.RoomStatus = Room.belongsTo(RoomStatus)

//BranchId
Branch.hasMany(Room, {
    foreignKey: {
        allowNull: false
    }
});
Room.Branch = Room.belongsTo(Branch);

Room.sync({ force: false });

module.exports = Room; 