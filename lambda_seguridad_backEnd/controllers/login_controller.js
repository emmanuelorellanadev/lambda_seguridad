const User = require("../models/user_model");
const { checkPassword } = require("../helpers/encrypt");
const { generatorJWT } = require("../helpers/generator_jwt");

const login = async(req, res) => {
   
    const { name, pass } = req.body;   
 
        try {
            //search on database
            let user = await User.findOne({ where: { user_name: name}});

            //user not found
            if( !user ){
                throw 'ERROR: check user/password ';
            }else{
                //check password sha
                const passOK = await checkPassword(pass, user.user_password)
                
                if ( !passOK ) {
                    throw 'ERROR: check user/password ';
                }else{    
                    //Check User status
                    if ( !user.user_status ){
                        throw 'ERROR: User disabled ';
                    }else{
                        //create JWT
                        const token = await generatorJWT( user.id, user.RoleId, user.user_name);
                        //send the user logued and his token
                        console.log(`User ${user.user_name} registered successfully ${new Date()}`.green)
                        res.json({ token });
                    }
                }
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ error })
        }
}

module.exports = {
    login
}