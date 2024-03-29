//ROLE MODEL

const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');

const Role = db_connection.define('Role', {
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role_state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},
{
    timestamps: false
});

Role.sync({force: false});

module.exports = Role;