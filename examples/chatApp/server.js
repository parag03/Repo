var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/namespace', function(req, res){
  res.sendfile('index.html');
});

io.of('namespace').on('connection', function(socket){
  console.log(socket);
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log(msg);
    io.of('namespace').emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
http.listen(8080, function(){
  console.log('listening on *:3000');
});
