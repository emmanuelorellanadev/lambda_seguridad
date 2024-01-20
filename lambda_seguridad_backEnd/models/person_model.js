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
        unique: true,
        required: false
    },
    person_nit: {
        type: DataTypes.STRING(10),
        unique: true,
        required: false
    },
    person_phone: {
        type: DataTypes.STRING(14),
        required: false
    },
    person_address: {
        type: DataTypes.STRING(50),
        required: false
    }
},
{
    timestamps: false
});

//RELATIONS
//MANY TO ONE, PersonType -> Person
PersonType.hasMany(Person, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Person.PersonType = Person.belongsTo(PersonType)

//MANY TO ONE, Branch -> Person
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
