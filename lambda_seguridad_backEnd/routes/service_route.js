const { Router } = require('express');

const { serviceController } = require('../controllers');
const { checkJWT, requiredRole, checkFields } = require('../middlewares');
const { check } = require('express-validator');

const router = Router();

router.get('/', 
    [checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER'),
    checkFields],
serviceController.getServices);

router.get('/:id', 
    [checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER'),
    checkFields],
serviceController.getService);

router.post('/', 
    [checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN'),
    check('service_name', 'The service name is required').not().isEmpty(),
    check('service_status', 'The service status is required').not().isEmpty(),
    checkFields],
serviceController.saveService);

router.put('/:id', 
    [checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN'),
    check('service_name', 'The service name is required').not().isEmpty(),
    check('service_status', 'The service status is required').not().isEmpty(),
    checkFields],
serviceController.updateService);

router.delete('/:id', serviceController.deleteService);

module.exports = router; 