const Role = require("../models/role_model");
const User = require("../models/user_model");
const bcryptjs = require('bcryptjs');


const userGet = async(req, res) => {

    const userData = req.body;

    try {
        
        const users = await User.findAll();

        res.json({
            users       
        });

    } catch (error) {
        console.log('Filed to fetch users'.bgRed);
        throw (error)
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
        console.log('USER CANT BE SAVED'.bgRed);
        return res.status(400).json({
            msg: error.errors
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

module.exports = {
    userGet,
    userPost,
    userPut
}