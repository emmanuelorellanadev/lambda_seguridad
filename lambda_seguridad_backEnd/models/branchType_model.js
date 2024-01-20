//BRANCHTYPE MODEL

const { DataTypes } = require('sequelize');
const db_connection = require('../database/conf_database');

const BranchType = db_connection.define('BranchType',{
    branchType_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    branchType_state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},
{
    timestamps: false
})

BranchType.sync({force: false});

module.exports = BranchType;
