const { Router } = require('express');
const { check } = require('express-validator')

const { branchTypeController } = require('../controllers');
const { checkFields } = require('../middlewares/check_fields');
const { checkJWT } = require('../middlewares/check-jwt');
const { requiredRole } = require('../middlewares/checkRole');

const route = Router();

route.get('/', [
    // checkJWT,
    // requiredRole('ROLE_ADMINSYS')
], branchTypeController.getBranchTypes)

route.get('/:id', [
    // checkJWT,
    // requiredRole('ROLE_ADMINSYS')
], branchTypeController.getBranchType)

route.post('/', [
    // checkJWT,
    // requiredRole('ROLE_ADMINSYS'),
    check('branchType_name', 'The type branch is required').not().isEmpty(),
    check('branchType_state', 'The state branch is required').not().isEmpty(),
    checkFields
], branchTypeController.saveBranchType);

route.put('/:id', [
    // checkJWT,
    // requiredRole('ROLE_ADMINSYS'),
    check('branchType_name', 'The type branch is required').not().isEmpty(),
    check('branchType_state', 'The state branch is required').not().isEmpty(),
    checkFields
], branchTypeController.updateBranchType);

route.delete('/:id', branchTypeController.deleteBranchType)

module.exports = route;
