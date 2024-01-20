const Person = require("../models/person_model");

const { resSuccessful } = require('../response/resSucessful');
const catchedAsync = require('../errors_handler/catchedAsync')
const { DBError, GeneralError } = require('../errors_handler/errors');

const getPeople = async( req, res) => {

    const person = await Person.findAll()
    if( person.length == 0 ) { throw new DBError(null, 'No se encontraron personas.', 404)}

    resSuccessful(res, person);
}

const getPerson = async( req, res) => {
    const { id } = req.params;

    const person = await Person.findByPk(id)
    if( !person ) { throw new DBError(null, 'No se encontró la persona.', 404)}

    resSuccessful(res, person);
}

const savePerson = async( req, res) => {
    const personData = req.body;

    await Person.create(personData)
        .then( personSaved => resSuccessful(res, `Persona "${personData.person_names}", guardada exitosamente.`))
        .catch( error => {throw new DBError(error, 'Error al guardar persona.', 500)})

    }

const updatePerson = async( req, res) => {
    const { id } = req.params;
    const personData = req.body;

    const personDB = await Person.findByPk(id);
    if( !personDB ) { throw new GeneralError('Tipo de persona no encontrado', 404)}

    await Person.update(personData, { where: {id: id}})
        .then( personUpdated => resSuccessful(res, `Persona, actualizada correctamente.`))
        .catch( error => {throw new DBError(error, 'Error al guardar persona.', 500)})

}

const deletePerson = async( req, res) => {
    const { id } = req.params;

    const person = await Person.findByPk(id)
    if( !person ) { throw new DBError(null, 'No se encontraron personas.', 404)}

    await Person.destroy({where: {id: id}})
        .then( () => resSuccessful(res, 'Persona, eliminada correctamente.'))
}
module.exports = {
    getPeople: catchedAsync(getPeople),
    getPerson: catchedAsync(getPerson),
    savePerson: catchedAsync(savePerson),
    updatePerson: catchedAsync(updatePerson),
    deletePerson: catchedAsync(deletePerson),
}