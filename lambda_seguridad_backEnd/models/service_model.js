const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');

const Service = db_connection.define('Service', {
    service_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    service_state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
},
{
    timestamps: false
});

Service.sync({ force: false});

module.exports = Service;