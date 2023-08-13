//Handles connection to the database
//'database': 'db_lambda',
//'user': 'root',
//'pass': 'Phanter5919'

const { Sequelize } =  require('sequelize');

const db_connection = new Sequelize('db_lambda', 'root', 'Phanter5919', {
    host: '127.0.0.1',
    dialect: 'mariadb' //DBMS type
});

module.exports = db_connection;