const { Router } = require('express');

const { paymentController } = require('../controllers');
const { checkJWT, requiredRole, checkFields } = require('../middlewares');

const router = Router();

router.get('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER'),
    checkFields
], paymentController.getPayments);

router.get('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER'),
    checkFields
], paymentController.getPayment);

router.post('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER'),
    checkFields
], paymentController.savePayment);

router.put('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER'),
    checkFields
], paymentController.updatePayment);

router.delete('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS'),
    checkFields
], paymentController.deletePayment);

module.exports = router;