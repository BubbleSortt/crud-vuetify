const express = require('express');
const router = express.Router();
const CouplesController = require('./../../controllers/couples.controller');

router.get('/', CouplesController.getCouples)
router.post('/delete', CouplesController.deleteCouple)
router.post('/create', CouplesController.createCouple)
router.post('/update', CouplesController.updateCouple)

module.exports = router;