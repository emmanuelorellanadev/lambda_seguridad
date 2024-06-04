const { Router } = require('express');
const { check } = require('express-validator')

const { checkFields } = require('../middlewares/check_fields');
const { checkJWT } = require('../middlewares/check-jwt');
const { requiredRole } = require('../middlewares/checkRole');
const { roleController } = require('../controllers');

const route = Router();

route.get('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER')
], roleController.getRoles)

route.get('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER')
], roleController.getRole);

route.post('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS'),
    check('role_name', 'The role is required').not().isEmpty(),
    check('role_state', 'the state is required').not().isEmpty(),
    checkFields
], roleController.saveRole);

route.put('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS',),
    check('role_name', 'The role is required').not().isEmpty(),
    check('role_state', 'the status is required').not().isEmpty(),
    checkFields
],
 roleController.updateRole)

 route.delete('/:id', roleController.deleteRole)

module.exports = route; 
