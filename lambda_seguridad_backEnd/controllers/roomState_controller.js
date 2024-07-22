const { Op } = require('sequelize')
const catchedAsync = require('../errors_handler/catchedAsync');
const { GeneralError, DBError } = require('../errors_handler/errors');
const RoomState = require('../models/roomState_model');
const { resSuccessful } = require('../response/resSucessful');
const { paginate } = require("../helpers/paginate");

const getRoomStates = async(req, res) => {
    const {q, page, limit, order_by, order_direction} = req.query;
    let search = {};
    let order = [];

    if (q){
        search = {
            where: {
                roomState_name: {
                    [Op.like]: `%${q}%`
                }
            }
        }
    }

    const roomStates = await paginate(RoomState, page, limit, search, order)


    // const roomState = await RoomState.findAll();
    // if( roomState.length == 0 ) {
    //     throw new GeneralError('No se encontraron status para habitaciones.')
    // }
    resSuccessful(res, roomStates);    
}

const getRoomState = async(req, res) => {
    const { id } = req.params;

    const roomStates = await RoomState.findByPk(id);
    if( !roomStates ) {
        throw new GeneralError('No se encontraró el status.')
    }
    resSuccessful(res, roomStates);    
}

const saveRoomState = async(req, res) => {
    const roomState = req.body;
    await RoomState.create(roomState)
    .catch( error => {
        throw new DBError( error, 'Error al guardar el estado')
    });
    
    resSuccessful(res, 'Estado creado correctamente')
}

const updateRoomState = async(req, res) => {
    const { id } = req.params
    const roomState = req.body;
    
    await RoomState.update(roomState, {where: {id: id}})
        .catch( error => {
            throw new DBError( error, 'Error al guardar el estado', 400)
        });

    resSuccessful(res, 'Estado actualizado correctamente')
}

const deleteRoomState = async(req, res) => {
    const {id} = req.params;
    
    const roomState = await RoomState.findByPk( id );
    if ( !roomState ) {throw new DBError(null, 'Estado no encontrado', 404 )}

    await RoomState.destroy({ where: { "id" : id} })
    .catch( error => { throw new DBError(error, 'Error al eliminar el estado', 400) })

    resSuccessful(res, 'Estado eliminado correctamente')
}

module.exports = {
    getRoomStates: catchedAsync(getRoomStates),
    getRoomState: catchedAsync(getRoomState),
    saveRoomState: catchedAsync(saveRoomState),
    updateRoomState: catchedAsync(updateRoomState),
    deleteRoomState: catchedAsync(deleteRoomState),
}