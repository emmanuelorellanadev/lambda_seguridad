const { Router } = require('express');
const { reservationStateController } = require('../controllers');
const { check } = require('express-validator');
const { checkJWT, requiredRole, checkFields } = require('../middlewares');

const router = Router();

router.get('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER')
], reservationStateController.getReservationStates);

router.get('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER')
],  reservationStateController.getReservationState);

router.post('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN'),
    check('reservationState_name', 'El nombre del estado de la reservación es requerido').not().isEmpty(),
    checkFields
],  reservationStateController.saveReservationState);

router.put('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN'),
    check('reservationState_name', 'El nombre del estado de la reservación es requerido').not().isEmpty(),
    checkFields
], reservationStateController.updateReservationState);

router.delete('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN'),
], reservationStateController.deleteReservationState);

module.exports = router;