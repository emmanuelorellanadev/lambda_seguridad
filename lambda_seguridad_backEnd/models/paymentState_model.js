const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');

const PaymentState = db_connection.define('PaymentState', {
    paymentState_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    paymentState: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},
{
timestamps: false
});

PaymentState.sync( {force: false});

module.exports = PaymentState; 