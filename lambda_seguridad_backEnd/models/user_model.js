//USER MODEL

const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');
const Role = require('./role_model');
const Branch = require('./branch_model');

const User = db_connection.define('User', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_pass: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_state: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    user_img:{
        type: DataTypes.STRING,
        defaultValue: 'defaultUserImage.png'
    },
    user_creation:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
        // defaultValue: Date.now()
    }
},
{
    timestamps: false
});

Role.hasMany(User, { 

    foreignKey: {
        name: 'RoleId',
        allowNull: false
    },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',

});
User.Role = User.belongsTo(Role);

Branch.belongsToMany(User, { through: "branch_user"});

User.sync( );

module.exports = User;