const { Router } = require('express');

const { roomServiceController } = require('../controllers');

const router = Router();

router.get('/', roomServiceController.getRoomServices);

module.exports = router; 