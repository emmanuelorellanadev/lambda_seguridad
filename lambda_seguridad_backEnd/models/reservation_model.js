const { DataTypes } = require('sequelize');

const db_connection = require('../database/conf_database');
const Branch = require('./branch_model');
const Person = require('./person_model');
const ReservationState = require('./reservationState_model');

const Reservation = db_connection.define('Reservation', {
    reservation_date: {
        type: DataTypes.DATE,
        defaultValue:  DataTypes.NOW,
        // allowNull: false
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

//foreignKey BranchId
Branch.hasMany(Reservation, {
    primaryKey: {
        allowNull: false
    }
});
Reservation.Branch = Reservation.belongsTo(Branch);

Reservation.sync( { force: false });

module.exports = Reservation; 