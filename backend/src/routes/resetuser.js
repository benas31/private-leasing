var express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');
var crypto = require("crypto");
var User = require("../models/User");
var Resetuser = require("../models/Resetuser");
const bcrypt = require("bcrypt");



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            user: 'tfebenas@gmail.com',
            pass: 'tfebenas123'
        }
  });
  


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
                    const mailOptions = {
                        from: 'tfebenas@gmail.com',
                        to: email,
                        subject: 'Reset Password',
                        html: `<a href="http://localhost:3000/newpassword?id=${resetuser._id}&hash=${hash}">Clique sur ce lien</a>`
                    };
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

router.post("/newPassword/:id", function (req, res) {
    const _id = req.params.id;
    const hash = req.body.hash;
    const newPassword = req.body.newPassword;
    const oneday = 60 * 60 * 24 * 1000; // 24h in milliseconds
    Resetuser.findOne({ _id, hash })
      .then((data) => {
        const now = new Date();
        if (now - data.time > oneday) res.json({success: false, response: 'ID Expired'});
        else {
          bcrypt.hash(newPassword, 10, (e, hash) => {
            User.findOneAndUpdate( { _id: data.fk_user }, { password: hash }, {new: true}, (err, user) => {
              if (err) {
                res.json({success: false, response: err});
              } else {
                const u = user.toObject();
                delete u.password;
                res.json({success: true, response: u});
              }
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({success: false, response: 'Something went wrong!'});
      });
  });


module.exports = router;
