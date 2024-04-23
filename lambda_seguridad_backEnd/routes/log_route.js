const { Router } = require('express');

const { logController } = require('../controllers');

const router = Router();

router.get('/', logController.getLog);

module.exports = router;