const { QueryTypes, Op } = require('sequelize')

const db_connection = require('../database/conf_database');
const catchedAsync = require('../errors_handler/catchedAsync');
const { resSuccessful } = require('../response/resSucessful');
const { DBError } = require('../errors_handler/errors');
const { paginate } = require('../helpers/paginate');

const usersGetByBranch = async(req, res) => {
    let query = '';
    const { q, page, limit } = req.query;
    // const branchId  = req.params.id;

    // let search = {};
    // let order = [];

    // if (q){
    //     search = {
    //         where: {
    //             user_name: { [Op.like]: `%${q}%` }
    //         }
    //     }
    // }
    
    //CHECK THIS
    //THE USER SEARCH BY BRANCH IS NOT WORKING WITH THE PAGINATION MODULE TABLE_USER.JSX
     //MERGE THE METOD CONFIGURATION WITH SQL QUERY 

    // users = await paginate(Company, page, limit, search, order);

    // if( !branchId ){
        if(q)  query = `SELECT Users.id, user_name, user_state, role_name, user_img from Branch_Users INNER JOIN Users ON UserId = Users.id AND user_name LIKE '${q}%' INNER JOIN Roles ON RoleId = Roles.id`;
        if(!q) query = `SELECT Users.id, user_name, user_state, role_name, user_img from Branch_Users INNER JOIN Users ON UserId = Users.id INNER JOIN Roles ON RoleId = Roles.id `;
        // query = `SELECT Users.id, user_name, user_state, role_name, user_img from Branch_Users INNER JOIN Users ON UserId = Users.id INNER JOIN Roles ON RoleId = Roles.id`;
    // }else{
    //     query = `SELECT Users.id, user_name, user_state, role_name, user_img from Branch_Users INNER JOIN Users ON UserId = Users.id INNER JOIN Roles ON RoleId = Roles.id AND BranchId = ${branchId}`;
    // }

    await db_connection.query(query, {type: QueryTypes.SELECT})
    .then( users => { resSuccessful(res, users)})
    .catch( error => { throw new DBError(error, 'Usuarios no encontrados', 400)})
}

module.exports = {
    usersGetByBranch: catchedAsync(usersGetByBranch)
}