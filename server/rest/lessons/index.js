const express = require('express');
const router = express.Router();
const GroupsController = require('./../../controllers/lessons.controller');

router.get('/', GroupsController.getLessons)
router.post('/delete', GroupsController.deleteLesson)
router.post('/create', GroupsController.createLesson)
router.post('/update', GroupsController.updateLesson)

module.exports = router;
