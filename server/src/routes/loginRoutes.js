const express = require('express')
const router = express.Router();
const loginController = require('../controllers/loginController')

router.post('/login', loginController.userLogin);
router.post('/signup', loginController.userSignUp);
router.get('/user_details/:username', loginController.userDetails);
// router.post('/changePassword/:username', loginController.changePassword)
module.exports = router;