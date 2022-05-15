const express = require('express');
const router = express.Router();
const TeachersController = require('./../../controllers/teachers.controller');

router.get('/', TeachersController.getTeachers)
router.post('/delete', TeachersController.deleteTeacher)
router.post('/create', TeachersController.createTeacher)
router.post('/update', TeachersController.updateTeacher)
router.post('/search', TeachersController.search)
router.post('/sort', TeachersController.sort)

module.exports = router;
