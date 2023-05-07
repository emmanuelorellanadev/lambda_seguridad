const User = require("../models/user_model");
const bcrypt = require('bcryptjs');

const { generatorJWT } = require("../helpers/generator_jwt");

const login = async(req, res) => {
    //post react 
   
    const { name, pass } = req.body;   
    console.log(name, pass);  //delete

    const checkPassword = (password, savedPassword) => {
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, savedPassword, (err, matches) => {
            if (err) reject(err)
            else resolve(matches)
          })
        })
      }
 
        try {
            //search on database
            let user = await User.findOne({ where: { user_name: name}});

            //user not found
            if( !user ){
                return res.status(401).json({ msg: 'No data found' })
            }else{
                const userData = user.toJSON(); //DELETE  
                
                //check password sha
                const passOK = await checkPassword(pass, user.user_password)
                if ( !passOK ) {
                    return res.status(401).json( { msg: 'pass verification failed'})
                }else{
                    
                    //Check User status
                    if ( !user.user_status ){
                        return res.status(400).json( { msg: 'User disabled' })
                    }else{
                       
                        //create JWT
                        const token = await generatorJWT( user.id )
                        res.json({ msg: 'Wellcome User', token,});
                    }
                }

            }

        } catch (error) {
            throw(error)
        }
        
}

module.exports = {
    login
}