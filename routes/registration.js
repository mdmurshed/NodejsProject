const express = require('express')
const router = express.Router()
const mongo = require('mongoose')
const ensureAuth = require('../middleware/auth')

const register = require('../models/register')
const Story = require('../models/Story')
const transporter = require("../helpers/private")

router.get('/', (req, res) => {

    res.render('registration', {
        layout: 'login'
    })
})
router.post('/', (req, res) => {
    var newUser = new register()
    console.log(req.body.fullname)
    register.find({ fullname: req.body.fullname }, (err, docs) => {
        if (docs.length == 0) {
            // console.log(req.body)
            if (req.body.password1 == req.body.password2) {
                var mailOptions = {
                    from: 'mdmurshedulhoque1111@gmail.com',
                    to: req.body.email,
                    subject: 'Account info:',
                    text: 'User name: ' + req.body.fullname + " \nUser Email: " + req.body.email + " ,\n Password: " + req.body.password1
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: Done,' + info.response);
                    }
                  });

                newUser.fullname = req.body.fullname;
                newUser.email = req.body.email;
                newUser.password = req.body.password1;
                newUser.save((err, doc) => {
                    if (!err) {
                        res.redirect('/')
                    }
                    else {
                        console.log(err);
                    }
                })

            } else {
                res.redirect('register')
            }
        } else {
            res.render('registration', {
                layout: 'login'
            })
        }
    })

})
router.get("/signin", (req, res) => {
    res.render('signin', {
        layout: 'login'
    });
})
router.post("/signin", (req, res) => {
    console.log(req.ok);
    var newUser = new register()
    console.log(req.body.fullname)
    register.find({ fullname: req.body.fullname }, (err, docs) => {
        console.log(docs)
        console.log(docs._id)
    })
})

module.exports = router