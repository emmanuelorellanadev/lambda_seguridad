// MOISTURE SENSOR MODEL
// Stores soil moisture readings sent by the ESP8266 device.
// activate_sprinkler is set by the server based on the configured threshold.

const { DataTypes } = require('sequelize');
const db_connection = require('../database/conf_database');

const MOISTURE_THRESHOLD = parseFloat(process.env.MOISTURE_THRESHOLD) || 30;

const MoistureSensorReading = db_connection.define('MoistureSensorReading', {
    sensor_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    moisture_value: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
            max: 100,
        },
    },
    activate_sprinkler: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
},
{
    timestamps: true,
    createdAt: 'reading_at',
    updatedAt: false,
});

MoistureSensorReading.sync({ force: false });

module.exports = { MoistureSensorReading, MOISTURE_THRESHOLD };
