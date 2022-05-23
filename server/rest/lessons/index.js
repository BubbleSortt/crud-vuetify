const express = require('express');
const router = express.Router();
const GroupsController = require('./../../controllers/lessons.controller');

router.get('/', GroupsController.getLessons)
router.post('/delete', GroupsController.deleteLesson)
router.post('/create', GroupsController.createLesson)
router.post('/update', GroupsController.updateLesson)
router.post('/search', GroupsController.search)
router.post('/sort', GroupsController.sort)

module.exports = router;
