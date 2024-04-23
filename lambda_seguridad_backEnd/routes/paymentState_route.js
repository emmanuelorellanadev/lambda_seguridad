const { Router } = require('express');

const { paymentStateController } = require('../controllers');
const { checkJWT, requiredRole, checkFields } = require('../middlewares');
const { check } = require('express-validator');

const router = Router();

router.get('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER'),
    checkFields
], paymentStateController.getPaymentStates);

router.get('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER'),
    checkFields
], paymentStateController.getPaymentState);

router.post('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN'),
    check('paymentState_name', 'Payment state name is required').not().isEmpty(),
    checkFields
], paymentStateController.savePaymentState);

router.put('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN'),
    check('paymentState_name', 'Payment state name is required').not().isEmpty(),
    check('paymentState', 'Payment state is required').not().isEmpty(),
    checkFields
], paymentStateController.updatePaymentState);


router.delete('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS'),
], paymentStateController.deletePaymentState);

module.exports = router; 