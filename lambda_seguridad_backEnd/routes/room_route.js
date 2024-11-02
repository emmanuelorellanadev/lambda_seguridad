const { Router } = require('express');

const { roomController } = require('../controllers');
const { checkJWT, requiredRole, checkFields } = require('../middlewares');
const { check } = require('express-validator');
// const { checkFields, checkJWT, requiredRole } = require('../middlewares');

const route = Router();

route.get('/', 
    [checkJWT,
    requiredRole('ROLE_ADMINSYS'),
    checkFields],
    roomController.getRooms );

route.get('/:id',
    [checkJWT,
    requiredRole('ROLE_ADMINSYS'),
    checkFields],
roomController.getRoom );

route.post('/', 
    [checkJWT,
    requiredRole('ROLE_ADMINSYS'),
    check('room_number', 'The room number is required.').not().isEmpty(),
    check('room_info', 'The room info is required.').not().isEmpty(),
    check('room_beds', 'The numbers of beds are required.').not().isEmpty(),
    check('room_people', 'The number of people is required.').not().isEmpty(),
    check('RoomStateId', 'The room state is required.').not().isEmpty(),
    check('BranchId', 'The branch is required.').not().isEmpty(),
    checkFields], 
roomController.saveRoom );

route.put('/:id',
    [checkJWT,
    requiredRole('ROLE_ADMINSYS'),
    check('room_number', 'The room number is required.').not().isEmpty(),
    check('room_info', 'The room info is required.').not().isEmpty(),
    check('room_beds', 'The numbers of beds are required.').not().isEmpty(),
    check('room_people', 'The number of people is required.').not().isEmpty(),
    check('RoomStateId', 'The room state is required.').not().isEmpty(),
    check('BranchId', 'The branch is required.').not().isEmpty(),
    checkFields],
roomController.updateRoom );

route.delete('/:id', roomController.deleteRoom );

module.exports = route;
