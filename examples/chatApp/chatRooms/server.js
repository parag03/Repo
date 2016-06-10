var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(8080);
app.get('/namespace', function(req, res){
  res.sendfile('index.html');
});
var usernames={};
var rooms=['wipro','stackroute'];
var ns=io.of('/namespace');
ns.on('connection',function(socket){
  socket.on('adduser',function(username){
        usernames[username]=username;
        socket.username=username;
        socket.room='wipro';
        socket.join('wipro');
        socket.emit('updatechat',"Server:","You have been added to "+socket.room);
        socket.broadcast.to('wipro').emit('updatechat',"Server: ",username+" has joined the "+socket.room);


  });
  socket.on('chat message',function(msg){
    console.log("in chat"+socket.room);
    ns.to(socket.room).emit('updatechat',socket.username+": ",msg);

  })
  socket.on('switchroom',function(newroom){

    socket.leave(socket.room);
    socket.join(newroom);

    console.log(newroom);
    socket.emit('updatechat',"Server:","You have been added to "+newroom);
    socket.broadcast.to(socket.room).emit('updatechat',"Server:",socket.username+" has left the room");
    socket.room=newroom;
    socket.broadcast.to(newroom).emit('updatechat',"Sever:",socket.username+" has joined the "+newroom);

  })
})
