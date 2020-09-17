var express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');
var crypto = require("crypto");
var User = require("../models/User");
var Resetuser = require("../models/Resetuser");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            user: 'tfebenas@gmail.com',
            pass: 'tfebenas123'
        }
  });
  
const mailOptions = {
    from: 'tfebenas@gmail.com', 
    to: 'benbock93@gmail.com',
    subject: 'Reset Password',
    html: '<a href="www.google.be">Clique sur ce lien</a>'
};

router.post("/resetpassword/", function (req, res) {
    const email = req.body.email;
    User.findOne({ email: email })
        .then((user) => {
            const now = new Date();
            const hash = crypto.randomBytes(20).toString('hex');
            Resetuser.create({time: now, hash, fk_user: user._id}, (err, resetuser) => {
                if (err) {
                    res.json({success: false, response: err});
                } else {
                    transporter.sendMail(mailOptions, function (err, info) {
                        if(err)
                            console.log(err)
                        else
                            console.log(info);
                    });
                    res.json({success: true, response: resetuser});
                }
            })
        })
        .catch((err) => {
            console.log(err);
            res.json({success: false, response: 'Votre email n existe pas!'});
        });
});


module.exports = router;
