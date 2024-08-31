const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');
const Room = require('../models/room_model')
const Service = require('../models/service_model')

const Room_Service = db_connection.define('Room_Service', {}, 
    {
        timestamps: false
    }
);

Room.belongsToMany(Service, { through: Room_Service} );
Service.belongsToMany(Room, { through: Room_Service} );


// SUPER MANY TO SUPER MUCH
Room.hasMany(Room_Service);
Room_Service.belongsTo(Room);
Service.hasMany(Room_Service);
Room_Service.belongsTo(Service);

Room_Service.sync({ force: false});

module.exports = Room_Service;