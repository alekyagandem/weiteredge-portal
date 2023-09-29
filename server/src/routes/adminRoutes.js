const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/getAllDetails", adminController.getAllDetails);
router.get('/getEmployeeDetails/:user_id', adminController.getEmployeeDetails)
module.exports = router;
