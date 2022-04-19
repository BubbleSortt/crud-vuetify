const express = require('express');
const router = express.Router();
const GroupsController = require('./../../controllers/groups.controller');

router.get('/', GroupsController.getGroups)
router.post('/delete', GroupsController.deleteGroup)
router.post('/create', GroupsController.createGroup)
router.post('/update', GroupsController.updateGroup)

module.exports = router;
