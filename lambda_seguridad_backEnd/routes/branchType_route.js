const { Router } = require('express');
const { check } = require('express-validator')

const { getBranchTypes, getBranchType, createBranchType, updateBranchType } = require('../controllers/branchType_controller');
const { checkFields } = require('../middlewares/check_fields');
const { checkJWT } = require('../middlewares/check-jwt');
const { requiredRole } = require('../middlewares/checkRole');

const route = Router();

route.get('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS')
], getBranchTypes)

route.get('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS')
], getBranchType)

route.post('/', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS'),
    check('branchType_name', 'The type branch is required').not().isEmpty(),
    check('branchType_status', 'the status branch is required').not().isEmpty(),
    checkFields
], createBranchType);

route.put('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS'),
    check('branchType_name', 'The type branch is required').not().isEmpty(),
    check('branchType_status', 'the status branch is required').not().isEmpty(),
    checkFields
], updateBranchType)

module.exports = route;
