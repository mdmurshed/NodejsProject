const express = require('express')
const router = express.Router()
const mongo = require('mongoose')
const ensureAuth = require('../middleware/auth')

const register = require('../models/register')
const Story = require('../models/Story')

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
            res.render('register', {
                NameError: "Same name try diffrent name."
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