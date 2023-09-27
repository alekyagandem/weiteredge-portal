const express = require('express')
const router = express.Router();
const timeManagementController = require('../controllers/userController')

router.post('/checkIn', timeManagementController.checkIn);
router.post('/breakStart/:user_id', timeManagementController.breakStartAndEnd)
router.put('/checkOut/:user_id', timeManagementController.checkOut)

module.exports = router;