const { Router } = require('express');
const { personController } = require('../controllers/');

const router = Router();

router.get('/', personController.getPeople);

router.get('/:id', personController.getPerson);

router.post('/', personController.savePerson);

router.put('/:id', personController.updatePerson);

router.delete('/:id', personController.deletePerson);

module.exports = router;