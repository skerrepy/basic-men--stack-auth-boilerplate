const express = require('express');
const router = express.Router()
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
router.get('/',(req,res)=>{
    res.render('test',{title:'test'});
})
router.post('/register',(req,res)=>{
    const {username,password}=req.body;
    User.findOne({username:username}).then(user => {
        if(user){
            //user exists
            console.log("exists");
        }else{
            const newUser = new User({
                username,
                password
            });
            //Hash password
            bcrypt.genSalt(10,(err,salt)=>
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err;
                //set password to hashed password
                newUser.password = hash;
                //save user
                newUser.save()
                .then(user =>{
                    console.log("Success")
                    res.redirect('/')
                })
                .catch(err => console.log(err))

            }))
        }
    })
})
router.get('/login',(req,res)=>{
    res.render('login');
})
router.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}
))
module.exports = router;