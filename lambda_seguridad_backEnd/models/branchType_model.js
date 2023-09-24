//BRANCHTYPE MODEL

const { DataTypes } = require('sequelize');
const db_connection = require('../database/conf_database');

const BranchType = db_connection.define('BranchType',{
    branchType_name: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    branchType_status: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: true
    }
},
{
    timestamps: false
})

BranchType.sync();

module.exports = BranchType;
