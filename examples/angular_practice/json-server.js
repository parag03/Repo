var jsonServer = require('json-server')
var express=require('express')
var router = express.Router();
var server = jsonServer.create()

var middlewares = jsonServer.defaults()

//server.use(middlewares)
server.get('/',function(req,res){
  console.log("res");
  res.sendFile(__dirname+"/myform.html");
})
server.get('/user', function (req, res) {
  res.send(req.query);
})
var router1= jsonServer.router('db.json')
server.use(router1)

server.listen(8080, function () {
  console.log('JSON Server is running')
})
