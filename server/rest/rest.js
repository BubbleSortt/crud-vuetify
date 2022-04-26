const express = require('express');
const router = express.Router();
const groups = require('./groups/index');
const posts = require('./posts/index');
const lessons = require('./lessons/index');
const degrees = require('./degrees/index');


router.use('/groups', groups);
router.use('/posts', posts);
router.use('/lessons', lessons);
router.use('/degrees', degrees);

module.exports = router;
