const { Router } = require('express');
const { branchUserController } = require('../controllers');

const router = Router();

router.get('/:id', branchUserController.branchUserController);

module.exports = router;