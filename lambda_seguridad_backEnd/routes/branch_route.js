const { Router } = require('express');
const { check } = require('express-validator');

const { checkFields } = require('../middlewares/check_fields');
const { checkJWT } = require('../middlewares/check-jwt');
const { requiredRole } = require('../middlewares/checkRole');
const { branchController } = require('../controllers');

const route = Router();

route.get('/', [
    // checkJWT,
    // requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER' )
], 
branchController.getBranches);

route.get('/:id', [
    // checkJWT,
    // requiredRole('ROLE_ADMINSYS', 'ROLE_ADMIN', 'ROLE_SUPERUSER', 'ROLE_USER')
], 
branchController.getBranch);

route.post('/', [
    // checkJWT,
    // requiredRole('ROLE_ADMINSYS'),
    check('branch_name', 'The branch name is required').not().isEmpty(),
    check('branch_phone', 'The branch phone is required').not().isEmpty(),
    check('branch_address', 'The branch address is required').not().isEmpty(),
    check('branch_state', 'The branch state is required').not().isEmpty(),
    check('CompanyId', 'The company is required').not().isEmpty(),
    check('BranchTypeId', 'The branchTpype is required').not().isEmpty(),
    checkFields,
], branchController.saveBranch)

route.put('/:id', [
    // checkJWT,
    // requiredRole('ROLE_ADMINSYS'),
    check('branch_name', 'The branch name is required').not().isEmpty(),
    check('branch_phone', 'The branch phone is required').not().isEmpty(),
    check('branch_address', 'The branch address is required').not().isEmpty(),
    check('CompanyId', 'The company is required').not().isEmpty(),
    check('BranchTypeId', 'The branchType is required').not().isEmpty(),
    checkFields,
], branchController.updateBranch);

route.delete('/:id', [
    checkJWT,
    requiredRole('ROLE_ADMINSYS'),
], branchController.deleteBranch);

module.exports = route;