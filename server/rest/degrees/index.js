const express = require('express');
const router = express.Router();
const DegreesController = require('./../../controllers/degrees.controller');

router.get('/', DegreesController.getDegrees)
router.post('/delete', DegreesController.deleteDegree)
router.post('/create', DegreesController.createDegree)
router.post('/update', DegreesController.updateDegree)
router.post('/search', DegreesController.search)
router.post('/sort', DegreesController.sort)

module.exports = router;
