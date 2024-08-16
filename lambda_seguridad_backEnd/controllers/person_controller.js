const Person = require("../models/person_model");
const { Op, or } = require("sequelize");

const { resSuccessful } = require('../response/resSucessful');
const catchedAsync = require('../errors_handler/catchedAsync')
const { DBError, GeneralError } = require('../errors_handler/errors');
const { paginate } = require("../helpers/paginate");

const getPeople = async( req, res) => {

    //used to paginate 
    const {q, page, limit, order_by, order_direction} = req.query;
    let search = {};
    let order = [];

    if (q){
        search = {
            where: {
                [Op.or]:{
                    person_names: {[Op.like]: `%${q}%`}, 
                    person_surnames: {[Op.like]: `%${q}%`},
                    person_cui: {[Op.like]: `%${q}`},
                    person_nit: {[Op.like]: `%${q}`},
                }
            }
        }
    }

    const people = await paginate(Person, page, limit, search, order)
    resSuccessful(res, people);
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
        .then( () => resSuccessful(res, `Persona guardada exitosamente.`))
        .catch( error => {throw new DBError(error, 'Error al guardar persona.', 400)})

    }

const updatePerson = async( req, res) => {
    const { id } = req.params;
    const personData = req.body;

    const personDB = await Person.findByPk(id);
    if( !personDB ) { throw new GeneralError('Tipo de persona no encontrado', 404)}

    await Person.update(personData, { where: {id: id}})
        .then( () => resSuccessful(res, `Persona actualizada correctamente.`))
        .catch( error => {throw new DBError(error, 'Error al guardar persona.', 400)})

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