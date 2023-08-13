const Role = require("../models/role_model");
const User = require("../models/user_model");
const { encryptPass } = require("../helpers/encrypt")

const userGet = async(req, res) => {
    const { id }  = req.params;
    // const {id}  = req.query;
    console.log(id)
    //if id is sended search the user with that id, else search all users
    if ( !id ){
        try {
            const users = await User.findAll();
            
            res.json({
                users       
            });
        } catch (error) {
            console.log('Failed to fetch users'.bgRed, error);
            res.status(400).json({
                msg: "Usuarios no encontrados"
            })
        }
    }else{
        try {
            const user = await User.findByPk(id);
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
}

const userPost = async(req, res) => {
    const userToSave  = req.body;
    
    //Encript password before save
    userToSave.user_password = encryptPass(userToSave.user_password);   
    
    try {
        //check if Role exist
        const role = await Role.findByPk( userToSave.RoleId ); 
        
        if( !( role && role.role_status ) ){        //if Role exist and role is active save if not request error
            throw 'Check Role'
        }else{
            
            const { user_name  } = await User.create(userToSave);
            
            res.json({
                msg: "userSaved",
                user_name,
            })
        }
    } catch (error) {                           
        console.log('USER WAS NOT SAVE'.bgRed, error);

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
    userGet,
    userPost,
    userPut,
    userDelete
}