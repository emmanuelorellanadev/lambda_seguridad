const Role = require("../models/role_model");
const User = require("../models/user_model");
const Branch_User = require('../models/branch_user_model');
const Branch = require('../models/branch_model');
const { encryptPass } = require("../helpers/encrypt");

const usersGet = async(req, res) => {

        try {
            const users = await User.findAll({include: Role});
            
            //Delete the users than role is less than the user logued
            users.map( (user, i = 0) => {
                user.RoleId < req.userLoggedIn.RoleId ? users.splice(i, 1) : ''
                i++
            })

            res.json({
                users       
            });
        } catch (error) {
            console.log('Failed to fetch users'.bgRed, error);
            res.status(400).json({
                msg: "Usuarios no encontrados"
            })
        }
}

const userGet = async(req, res) => {
    const { id }  = req.params;

    //if id is sended search the user with that id, else search all users
        try {
            const user = await User.findByPk(id);
            console.log(id, user)
            //if userLoggued tries to get a higher privileged user
            if(user.RoleId < req.userLoggedIn.RoleId){
                throw 'You dont have the required roleeee'                
            }

            res.json({
                user
            });
        } catch (error) {
            console.log('Filed to fetch user'.bgRed, error);
            res.status(400).json({
                msg: "Usuario no encontrado"
            })
        }
}

const userPost = async(req, res) => {
    const userToSave  = req.body;
    
    if ( !userToSave ){
        return res.status(401).json({ error : 'Error: Data required'})
    }

    //Encript password before save
    userToSave.user_password = encryptPass(userToSave.user_password);   
    
    try {
        //check if Role exist
        const role = await Role.findByPk( userToSave.RoleId ); 
        
        if( !( role && role.role_status ) ){        //if Role exist and role is active, save. If not request error
            throw 'Check Role'
        }
            
        //Search Branch
        console.log(userToSave);
        const branch = await Branch.findByPk(userToSave.BranchId);
        if ( !branch ){ //if branch doesnt exist error
            throw 'Branch not found'
        }
            
        //Save User
        const userSaved = await User.create(userToSave);
        //save Branch_User
        await Branch_User.create({ 
                BranchId: userToSave.BranchId,
                UserId: userSaved.id
            })

            res.json({
                msg: "userSaved",
            })

    } catch (error) {                           
        console.log('USER WAS NOT SAVED'.bgRed, error);

        res.status(400).json({
            error
        })   
    }
}

const userPut = async(req, res) => {
try {
    const { id } = req.params;
    const userData = req.body;
    
    const userExist = await User.findByPk(id);

    if (!userExist) {
        throw  ('Usuario no encontrado')
    }

    // if password doesnt change delete password from the object user
    if (userExist.user_password === userData.user_password){
        delete userData.user_password;
    }
    else{
        // if password change encrypt user_password

        userData.user_password = encryptPass( userData.user_password );   
    }
    
    await User.update(
        userData,
        {
            where: {id: id}
        })
        .then( ( ) => {
            res.json({
            msg: `User "${userData.user_name}" updated successfully`,
            })
        })
        .catch( error => {
            throw error
        })    
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error
        }
        )
    }    
}
    
    const userDelete = async(req, res) => {
        const userToDelete = req.body;
        
        try {
            const userDeleted = await User.destroy({
                where: { "id" : userToDelete.id}
            })
            if (userDeleted) {
                
                console.log('User deleted successfully');
                res.json({
                    msg: "Usuario eliminado exitosamente."
                })
        }
        else{
            console.log('The user was not found to be deleted');
            res.status(401).json({
                msg:"No se encontro usuario para eliminar"
            })
        }
    } catch (error) {
        console.log('User was not deleted'.bgRed, error);

        res.status(400).json({
            msg:"Error al liminar el usuario",
            error
        })
    }
}

module.exports = {
    usersGet,
    userGet,
    userPost,
    userPut,
    userDelete
}