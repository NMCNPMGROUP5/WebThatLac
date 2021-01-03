const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

const nodemailerService = require("../models/service/nodemailerService");
const userService = require('../models/service/userService');

const saltRounds = 10;
let count;
let email;
let gobalOTP = "";

exports.sendmail = async (req, res, next) => {
    const account = userService.getTemporaryAccount(req, res, next);
    const OTP = await new Promise((resolve, reject) => {
        bcrypt.hash(account.name, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
    console.log("sendmail");
    console.log(account);
    const mailer = await nodemailerService.configEmailToSend(account,OTP);
    const smtpTransport = (await mailer).smtpTransport;
    const mail = (await mailer).mail;

    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error);
            res.redirect("/users/sign-up");
        } else {
            //console.log("Message sent: " + response.message);
            count = 3;
            res.redirect("/mail/verify");
        }
        smtpTransport.close();
    });
};

exports.displayFormAuth = async (req, res, next) => {
    res.render("verify", { count });
}

exports.checkFormAuth = async (req, res, next) => {

    let account = userService.getTemporaryAccount(req, res, next);
    console.log(account);
    if (account === "abc") {
        account = await userService.findOne("email", email);
        console.log("CHECK FORM AUTH");
        console.log(account);
        let checkOTP = await bcrypt.compare(account.name, req.body.maxacnhan);
        if (count === 1) {
            res.redirect("/mail/forgetpass");
        }
        if (checkOTP) {
            gobalOTP = req.body.maxacnhan;
            res.redirect("/mail/changepassword");
        }
        else {
            count = count - 1;
            res.render("verify", { count });
        }
    }
    else {
        let checkOTP = await bcrypt.compare(account.name, req.body.maxacnhan);
        if (count === 1) {
            userService.setTemporaryAccount(req, res, next);
            res.redirect("/users/sign-up");
        }
        if (checkOTP) {
            await userService.addNewUser(account);
            userService.setTemporaryAccount(req, res, next);
            res.redirect("/users/sign-in");
        }
        else {
            count = count - 1;
            res.render("verify", { count });
        }
    }
}


exports.displayFormInputEmail = async (req, res, next) => {
    res.render("enteremail");
}

exports.checkEmail = async (req, res, next) => {

    const account = await userService.findOne("email", req.body.email);
    email = req.body.email;
    console.log(account);
    if (account != null) {
        const OTP = await new Promise((resolve, reject) => {
            bcrypt.hash(account.name, saltRounds, function (err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        })
        console.log("sendmail");
        console.log(account);
        const mailer = await nodemailerService.configEmailToSend(account,OTP);
        const smtpTransport = (await mailer).smtpTransport;
        const mail = (await mailer).mail;

        smtpTransport.sendMail(mail, function (error, response) {
            if (error) {
                console.log(error);
                res.redirect("/mail/forgetpass");
            } else {
                //console.log("Message sent: " + response.message);
                count = 3;
                res.redirect("/mail/verify");
            }
            smtpTransport.close();
        });
    }
    else
    {
        res.render("enteremail",{notExistEmail: true});
    }
}


exports.displayFormChangePassword = async (req, res, next) => {
    if (gobalOTP != "") {
        gobalOTP = "";
        res.render("formchangepassword");
    }
    else {
        res.redirect("/error");
    }
}

exports.changePassword = async (req, res, next) => {
    const checkUser = await userService.findOne("name", req.body.name);
    if (checkUser != null) {
        res.render("formchangepassword", { isFailUser: true })
    }
    const pass = await new Promise((resolve, reject) => {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
    const update = {
        password: pass,
    }
    await userService.UpdatePassword("email", email, update);

    res.redirect("/users/sign-in");

}