const { QueryTypes, Op } = require('sequelize')

const db_connection = require('../database/conf_database');
const catchedAsync = require('../errors_handler/catchedAsync');
const { resSuccessful } = require('../response/resSucessful');
const { DBError } = require('../errors_handler/errors');
const { paginate } = require('../helpers/paginate');
const User = require('../models/user_model');
const Branch = require('../models/branch_model');
const Role = require('../models/role_model');
const Branch_User = require('../models/branch_user_model');

const usersGetByBranch = async(req, res) => {
    const { id, q, page, limit } = req.query;
    // const branchId  = req.params.id;
    // console.log(branchId)
    let search = {};
    let order = [];

    //pagination
    const limitNumber = parseInt(limit, 10) || 10;
    const pageNumber = parseInt(page, 10) || 1;
    let options = {};
    //check if limit was recibed
    if(limit){
        options = {limit: limitNumber, offset: getOffset(pageNumber, limitNumber)}
    }
    console.log(options)


    //CHECK THIS
    //THE USER SEARCH BY BRANCH IS NOT WORKING WITH THE PAGINATION MODULE TABLE_USER.JSX
     //MERGE THE METOD CONFIGURATION WITH SQL QUERY 


    // if(id){
        // console.log('branchId');
        // await User.findAll({
        //     attributes: ['id', 'user_name', 'user_state' ],
        //     include: [
        //         {model: Branch_User, where:{BranchId: `${branchId}`} },
        //         {model: Role, }
        //     ],
        // })
        // .then( users => { resSuccessful(res, users)})
        //ERROR!!
        //     "status": "FAILED",
        //     "name": "SequelizeEagerLoadingError",
        //     "error": "Branch_User is not associated to User!"
    // }else{
        console.log('ELSE'.yellow);
        const { count, rows } = await User.findAndCountAll({
            where: { [Op.or]: [
                {user_name: { [Op.like]: `%${q || ''}%`}},
            ]}, 
            attributes: ['id', 'user_name', 'user_state'], 
            limit: limitNumber, 
            offset: getOffset(pageNumber, limitNumber),
            include: 
                [
                // [db_connection.literal(`(SELECT branch_name from Branches where '1')`), 'branch_name'],
                {model: Role, attributes: ['role_name']}, 
                {model: Branch, attributes: ['branch_name'] }
                ],
            })
            
            resSuccessful(res, {
                prevPage: getPrevPage(pageNumber),
                currentPage: pageNumber,
                nextPage: getNextPage(pageNumber, limitNumber, count),
                total: count,
                limit: limit,
                data: rows
            })
    // }
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