const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');
const Room = require('../models/room_model')
const Service = require('../models/service_model')

const Room_Service = db_connection.define('Room_Service', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        RoomId:{
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: {
                model: Room,
                key: 'id'
            }
        },
        ServiceId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Service,
                key: 'id'
            }
        }
    }, 
    {
        timestamps: false
    }
);

Room.belongsToMany(Service, { through: Room_Service} );
Service.belongsToMany(Room, { through: Room_Service} );
 
Room_Service.sync({ force: false});

module.exports = Room_Service;