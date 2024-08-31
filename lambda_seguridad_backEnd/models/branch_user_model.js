const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');
const Branch = require('../models/branch_model');
const User = require('../models/user_model');

const Branch_User = db_connection.define('Branch_User', {}, { timestamps: false } );

Branch.belongsToMany(User, { through: Branch_User });
User.belongsToMany(Branch, { through: Branch_User });

User.hasMany(Branch_User);
Branch_User.belongsTo(User);
Branch.hasMany(Branch_User);
Branch_User.belongsTo(Branch);

Branch_User.sync({force: false});

module.exports = Branch_User;