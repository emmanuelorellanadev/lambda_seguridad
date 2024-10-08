const catchedAsync = require('../errors_handler/catchedAsync');
const { GeneralError, DBError } = require('../errors_handler/errors');
const Role = require('../models/role_model');
const { resSuccessful } = require('../response/resSucessful');
const { paginate } = require("../helpers/paginate");
const { Op } = require('sequelize');

const getRoles = async(req, res) => {

        // const roles = await Role.findAll();

        // if( !roles ) throw new GeneralError('No se encontraron roles en la base de datos', 404)

    //used to paginate 
    const {q, page, limit, order_by, order_direction} = req.query;
    let search = {};
    let order = [];

    if (q){
        search = {
            where: {
                role_name: {
                    [Op.like]: `%${q}%`
                }
            }
        }
    }

    const roles = await paginate(Role, page, limit, search, order)
// Check if the role of userLogued is less than the role to show.
// That doesnt allow suerpuser create admin user, etc.
    roles.data?.map( (role, i = 0) => {
        // console.log(!(role.id  <  req.userLoggedIn.RoleId))
        role.id < req.userLoggedIn.RoleId ? roles.data?.splice(i, 1) : '';
        i++
    })

        resSuccessful(res, roles);

}

const getRole = async(req, res) => {

    const { id } = req.params;

    const role = await Role.findByPk(id);

    if( !role ) throw new GeneralError('No se encontró el rol en la base de datos', 404)
// Check if the role of userLogued is less than the role to show.
    if( role.id < req.userLoggedIn?.RoleId ) {
        throw new GeneralError('No tienes permiso para acceder a esta información', 401);
    }
    resSuccessful(res, role);
}

const saveRole = async(req, res) => {

    const role = req.body;

        await Role.create( role )
            .then( resp => resSuccessful(res, `Rol ${resp.role_name} creado exitosamente`))
            .catch(error => {
                throw new DBError(error, 'Error al guardar el Rol.')
            })

}

const updateRole = async(req, res) => {

    const { id } = req.params;
    const usuarioEdit = req.body

        await Role.update( usuarioEdit, { where: { id: id} } )
            .then( resp => {
                resSuccessful(res, `Rol ${resp.role_name} actualizado correctamente.`)
            } )
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