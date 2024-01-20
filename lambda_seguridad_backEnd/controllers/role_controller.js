const catchedAsync = require('../errors_handler/catchedAsync');
const { GeneralError, DBError } = require('../errors_handler/errors');
const Role = require('../models/role_model');
const { resSuccessful } = require('../response/resSucessful');

const getRoles = async(req, res) => {

        const roles = await Role.findAll();

        if( !roles ) throw new GeneralError('No se encontraron roles en la base de datos', 400)
// Check if the role of userLogued is less than the role to show.
// That doesnt allow suerpuser create admin user, etc.

    roles.map( (role, i = 0) => {
        role.id < req.userLoggedIn.RoleId ? roles.splice(i, 1) : '';
        i++
    })

        resSuccessful(res, roles);

}

const getRole = async(req, res) => {

    const { id } = req.params;

    const role = await Role.findByPk(id);

    if( !role ) throw new GeneralError('No se enconto el rol en la base de datos', 400)
// Check if the role of userLogued is less than the role to show.
    if( role.id < req.userLoggedIn.RoleId ) {
        GeneralError('No tienes permiso para acceder a esta información', 401);
    }
    resSuccessful(res, role);
}

const saveRole = async(req, res) => {

    const role = req.body;

        await Role.create( role )
            .then( resp => resSuccessful(res, `Rol ${resp.role_name} creado exitosamente`)); 

}

const updateRole = async(req, res) => {

    const { id } = req.params;
    const usuarioEdit = req.body

        await Role.update( usuarioEdit, { where: { id: id} } )
            .then( resp => resSuccessful(res, `Rol ${resp.role_name} actualizado correctamente`) )
            .catch( error => { throw new DBError(error, 'No fue posible actualizar el Rol', 400)})

}

const deleteRole = async(req, res) => {
    const { id } = req.params;

    const roleToDelete = await Role.findByPk(id);
    
    if(!roleToDelete) throw new GeneralError('Rol no encontrado', 404);

    await Role.destroy( {where: {"id": id}} )
        .then(() => resSuccessful(res, `Rol eliminado correctamente`))
}
module.exports = {
    getRoles: catchedAsync(getRoles),
    getRole: catchedAsync(getRole),
    saveRole: catchedAsync(saveRole),
    updateRole: catchedAsync(updateRole),
    deleteRole: catchedAsync(deleteRole)
}