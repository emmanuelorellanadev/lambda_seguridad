const catchedAsync = require("../errors_handler/catchedAsync");
const { paginate } = require("../helpers/paginate");
const RoomPrice = require("../models/roomPrice_model");
const { resSuccessful } = require("../response/resSucessful");

const getRoomPrices =  async (req, res) => {
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
    const prices = await paginate(RoomPrice, page, limit, search, order)

    resSuccessful(res, prices)
}

const getRoomPrice =  async (req, res) => {
    const { id } = req.params;

    const roomPrice = await RoomPrice.findByPk(id);

    resSuccessful(res, roomPrice);
}

const saveRoomPrice =  async (req, res) => {
    const price = req.body;

    await RoomPrice.create(price);

    resSuccessful(res, price);
}

const updateRoomPrice =  async (req, res) => {
    const roomPrice = req.body;
    const { id } = req.params

    await RoomPrice.update(roomPrice, {where: {id: id}});

    resSuccessful(res, 'Precio actulaizado correctamente.');
}

const deleteRoomPrice =  async (req, res) => {
    const { id } = req.params

    await RoomPrice.destroy({where: {id: id}})
        .then( () => resSuccessful(res, "Precio eliminado exitosamente."))
    
}

module.exports = {
    getRoomPrices: catchedAsync(getRoomPrices),
    getRoomPrice: catchedAsync(getRoomPrice),
    saveRoomPrice: catchedAsync(saveRoomPrice),
    updateRoomPrice: catchedAsync(updateRoomPrice),
    deleteRoomPrice: catchedAsync(deleteRoomPrice),
}