const PersonType = require("../models/personType_model");
const { Op } = require("sequelize");

const { resSuccessful } = require('../response/resSucessful');
const catchedAsync = require('../errors_handler/catchedAsync')
const { DBError, GeneralError } = require('../errors_handler/errors');
const { paginate } = require("../helpers/paginate");

const getPersonTypes = async( req, res) => {

    const {q, page, limit, order_by, order_direction} = req.query;
    let search = {};
    let order = [];

    if (q){
        search = {
            where: {
                personType_name: {
                    [Op.like]: `%${q}%`
                }
            }
        }
    }

    const personTypes = await paginate(PersonType, page, limit, search, order)

    resSuccessful(res, personTypes);
}

const getPersonType = async( req, res) => {
    const { id } = req.params;

    const personType = await PersonType.findByPk(id)
    if( !personType ) { throw new DBError(null, 'No se encontró el tipo de persona.', 404)}

    resSuccessful(res, personType);
}

const savePersonType = async( req, res) => {
    const personTypeData = req.body;
    await PersonType.create(personTypeData)
        .then( () => resSuccessful(res, `Tipo de persona "${personTypeData.personType_name}", guardado exitosamente`))
        .catch( error => {throw new DBError(error, 'Error al guardar tipo de persona.', 400)})

    }

const updatePersonType = async( req, res) => {
    const { id } = req.params;
    const personTypeData = req.body;

    const personTypeDB = await PersonType.findByPk(id);
    if( !personTypeDB ) { throw new GeneralError('Tipo de persona no encontrado', 404)}

    await PersonType.update(personTypeData, { where: {id: id}})
        .then( () => resSuccessful(res, `Tipo de persona ${personTypeData.personType_name}, actualizada correctamente.`))
        .catch( error => {throw new DBError(error, 'Error al guardar tipo de persona.', 400)})

}

const deletePersonType = async( req, res) => {
    const { id } = req.params;

    const personType = await PersonType.findByPk(id)
    if( !personType ) { throw new DBError(null, 'No se encontraron tipos de persona.', 404)}

    await PersonType.destroy({where: {id: id}})
        .then( () => resSuccessful(res, 'Tipo de persona, eliminado correctamente.'))
}
module.exports = {
    getPersonTypes: catchedAsync(getPersonTypes),
    getPersonType: catchedAsync(getPersonType),
    savePersonType: catchedAsync(savePersonType),
    updatePersonType: catchedAsync(updatePersonType),
    deletePersonType: catchedAsync(deletePersonType),
}