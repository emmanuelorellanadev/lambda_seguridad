const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');
const User = require('./user_model');
const Person = require('./person_model');
const ReservationState = require('./reservationState_model');

const Reservation = db_connection.define('Reservation', {
    reservation_date: {
        type: DataTypes.DATE,
        defaultValue:  DataTypes.NOW,
        allowNull: false
    }
},
{
    timestamps: false
});

//foreignKey PersonId
Person.hasMany(Reservation, {
    foreignKey: {
        allowNull: false
    }
});
Reservation.Person = Reservation.belongsTo(Person);

//foreignKey ReservationStateId
ReservationState.hasMany(Reservation, {
    foreignKey: {
        allowNull: false
    }
});
Reservation.ReservationState = Reservation.belongsTo(ReservationState);

//foreignKey UserId
User.hasMany(Reservation, {
    foreignKey: {
        allowNull: false
    }
});
Reservation.User = Reservation.belongsTo(User);

Reservation.sync( { force: false });

module.exports = Reservation; 