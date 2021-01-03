var express = require('express');
var router = express.Router();

const userController = require("../controllers/userController");
const passport = require('../passport/passport');

/* GET users listing. */


router.post('/sign-in', passport.authenticate
    ('local',
        {
            successRedirect: '/',
            failureRedirect: '/users/sign-in',
            failureFlash: true
        })
);
router.get('/sign-in', userController.displayFormSignIn);

router.get('/sign-up', userController.displayFormSignUp);
router.post('/sign-up', userController.checkUserInDatabase);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
