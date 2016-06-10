var express = require('express');
var router = express.Router();

var user= {};

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  user.fname = req.body.fname;
  user.lname = req.body.lname;
  user.age = req.body.age;
  // res.end();
  res.render('users',{fname:req.body.fname,lname:req.body.lname,age:req.body.age});
});
router.get('/', function(req,res,next) {
  console.log(user);
  res.render('users',user);
 });
// router.get('/',function(req,res,next)
// {
//   console.log("in get");
//   res.render('users',user);
// });
module.exports = router;
