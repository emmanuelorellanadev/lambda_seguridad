//ROLE MODEL

const { DataTypes } = require('sequelize');
const db_connection = require('../database/conf_database');

const Role = db_connection.define('Role', {
    role_name: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    role_state: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: true
    }
},
{
    timestamps: false
})

Role.sync();

module.exports = Role;