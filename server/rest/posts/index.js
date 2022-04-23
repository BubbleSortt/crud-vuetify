const express = require('express');
const router = express.Router();
const PostsController = require('./../../controllers/posts.controller');

router.get('/', PostsController.getGroups)
router.post('/delete', PostsController.deleteGroup)
router.post('/create', PostsController.createGroup)
router.post('/update', PostsController.updateGroup)

module.exports = router;
