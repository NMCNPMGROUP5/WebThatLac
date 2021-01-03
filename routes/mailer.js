var express = require('express');
var router = express.Router();
var mailerController = require('../controllers/mailerController');

router.get('/send', mailerController.sendmail);

router.get('/verify', mailerController.displayFormAuth);

router.post('/verify', mailerController.checkFormAuth);

router.get('/forgetpass',mailerController.displayFormInputEmail);

router.post('/forgetpass',mailerController.checkEmail);

router.get('/changepassword',mailerController.displayFormChangePassword);
router.post('/changepassword',mailerController.changePassword);



module.exports = router;