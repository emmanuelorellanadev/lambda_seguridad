const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');
const Payment = require('./payment_model');
const ReservationDetail = require('./reservationDetail_model')

const PaymentDetail = db_connection.define('PaymentDetail', {

    sub_total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

},
{
    timestamps: false
});

//PaymentId
Payment.hasMany(PaymentDetail, {
    foreignKey: {
        allowNull: false
    }
});
PaymentDetail.Payment = PaymentDetail.belongsTo(Payment);

//ReservationDetailId
ReservationDetail.hasMany(PaymentDetail, {
    foreignKey: {
        allowNull: false
    }
});
PaymentDetail.ReservationDetail = PaymentDetail.belongsTo(ReservationDetail); 

PaymentDetail.sync( {force: false });

module.exports = PaymentDetail;
