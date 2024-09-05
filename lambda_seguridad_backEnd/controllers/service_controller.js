const catchedAsync = require('../errors_handler/catchedAsync');
const { DBError, GeneralError } = require('../errors_handler/errors');
const { paginate } = require('../helpers/paginate');
const Service = require('../models/service_model');
const { resSuccessful } = require('../response/resSucessful');

const getServices = async( req, res ) => {

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

    const services = await paginate(Service, page, limit, search, order);

    resSuccessful(res, services);
}

const getService = async( req, res ) => {
    const { id } = req.params;
    console.log(id.red);
    const service = await Service.findByPk(id);

    if ( !service ){
        throw new GeneralError('No se encontró el servicio.')
    }

    resSuccessful(res, service);
}

const saveService = async( req, res ) => {
    const serviceData = req.body;

    if ( !serviceData ){
        throw new GeneralError('No se recibieron datos de servicio.')
    }

    await Service.create(serviceData)
        .catch(error => {
            throw new DBError(error, 'Error al guardar el servicio')
        });


    resSuccessful(res, 'Servicio guardado exitosamente');
}

const updateService = async( req, res ) => {
    const { id } = req.params;
    const serviceData = req.body;

    const service = await Service.findByPk(id);
    
    if ( !serviceData ){
        throw new GeneralError('No se recibieron datos de servicio.')
    }

    if ( !service ) {
        throw new GeneralError('Servicio no encontrado')
    }

    await Service.update(serviceData, { where: {id: id}})
        .catch(error => {
            throw new DBError(error, 'Error al actualizar el servicio')
        });

    resSuccessful(res, 'Servicio actualizado exitosamente');
}

const deleteService = async(req, res) => {
    const { id } = req.params;

    const service = await Service.findByPk(id);

    if( !service ){
        throw new GeneralError('Servicio no encontrado');
    }

    await Service.destroy({where: {id:id}})
        .catch(error => {
            throw new DBError(error, 'No se pudo eliminar el Servicio');
        })

    resSuccessful(res, `Servicio ${service.service_name} eliminado exitosamente`)
}

module.exports = {
    getServices: catchedAsync(getServices),
    getService: catchedAsync(getService),
    saveService: catchedAsync(saveService),
    updateService: catchedAsync(updateService),
    deleteService: catchedAsync(deleteService),
}