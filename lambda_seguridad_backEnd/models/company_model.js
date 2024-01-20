//COMPANY MODEL 

const { DataTypes } = require('sequelize');
const db_connection = require('../database/conf_database');

const Company = db_connection.define('Company', {
    company_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    company_address: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    company_phone:{
        type: DataTypes.STRING(11),
        allowNull: false,
    },
    company_description: {
        type: DataTypes.STRING,
    },
    company_mission: {
        type: DataTypes.STRING,
    },
    company_vision: {
        type: DataTypes.STRING,
    },
    company_logo:{
        type: DataTypes.STRING(100),
        defaultValue: 'defaultCompanyImage.png'
    }
},
{
    timestamps: false
})

Company.sync({force: false});


module.exports = Company; 