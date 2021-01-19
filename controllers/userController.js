const userService = require('../models/service/userService');
const postService = require('../models/service/postService');

exports.displayFormSignIn = async (req, res, next) => {
    let message = "";
    message = req.flash('error');
    console.log("req.query.to");
    console.log(req.body);

    const postType = await postService.getPostTypes();

    if (message != "") {
        res.render("signin", { message, notify: 'block', postType });
    }
    else {
        res.render("signin", { notify: 'none', postType });
    }
}


exports.displayFormSignUp = async (req, res, next) => {
    const postType = await postService.getPostTypes();
    res.render("signup", {postType});
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
            username: req.body.username,
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