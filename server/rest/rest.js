const express = require('express');
const router = express.Router();
const groups = require('./groups/index');
const posts = require('./posts/index');


router.use('/groups', groups);
router.use('/posts', posts)

module.exports = router;
