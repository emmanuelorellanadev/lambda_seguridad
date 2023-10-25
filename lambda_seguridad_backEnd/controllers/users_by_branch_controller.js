const { QueryTypes } = require('sequelize')

const db_connection = require('../database/conf_database')

const usersGetByBranch = async(req, res) => {
    const branchId  = req.params.id;
    
    try {
        let query = '';

        if( !branchId ){
            // query = `SELECT Users.id, user_name, user_state, RoleId, user_img from Branch_Users INNER JOIN Users WHERE UserId = Users.id`;
            query = `SELECT Users.id, user_name, user_state, role_name, user_img from Branch_Users INNER JOIN Users ON UserId = Users.id INNER JOIN Roles ON RoleId = Roles.id`;
        }else{
            query = `SELECT Users.id, user_name, user_state, role_name, user_img from Branch_Users INNER JOIN Users ON UserId = Users.id INNER JOIN Roles ON RoleId = Roles.id AND BranchId = ${branchId}`;

        }
        // const users = await db_connection.query(`SELECT Users.id, user_name, user_state, RoleId, user_img from Branch_Users INNER JOIN Users WHERE UserId = Users.id AND BranchId = ${branchId}`, {type: QueryTypes.SELECT});
        const users = await db_connection.query(query, {type: QueryTypes.SELECT});

        res.json({
            users
        });
    } catch (error) {
        console.log('Filed to fetch user'.bgRed, error);
        res.status(400).json({
            msg: "Usuario no encontrado"
        })
    }
}

module.exports = {
    usersGetByBranch
}