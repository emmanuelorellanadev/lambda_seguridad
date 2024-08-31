const { Router } = require('express');
const { roomPriceRoomController } = require('../controllers');

const router = Router();

router.get('/', roomPriceRoomController.getRoomPrice_room);

module.exports = router;