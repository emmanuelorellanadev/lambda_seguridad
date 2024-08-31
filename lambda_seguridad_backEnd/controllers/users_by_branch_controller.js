const { QueryTypes, Op } = require('sequelize')

const db_connection = require('../database/conf_database');
const catchedAsync = require('../errors_handler/catchedAsync');
const { resSuccessful } = require('../response/resSucessful');
const { DBError } = require('../errors_handler/errors');
const Branch_User = require('../models/branch_user_model');

const usersGetByBranch = async(req, res) => {
    const { id, q, page, limit } = req.query;

    //pagination
    const limitNumber = parseInt(limit, 10) || 10;
    const pageNumber = parseInt(page, 10) || 1;

        const {count, row} = await Branch_User.findAndCountAll({where: {BranchId: id}})

        if (q){
            query = `SELECT Users.id, user_name, user_state, role_name, user_img from Branch_Users
            INNER JOIN Users ON UserId = Users.id 
            INNER JOIN Roles ON RoleId = Roles.id AND BranchId = ${id} 
            WHERE user_name LIKE '%${q}%'LIMIT ${limit} OFFSET ${getOffset(page, limit)}`;
        }else{
            query = `SELECT Users.id, user_name, user_state, role_name, user_img from Branch_Users
            INNER JOIN Users ON UserId = Users.id 
            INNER JOIN Roles ON RoleId = Roles.id AND BranchId = ${id} LIMIT ${limit} OFFSET ${getOffset(page, limit)}`;
        }
        
        const users = await db_connection.query(query, {type: QueryTypes.SELECT})

            resSuccessful(res, {
                prevPage: getPrevPage(pageNumber),
                currentPage: pageNumber,
                nextPage: getNextPage(pageNumber, limitNumber, count),
                total: count,
                limit: limit,
                data: users
            })
}

const getOffset = (page, limit) => {
    return (page * limit) - limit;
}
   
const getNextPage = (page, limit, total) => {
    if ((total/limit) > page) {
        return page + 1;
    }
    return null
}
   
const getPrevPage = (page) => {
    if (page <= 1) {
        return null
    }
    return page - 1;
}

module.exports = {
    usersGetByBranch: catchedAsync(usersGetByBranch)
}