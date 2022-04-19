const express = require('express');
const router = express.Router();
const GroupsController = require('./../../controllers/groups.controller');

router.get('/', GroupsController.getUsers)
router.post('/delete', GroupsController.deleteUser)

module.exports = router;
