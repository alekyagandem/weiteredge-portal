const express = require('express')
const router = express.Router();
const reportController = require('../controllers/reportController')

router.get('/reportDetails/:username', reportController.ReportDetails)
router.post('/addReport', reportController.AddReport)
router.put('/updateReport/:username', reportController.updateReport )
module.exports =  router;