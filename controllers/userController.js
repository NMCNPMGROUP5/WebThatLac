const userService = require('../models/service/userService');

exports.displayFormSignIn = (req, res, next) => {
    let message = "";
    message = req.flash('error');
    console.log("req.query.to");
    console.log(req.body);
    if (message != "") {
        res.render("signin", { message, notify: 'block' });
    }
    else {
        res.render("signin", { notify: 'none' });
    }
}


exports.displayFormSignUp = (req, res, next) => {

    res.render("signup");
}

exports.checkUserInDatabase = async (req, res, next) => {
    console.log("USER CONTROLLER")

    console.log("req.query.to");
    console.log(req.body);


    const check = await userService.checkUserRegister(req, res, next);


    console.log('registered');
    console.log(check);

    if (check.isFailUser == true || check.isFailEmail == true || check.valid == false) {
        if (check.valid == false) {
            check.valid = true;
        }
        else {
            check.valid = false;
        }
        res.render("signup", {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            tel: req.body.tel,
            address: req.body.address,
            isFailUser: check.isFailUser,
            isFailEmail: check.isFailEmail,
            notExistEmail: check.valid
        });
    }
    else
    {
        await userService.saveTemporaryAccount(req, res, next);
        console.log("SEND MAIL");
        res.redirect("/mail/send");
    }
}