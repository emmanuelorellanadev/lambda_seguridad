//USER MODEL

const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');
const Role = require('./role_model');
const Branch = require('./branch_model');

const User = db_connection.define('User', {
    user_name: {
        type: DataTypes.STRING,
        require: true,
        unique: true
    },
    user_password: {
        type: DataTypes.STRING,
        require: true
    },
    user_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},
{
    timestamps: false
});

Role.hasMany(User, { 

    foreignKey: {
        // name: 'tablaId',
        allowNull: false
    },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',

});
User.Role = User.belongsTo(Role);

Branch.belongsToMany(User, { through: "branch_user"});

User.sync( );

module.exports = User;
