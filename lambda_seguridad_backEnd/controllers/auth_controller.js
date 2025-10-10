
// Controlador de login: valida usuario y contraseña, verifica estado y emite JWT.
// Registra accesos exitosos para trazabilidad y usa manejo centralizado de errores.
const User = require("../models/user_model");
const { checkPassword } = require("../helpers/encrypt");
const { generatorJWT } = require("../helpers/generator_jwt");
const catchedAsync = require("../errors_handler/catchedAsync");
const { LoginError } = require("../errors_handler/errors");
const { logSuccessfulAuth } = require("../errors_handler/log_handler");
const Branch = require("../models/branch_model");

const auth = async (req, res) => {
    const { name, pass } = req.body;
    // Busca el usuario por nombre en la base de datos, incluyendo sucursales
    let user = await User.findOne({ where: { user_name: name }, include: Branch});
    // Si el usuario no existe, lanza error de login
    if (!user) {
        throw new LoginError(`Contraseña no valida`, 401);
    } else {
        // Valida la contraseña encriptada
        const passOK = await checkPassword(pass, user.user_pass)
        if (!passOK) {
            throw new LoginError( `Contraseña no valida.`, 401);
        } else {
            // Verifica que el usuario esté activo
            if (!user.user_state) {
                throw new LoginError(`ERROR: Usuario deshabilitado`, 401);
            } else {
                // Crea el JWT con los datos mínimos necesarios
                // console.log(user.Branches[0].branch_name)
                const token = await generatorJWT(user.id, user.RoleId, user.user_name, user.Branches[0].id, user.Branches[0].branch_name);
                // Registra el acceso exitoso para auditoría
                // console.log(`User ${user.user_name} registered successfully ${new Date()}`.green)
                await logSuccessfulAuth(user.user_name, user.RoleId);
                // Devuelve el token al frontend
                res.json({ token });
            }
        }
    }
}

// Exporta el controlador de autenticación envuelto en manejo de errores asíncronos
module.exports = {
    auth: catchedAsync(auth),
}