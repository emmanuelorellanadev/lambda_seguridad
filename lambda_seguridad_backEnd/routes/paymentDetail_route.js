const { Router } = require('express');
const { paymentDetailController } = require('../controllers');

const router = Router();

router.get('/', paymentDetailController.getPaymentDetail)

module.exports = router;