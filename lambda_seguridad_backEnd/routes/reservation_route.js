const { Router } = require('express');

const { reservationController } = require('../controllers');
const { checkJWT, requiredRole, checkFields } = require('../middlewares');
const { check } = require('express-validator');

const router = Router();

router.get('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER')
], reservationController.getReservations);

router.get('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER')
], reservationController.getReservation);

router.post('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER'),
    check('reservation_date', 'Fecha no recibida.').not().isEmpty(),
    check('PersonId', 'Persona no recibida.').not().isEmpty(),
    check('ReservationStateId', 'Estado de reservacion no recibido.').not().isEmpty(),
    check('UserId', 'Usuario no recibido.').not().isEmpty(),
    checkFields
], reservationController.saveReservation);

router.put('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER'),
    check('PersonId', 'Persona no recibida.').not().isEmpty(),
    check('ReservationStateId', 'Estado de reservacion no recibido.').not().isEmpty(),
    check('UserId', 'Usuario no recibido.').not().isEmpty(),
    checkFields
], reservationController.updateReservation);

router.delete('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN'),
    // check('id', 'Reservación no recibida.').not().isEmpty(),

], reservationController.deleteReservation);

module.exports = router;