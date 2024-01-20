const { Sequelize } =  require('sequelize');

    const db_connection = new Sequelize(process.env.DATABASE, process.env.DBUSER, process.env.PASSDB, {
    host: '127.0.0.1',
    dialect: 'mariadb' //DBMS type
});

module.exports =  db_connection;