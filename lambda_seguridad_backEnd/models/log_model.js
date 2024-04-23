const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');
const User = require('./user_model');
const Reservation = require('./reservation_model');
const Payment = require('./payment_model');

const Log = db_connection.define('Log', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        timestamps: false
    }
);

//UserId, ReservationId
User.belongsToMany(Reservation, { through: Log });
Reservation.belongsToMany(User, { through: Log });

//PaymentId
Payment.hasMany( Log )
Log.Payment = Log.belongsTo(Payment);

Log.sync( { force: false });

module.exports = Log;
