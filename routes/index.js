var express = require('express');
var router = express.Router();
var User=require('../lib/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/login',function(req,res) {
  var username=req.body.username;
  var password=req.body.password;

  User.findOne({username:username},function(err,user) {
    if(err){
      console.log(err);
      return res.status(500).send();
    }

    if(!user){
      return res.status(404).send();
    }

  user.comparePassword(password,function (err,isMatch) {
      if(isMatch && isMatch == true){
        req.session.user=user;
        return res.status(200).send();
      }else{
        return res.status(401).send();
      }
    });
    
  })
})


router.get('/logout', function (req,res) {
  req.session.destroy();
  res.status(200).send();
})

router.post('/register',function (req,res) {
  var username=req.body.username;
  var password=req.body.password;
  var firstname=req.body.firstname;
  var lastname=req.body.lastname;

  var newuser=new User();
  newuser.username=username;
  newuser.lastname=lastname;
  newuser.password=password;
  newuser.firstname=firstname;

  newuser.save(function (err,savedUser) {
    if(err){
      console.log(err);
      return res.status(400).send();
    }

    return res.status(200).send();
  })
})


router.get('/dashboard',function (req,res) {
  console.log(req.session.user); 

  if(!req.session.user){
    return res.status(401).send('Nisi ulogovan');
  }

  return res.status(200).send('Ulogovan si');
})

module.exports = router;
