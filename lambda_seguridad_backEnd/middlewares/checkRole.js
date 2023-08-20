//Middleware
//check if the user have the correct validation to make an action

const Role = require('../models/role_model');

// const isRoleAdmin = async(req, res, next) => {

//     try {

//         const role = await Role.findByPk(req.userLogued.RoleId)

//         if ( !req.userLogued ){
//             return res.json({
//                 Err: 'you want check the role, but the token it doesnt checked'
//             })
//         }

//         if( !role ){
//             return res.status(401).json({
//                 msg: "the role wasnt finded"
//             })
//         }
//         // if the role isnt the correct brake action
//         if (role.role_name != 'ROLE_ADMIN'){
            
//             return res.json({
//                 msg: 'You dont have the role required'
//             })
//         }

//     } catch (error) {
//         throw(error);
//     }

//     next();
// }

const requiredRole = ( ...roles ) => {

    return (req, res, next)=>{
        if ( !req.userLoggedIn ){
            return res.json({
                Err: 'you want check the role, but the token it wasnt checked'
            })
        }

        if ( !roles.includes( req.userLoggedIn.role )){
            return res.status(401).json({
                msg: `Role is not the required`
            })
        }
        next();
    }
} 

module.exports = {
    // isRoleAdmin,
    requiredRole
}