const express = require('express');
const router = express.Router();
const groups = require('./groups/index');
const posts = require('./posts/index');
const lessons = require('./lessons/index');
const degrees = require('./degrees/index');
const couples = require('./couples/index');
const teachers = require('./teachers/index');


router.use('/groups', groups);
router.use('/posts', posts);
router.use('/lessons', lessons);
router.use('/degrees', degrees);
router.use('/couples', couples);
router.use('/teachers', teachers);

module.exports = router;
