const { Router } = require('express');
const { check } = require('express-validator')

const { getRole, createRole, updateRole } = require('../controllers/role_controller');
const { checkFields } = require('../middlewares/check_fields');
const { checkJWT } = require('../middlewares/check-jwt');
const { requiredRole } = require('../middlewares/checkRole');

const route = Router();

route.get('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER')
], getRole)

route.post('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS'),
    check('role_name', 'The role is required').not().isEmpty(),
    check('role_status', 'the status is required').not().isEmpty(),
    checkFields
], createRole);

route.put('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS',),
    check('role_name', 'The role is required').not().isEmpty(),
    check('role_status', 'the status is required').not().isEmpty(),
    checkFields
],
 updateRole)

module.exports = route; 
