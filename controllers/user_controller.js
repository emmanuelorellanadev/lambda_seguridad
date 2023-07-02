const Role = require("../models/role_model");
const User = require("../models/user_model");
const bcryptjs = require('bcryptjs');


const userGet = async(req, res) => {

    // const userData = req.body;
    // console.log('userData: ',userData);
    const { id } = req.query;
    
    //if id is sended search the user with that id, else search all users

    if ( !id ){

        try {
            
            const users = await User.findAll();
    
            res.json({
                users       
            });
    
        } catch (error) {
            console.log('Filed to fetch users'.bgRed, error);
            res.status(400).json({
                msg: "Usuarios no encontrados"
            })
        }
    }else{

        try {
            console.log('dentro de busqueda con id', id);
            const user = await User.findByPk(id);
    
            res.json({
                user
            });
    
        } catch (error) {
            console.log('Filed to fetch user'.bgRed);
            res.status(400).json({
                msg: "Usuario no encontrado"
            })
        }
    }
} 

const userPost = async(req, res) => {

    const userToSave  = req.body;
    
    //Encript password before save
    const salt = bcryptjs.genSaltSync();
    userToSave.user_password = bcryptjs.hashSync( userToSave.user_password, salt)  
    
    try {
        //check if Role exist
        const role = await Role.findByPk( userToSave.RoleId ); 
        
        if( !( role && role.role_status ) ){        //if Role exist and role is active save if not request error
            console.log('Check Role'.bgYellow);     //delete
            res.status(400).json({
                msg: 'Check Role'
            })
            
        }else{
            
            const { user_status, user_name, id } = await User.create(userToSave);
            
            res.json({
                msg: "userSaved",
                id,
                user_name,
                user_status
            })
        }
    } catch (error) {                           
        console.log('USER WAS NOT SAVED'.bgRed, error);

        return res.status(400).json({
            msg: 'Error al guardar el usuario nuevo',
            error
        })   
    }
}

const userPut = async(req, res) => {
    
    const { id } = req.params;
    const userToUpdate = req.body;
    
    
    try {
        // check if User an Role exist
        const userExist = await User.findByPk(id);
        const roleExist = await Role.findByPk(userToUpdate.RoleId);
        
        if ( ( !userExist ) || !roleExist) { //if role and user dosnt exist
            console.log("User or RoleId doesnt exist");
            
            return res.status(400).json({
                msg: 'ERROR User or RoleId dosnt exist'
            })
        }else{
            //encript password before save
            const salt = bcryptjs.genSaltSync();
            userToUpdate.user_password = bcryptjs.hashSync( userToUpdate.user_password, salt)  
            //Update user
            const userUpdated = await User.update( userToUpdate, { where: 
                {
                    id: id
                }})

                res.json({
                    msg: 'Put user works!!!',
                    userUpdated,                    
                })
        }
    } catch (error) {
        console.log('Problem updating User'.bgRed);
        throw(error);
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

        }else{

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
    userGet,
    userPost,
    userPut,
    userDelete
}