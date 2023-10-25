const { Router } = require('express');
const { usersGetByBranch } = require('../controllers/users_by_branch_controller');

const router = Router();

router.get('/:id', usersGetByBranch);
router.get('/', usersGetByBranch);

module.exports = router;
