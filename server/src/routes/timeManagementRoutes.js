const express = require('express')
const router = express.Router();
const timeManagementController = require('../controllers/userController')

router.post('/checkIn', timeManagementController.checkIn);

module.exports = router;