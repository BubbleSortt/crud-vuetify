const express = require('express');
const router = express.Router();
const CapacitiesController = require('./../../controllers/capacities.controller');

router.get('/', CapacitiesController.getCapacities)
router.post('/delete', CapacitiesController.deleteCapacity)
router.post('/create', CapacitiesController.createCapacity)
router.post('/update', CapacitiesController.updateCapacity)

module.exports = router;
