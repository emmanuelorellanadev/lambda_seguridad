// PERSONTYPE MODEL

const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');

const PersonType = db_connection.define('PersonType', {
    personType_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    personType_state:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
{
    timestamps: false
});

PersonType.sync({ force: false});

module.exports = PersonType;