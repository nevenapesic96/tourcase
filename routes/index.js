var express = require('express');
var router = express.Router();
var User=require('../lib/User');

router.get('/', function(req, res, next) {
    res.render('index.ejs');
  });

  router.get('/dvaIgraca',function (req,res) {
    if(!req.session.user){
      res.render('index.ejs');
    }else{
    res.render('dvaIgraca.ejs',{user:req.session.user});
  }
  });

  router.get('/login',function (req,res) {
    if(!req.session.user)
      res.render('index.ejs');
    else
      res.render('jedanIgrac.ejs',{user:req.session.user});
  });

  router.post('/login',function(req,res) {
    if(!req.body){
      res.render('index.ejs');
    }else{
    var username=req.body.username;
    var password=req.body.password;
  
    if(!username){
        return res.status(404).send("niste uneli username");
      }
  
    User.findOne({username:username},function(err,user) {
      if(err){
        console.log(err);
        return res.status(500).send("greska");
      }
  
      if(!user){
        return res.status(404).send("pogresan username");
      }
  
    user.comparePassword(password,function (err,isMatch) {
        if(isMatch && isMatch == true){
          req.session.user=user;
        
          res.render('jedanIgrac.ejs',{user:req.session.user});
        }else{
          return res.status(401).send("Pogresna lozinka");
        }
      });
      
    })
  }
  });

  router.get('/logout', function (req,res) {
    req.session.destroy();
    res.render('index.ejs');
  })
  
  router.post('/register',function (req,res) {
    var username=req.body.username;
    var password=req.body.password;
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
  
    if(username=='' || lastname=='' || firstname=='' || password==''){
      return res.status(400).send("Nisu sva polja popunjena!");
    } else{
    var newuser=new User();
    newuser.username=username;
    newuser.lastname=lastname;
    newuser.password=password;
    newuser.firstname=firstname;
  
    newuser.save(function (err,savedUser) {
      if(err){
        console.log(err);
        return res.status(400).send("Greska! ");
      }
      req.session.user=username;
      res.render('index.ejs');
  
    })
    }
  })
  
  
  router.get('/jedanIgrac',function (req,res) {
  
    if(!req.session.user){
      res.render('index.ejs');
    }
  
    res.render('jedanIgrac.ejs',{user:req.session.user});
  })
  
  module.exports = router;
  

