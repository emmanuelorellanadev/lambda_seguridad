const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');
const Reservation  = require('./reservation_model');
const PaymentState = require('./paymentState_model');

const Payment = db_connection.define('Payment', {
    payment_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }, 
    total_payment: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
},
{
    timestamps: false
});

PaymentState.hasMany(Payment, {
    foreignKey: {
        allowNull: false
    }
});
Payment.PaymentState = Payment.belongsTo(PaymentState);

// ReservationId
Reservation.hasMany(Payment, {
    foreignKey: {
        allowNull: false
    }
});
Payment.Reservation = Payment.belongsTo(Reservation);

Payment.sync( {force:false} );

module.exports = Payment;