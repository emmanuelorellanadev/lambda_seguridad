const { Router } = require('express');
const { check } = require('express-validator')

const { roomStateController } = require('../controllers');
const { checkJWT, checkFields, requiredRole } = require('../middlewares');

const router = Router();

router.get('/', 
    [checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER'),
    checkFields],
roomStateController.getRoomStates);

router.get('/:id', 
    [checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER'),
    checkFields],
roomStateController.getRoomState);

router.post('/',
    [checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN'),
    check('roomState_name', 'The room state name is required.').not().isEmpty(),
    checkFields],
roomStateController.saveRoomState);

router.put('/:id', 
    [checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN'),
    check('roomState_name', 'The room state name is required.').not().isEmpty(),
    checkFields],
roomStateController.updateRoomState);

router.delete('/:id', 
[checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN'),
    checkFields],
roomStateController.deleteRoomState);

module.exports = router; 