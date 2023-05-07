//Handles connection to the database
//'database': 'db_lambda_security',
//'user': 'lambda',
//'pass': 'Phanter5919'

const { Sequelize } =  require('sequelize');

const db_connection = new Sequelize('db_lambda_security', 'lambda', 'Phanter5919', {
    host: 'localhost',
    dialect: 'mariadb' //DBMS type
});

module.exports = db_connection;