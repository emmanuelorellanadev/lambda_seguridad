const { Router } = require('express');

const { roomPriceController } = require('../controllers');


const router = Router();

router.get('/', roomPriceController.getRoomPrices);
router.get('/:id', roomPriceController.getRoomPrice);
router.post('/', roomPriceController.saveRoomPrice);
router.put('/:id', roomPriceController.updateRoomPrice);
router.delete('/:id', roomPriceController.deleteRoomPrice);

module.exports = router;