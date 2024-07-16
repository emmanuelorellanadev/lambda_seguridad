const User = require("../models/user_model");
const { encryptPass, checkPassword } = require("../helpers/encrypt");
const catchedAsync = require("../errors_handler/catchedAsync");
const { resSuccessful } = require("../response/resSucessful");
const { GeneralError, DBError } = require("../errors_handler/errors");

const putUserPass = async(req, res) => {
        // const userData  = Object.assign({}, req.body); // fix [Object: null prototype]{xxx: xxxx}
    
        const { id } = req.params;
        const userData = req.body;
        const userOnDB = await User.findByPk(id);
        if (!userOnDB) { throw new DBError(null, 'Usuario no encontrado', 404) }

        //check if the old pass is correct
        const passEqual = await checkPassword(userData.current_pass, userOnDB.user_pass);
        if (!passEqual) {throw new GeneralError('La contraseña no es correcta. \n Intentalo de nuevo', 400)}
        
    
        // encrypt user_pass
        userData.user_pass = await encryptPass( userData.user_pass );  

        await User.update( {"user_pass": userData.user_pass}, { where: {id: id} })
            .then(resp => console.log(resp))
            .catch( error => {
                throw new DBError(error, "Error al actualizar la contraseña.", 400)
            })
        resSuccessful(res, `Contraseña actualizada correctamente.`)
}

module.exports = {putUserPass: catchedAsync(putUserPass)}