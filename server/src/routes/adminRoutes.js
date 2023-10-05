const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/getAllDetails", adminController.getAllDetails);
router.get('/getEmployeeDetails/:user_id', adminController.getEmployeeDetails)
router.get('/getUserbyId/:user_id', adminController.getbyuserId)
module.exports = router;
