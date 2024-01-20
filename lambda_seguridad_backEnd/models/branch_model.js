const { DataTypes } = require('sequelize');
const db_connection = require('../database/conf_database');

const BranchType = require('./branchType_model');
const Company = require('./company_model');


const Branch = db_connection.define('Branch', {
    branch_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    branch_address:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    branch_phone:{
        type: DataTypes.STRING(11),
        allowNull: false,
    },
    branch_state:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true
    }
},
{
    timestamps: false
})

BranchType.hasMany(Branch, {
    foreignKey: {
        allowNull: false
    },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
});
Branch.belongsTo(BranchType);

Company.hasMany(Branch, {
    foreignKey: {
        // name: 'CompanyIds',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Branch.belongsTo(Company);

Branch.sync({force: false});

module.exports = Branch;