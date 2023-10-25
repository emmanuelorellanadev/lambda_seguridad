const { Router } = require('express');
const { branchUserGet } = require('../controllers/branch_user_controller');

const router = Router();

router.get('/:id', branchUserGet);

module.exports = router;