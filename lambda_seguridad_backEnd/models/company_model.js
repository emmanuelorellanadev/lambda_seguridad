//COMPANY MODEL 

const { DataTypes } = require('sequelize');
const db_connection = require('../database/conf_database');

const Company = db_connection.define('Company', {
    company_name: {
        type: DataTypes.STRING(100),
        required: true,
        unique: true
    },
    company_address: {
        type: DataTypes.STRING(100),
        required: true,
    },
    company_phone:{
        type: DataTypes.STRING(11),
        required: true,
    },
    company_description: {
        type: DataTypes.STRING,
        required: false,
    },
    company_mission: {
        type: DataTypes.STRING,
        required: false,
    },
    company_vision: {
        type: DataTypes.STRING,
        required: false,
    },
    company_logo:{
        type: DataTypes.STRING(100),
        required: false
    }
},
{
    timestamps: false
})

Company.sync({force: false});


module.exports = Company; 