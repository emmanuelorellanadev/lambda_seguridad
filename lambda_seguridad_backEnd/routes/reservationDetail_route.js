const { Router } = require('express');
const { reservationDetailController } = require('../controllers');

const router = Router();

router.get('/', reservationDetailController.getReservationDetails);

router.get('/:id', reservationDetailController.getReservationDetail);

router.post('/', reservationDetailController.saveReservationDetail);

router.put('/:id', reservationDetailController.updateReservationDetail);

router.delete('/:id', reservationDetailController.deleteReservationDetail);

module.exports = router;