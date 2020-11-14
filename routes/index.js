const { Router } = require('express')

const express = require('express')
const router = express.Router()
const {ensureAuth,ensureGuest} = require('../middleware/auth')

const Story = require('../models/Story') 

//@desc LogIn/Landing page
//@route GET/

router.get('/' ,ensureGuest, (req,res)=>{
    res.render('login',{
        layout:'login',
    })
})

//@desc Deshboard
//@route GET/Dashboard
router.get('/dashboard',ensureAuth,async(req,res)=>{
    try{
        const stories =await Story.find({user:req.user.id}).lean()
        // console.log(stories);
        // console.log(req.user)
        res.render('Dashboard',{
            name:req.user.displayName, 
            stories
        })
    }catch(err){
        console.error(err)
        res.render('error/500')
    }

})



module.exports = router
