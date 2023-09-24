const { DataTypes } = require('sequelize');
const db_connection = require('../database/conf_database');

const BranchType = require('./branchType_model');
const Company = require('./company_model');



const Branch = db_connection.define('Branch', {
    branch_name: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    branch_address:{
        type: DataTypes.STRING,
        required: true,
    },
    branch_phone:{
        type: DataTypes.STRING(11),
        required: false,
    },
    branch_state:{
        type: DataTypes.BOOLEAN,
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