const User = require("../models/user_model");
const { checkPassword } = require("../helpers/encrypt");
const { generatorJWT } = require("../helpers/generator_jwt");
const catchedAsync = require("../errors_handler/catchedAsync");
const { LoginError } = require("../errors_handler/errors");
const { logSuccessfulLogin } = require("../errors_handler/log_handler");

const login = async (req, res) => {

    const { name, pass } = req.body;

    //search on database
    let user = await User.findOne({ where: { user_name: name } });

    //user not found
    if (!user) {
        throw new LoginError(`ERROR: Usuario o contraseña no validos`, 401);
    } else {
        //check password sha
        const passOK = await checkPassword(pass, user.user_pass)

        if (!passOK) {

            throw new LoginError( `ERROR: Usuario o contraseña no validos`, 401);

        } else {
            //Check User status
            if (!user.user_state) {
                throw new LoginError(`ERROR: Usuario deshabilitado`, 401);
            } else {
                //create JWT
                const token = await generatorJWT(user.id, user.RoleId, user.user_name);
                //send the user logued and his token
                console.log(`User ${user.user_name} registered successfully ${new Date()}`.green)
                await logSuccessfulLogin(user.user_name, user.RoleId);
                res.json({ token });
            }
        }
    }
}

module.exports = {
    login: catchedAsync(login),
}