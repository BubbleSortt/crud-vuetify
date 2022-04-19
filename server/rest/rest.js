const express = require('express');
const router = express.Router();
const groups = require('./groups/index');


router.use('/groups', groups);

module.exports = router;
