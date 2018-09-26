const express = require ('express');
const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');
const passport = require ('passport')
const router = express.Router();
const multer = require ('multer');
const shoes = require ('../models/shoes');

// const passport = require('../config/passport')

const uuid = require ('uuid');
require ('../models/User')
const User = mongoose.model('users');


//User login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});

//User Register Route
router.get('/register', (req, res) => {
    res.render('users/register');
});

// login from post
router.post('/login', (req, res, next) => {
  
  passport.authenticate('local', {
    successRedirect:'/shoes',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
 
});

//Register form Post
router.post('/register', (req, res) => {
  let errors = [];

  if(req.body.password != req.body.password2){
    errors.push({text: 'passwords do not match'});
  }

  if(req.body.password.length < 5){
    errors.push({text:'password must be at least 5 characters'})
  }
  if(errors.length > 0){
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2,
    });
  }else {
    User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          console.log(user)
         
          errors.push({text: 'email already used'});
          res.render('users/register', {
            errors: errors
          });
          
        }else{
        // req.body.password = hash;
        const newUser = new User( {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
         });
       
      
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
  
        if(err) throw err;
        newUser.password = hash
        newUser.save()
          .then(user => {
            req.flash('success_msg', 'You are now registered and can log in');
            res.redirect('/users/login');
          })
          .catch(err => {
            console.log(err);
            return;
          })
        });
      });
    }
  });
}
});

// logout User
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You are logged out');
  res.redirect( '/users/login')

})

module.exports = router