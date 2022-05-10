const express = require('express');
const router = express.Router();
const QueryConsoleController = require('./../../controllers/queryConsole.controller')

router.post('/', QueryConsoleController.query)


module.exports = router;
