//WORK HERE
//CHECK THE DATA TIME ZONE CONFIGURATION
//ON DATABASE SERVER time_zone = '-06:00' IS CONFIGURED 

const { Sequelize } =  require('sequelize');

    const db_connection = new Sequelize(process.env.DATABASE, process.env.DBUSER, process.env.PASSDB, {
    host: '127.0.0.1',
    dialect: 'mariadb', //DBMS type
    //used to set the time zone 
    dialectOptions: {
        // useUTC: false, // -->Add this line. for reading from database
        dateStrings: true,
        typeCast: function (field, next) { // for reading from database
          if (field.type === 'DATETIME') {
            return field.string()
          }
            return next()
          },
    },
    // timezone: '-06:00', // -->Add this line. for writing to database

    // pool: {
    //     max: 10,
    //     min: 0,
    //     idle: 10000,
    // }
});

module.exports =  db_connection;

