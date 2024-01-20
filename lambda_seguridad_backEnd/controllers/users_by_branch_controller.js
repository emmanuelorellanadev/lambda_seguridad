const { QueryTypes } = require('sequelize')

const db_connection = require('../database/conf_database');
const catchedAsync = require('../errors_handler/catchedAsync');
const { resSuccessful } = require('../response/resSucessful');
const { DBError } = require('../errors_handler/errors');

const usersGetByBranch = async(req, res) => {
    const branchId  = req.params.id;
    let query = '';

    if( !branchId ){
        // query = `SELECT Users.id, user_name, user_state, RoleId, user_img from Branch_Users INNER JOIN Users WHERE UserId = Users.id`;
        query = `SELECT Users.id, user_name, user_state, role_name, user_img from Branch_Users INNER JOIN Users ON UserId = Users.id INNER JOIN Roles ON RoleId = Roles.id`;
    }else{
        query = `SELECT Users.id, user_name, user_state, role_name, user_img from Branch_Users INNER JOIN Users ON UserId = Users.id INNER JOIN Roles ON RoleId = Roles.id AND BranchId = ${branchId}`;
    }

    // const users = await db_connection.query(`SELECT Users.id, user_name, user_state, RoleId, user_img from Branch_Users INNER JOIN Users WHERE UserId = Users.id AND BranchId = ${branchId}`, {type: QueryTypes.SELECT});
    const users = await db_connection.query(query, {type: QueryTypes.SELECT})
    .then( users => resSuccessful(res, users))
    .catch( error => { throw new DBError(error, 'Usuarios no encontrados', 400)})
}

module.exports = {
    usersGetByBranch: catchedAsync(usersGetByBranch)
}