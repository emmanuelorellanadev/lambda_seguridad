const { Op } = require("sequelize");

const { resSuccessful } = require("../response/resSucessful");
const { GeneralError, DBError } = require("../errors_handler/errors");
const catchedAsync = require('../errors_handler/catchedAsync');
const db_connection = require('../database/conf_database');
const Room = require('../models/room_model');
const RoomPrice_Room = require('../models/roomPrice_room_model');
const RoomPrice = require('../models/roomPrice_model');
const Room_Service = require('../models/room_service_model');
const Service = require('../models/service_model');
const { paginate } = require('../helpers/paginate');

const getRooms = async(req, res) => {

    const { q, page, limit } = req.query;
    let search = {};
    let order = [];

    if (q){
        search = {
            where: {
                [Op.or]:[
                    {room_number: { [Op.like]: `%${q}%` }},
                    {room_info: { [Op.like]: `%${q}%` }}
                ]
            }
        }
    }

    const rooms = await paginate(Room, page, limit, search, order);
        
    resSuccessful(res, rooms)

}

const getRoom = async(req, res) => {
    const { id } = req.params;

    const room = await Room.findByPk(id, {include: [Service, RoomPrice]});
    if ( !room ) throw new GeneralError('No se encontro información de la habitación.') 
    resSuccessful(res, room);
}

const saveRoom = async(req, res) => {
    const roomData = req.body;
    
    if ( !roomData ) throw new GeneralError('No se recibió información de la habitación.') 
        const prices = roomData.prices;
        const services = roomData.services;
    
        const t = await db_connection.transaction( async t => {

            const room = await Room.create(roomData, {transaction: t})
                .catch(error => {
                    throw new DBError(error, 'Error al guardar Habitación')
                })

            for ( service in services){
                await room.addService(services[service], {transaction: t})
                    .catch(error => {
                        throw new DBError(error, 'Error al guardar la relacion servicio - habitación')
                    })
            }

            for (price in prices){
                await RoomPrice_Room.create({RoomId: room.id, RoomPriceId: prices[price]}, {transaction: t})
                    .catch(error => {
                        throw new DBError(error, 'Error al guardar la relacion presio - habitación');
                    })
            }

            resSuccessful(res, 'Habitación guardada exitosamente.');
        });
}

const updateRoom = async(req, res) => {
    const roomData = req.body;
    const { id } = req.params;
    const priceIds_cli = roomData.prices;
    const serviceIds_cli = roomData.services;
    const serviceIds_db = [];
    const priceIds_db = [];
    const newServices = [];
    const deleteServices = [];
    const deletePrices = [];
    const newPrices = [];

    if ( !roomData ) throw new GeneralError('No recibió información de la habitación.') 

    const room = await Room.findByPk(id);

    if ( !room ) throw new GeneralError('No se encontró habitación'); 

    
    const t = await db_connection.transaction( async t => {


        const room_services = await Room_Service.findAll({where: {RoomId: id}})
            .catch( error => {throw new DBError(error, 'Error al buscar la relación room service')})
            
            //HANDLE SERVICES
            //select id of room services relationship and saved on array
            
        for (room_service in room_services){
                serviceIds_db.splice(room_service, 0, JSON.parse(JSON.stringify(room_services[room_service])).ServiceId);
            }

            //If services change
            if ( JSON.stringify(serviceIds_db) !== JSON.stringify(serviceIds_cli)){

                for(service in serviceIds_cli){
                    //fill data on newServices array
                    if (!serviceIds_db.includes(serviceIds_cli[service])){
                        newServices.push(serviceIds_cli[service])
                    }
                }
                
                //fill data on deleteServices
                for ( service in serviceIds_db){
                    if ( !serviceIds_cli.includes(serviceIds_db[service])){
                        deleteServices.push(serviceIds_db[service])
                    }
                }

                //save new services relation
                for ( service in newServices ){
                    await Room_Service.create({RoomId: id, ServiceId: newServices[service]})
                        .catch(error => {
                            throw new DBError(error, 'Error al guardar la relación room - service');
                        })
                }
                //delete services relation
                for ( service in deleteServices ){
                    await Room_Service.destroy({where: {RoomId: id, ServiceId: deleteServices[service]}})
                        .catch(error => {
                            throw new DBError(error, 'Error al eliminar la relación room - service');
                        })
                }
            }

        //HANDLE PRICES
        //Select the prices and saved on array
        const room_prices = await RoomPrice_Room.findAll({where: {RoomId: id}})
            .catch( error => {throw new DBError(error, 'Error al buscar la relación room - price')})

        for (room_price in room_prices){
            priceIds_db.splice(room_price, 0, JSON.parse(JSON.stringify(room_prices[room_price])).RoomPriceId);
        }

        //If Price change 
        if ( JSON.stringify(priceIds_db) !== JSON.stringify(priceIds_cli)){
            for(price in priceIds_cli){
                //delete no changes of room_prices array
                if (!serviceIds_db.includes(priceIds_cli[price])){
                    newPrices.push(priceIds_cli[price])
                }
            }
            
            // search on databaseArray every client element in clientArray
            // fill data on deleteServices
            for ( price in priceIds_db){
                if ( !priceIds_cli.includes(priceIds_db[price])){
                    deletePrices.push(priceIds_db[price])
                }
            }

            //save new price relation
            // console.log(newPrices)
            for ( price in newPrices ){
                await RoomPrice_Room.create({RoomId: id, RoomPriceId: newPrices[price]})
                    .catch(error => {
                        throw new DBError(error, 'Error al guardar la relación room - price');
                    })
            }
            //delete services
            for ( price in deletePrices ){
                await RoomPrice_Room.destroy({where: {RoomId: id, RoomPriceId: deletePrices[price]}})
                    .catch(error => {
                        throw new DBError(error, 'Error al eliminar la relación room - price');
                    })
            }
        }

        await Room.update(roomData, {where: {id: id}},  {transaction: t})
            .catch(error => {
                throw new DBError(error, 'Error al actualizar Habitación')
            })

        resSuccessful(res, 'Habitación actualizada exitosamente.');
    });
}

const deleteRoom = async(req, res) => {
    const { id } = req.params;

    const room = await Room.findByPk( id );

    if ( !room ) throw new GeneralError('Error: habitación no encontrada.');

    await Room.destroy({where: {id: id}})
        .catch(error => { throw new DBError(error, 'Error al eliminar la habitación') })

    resSuccessful(res, 'Habitación eliminada correctamente.');
}

module.exports = {
    getRooms: catchedAsync(getRooms),
    getRoom: catchedAsync(getRoom),
    saveRoom: catchedAsync(saveRoom),
    updateRoom: catchedAsync(updateRoom),
    deleteRoom: catchedAsync(deleteRoom),
}
