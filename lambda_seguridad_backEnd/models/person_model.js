const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');
const Branch = require('./branch_model');
const PersonType = require('./personType_model');

const Person = db_connection.define('Person', {
    person_names: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    person_surnames: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    person_cui: {
        type: DataTypes.STRING,
        allowNull: true
    },
    person_nit: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    person_phone: {
        type: DataTypes.STRING(14),
        allowNull: true
    },
    person_address: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
},
{
    timestamps: false
});

//RELATIONS
//ONE TO MANY, PersonType -> Person
PersonType.hasMany(Person, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Person.PersonType = Person.belongsTo(PersonType)

//ONE TO MANY, Branch -> Person
Branch.hasMany(Person, {
    foreignKey: {
        name: 'BranchId',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Person.Branch = Person.belongsTo(Branch);

Person.sync({force: false} );

module.exports = Person;
