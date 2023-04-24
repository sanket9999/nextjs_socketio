const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

let count = 0;
let count1 = 0;
let count2 = 0;

io.on('connection', function(socket) {  

    console.log("A user connected. Current count: ${count}");
    console.log("A user connected. Current count: ${count1}");
    console.log("A user connected. Current count: ${count2}");
    
    //emit the initial count value to the client-side JavaScript
    socket.emit('countUpdate', count);
    socket.emit('countUpdate1', count1);
    socket.emit('countUpdate2', count2);

    //when the server receives incrementCount message, update the count variable and emit 'countUpdate' message to all connected clients
    socket.on('incrementCount', function() {
      count++;
      io.emit('countUpdate', count);
    });

    //when the server receives incrementCount message, update the count variable and emit 'countUpdate1' message to all connected clients
    socket.on('incrementCount1', function() {
      count1++;
      io.emit('countUpdate1', count1);
    });
    socket.on('incrementCount2', function() {
      count2++;
      io.emit('countUpdate2', count2);
    });

    //when the server receives decrementCount message, update the count variable and emit 'countUpdate' message to all connected clients
    socket.on('decrementCount', function() {
      count--;
      io.emit('countUpdate', count);
    });

    //when the server receives decrementCount message, update the count variable and emit 'countUpdate1' message to all connected clients
    socket.on('decrementCount1', function() {
      count1--;
      io.emit('countUpdate1', count1);
    });

    socket.on('decrementCount2', function() {
      count2--;
      io.emit('countUpdate2', count2);
    });

    //when the user disconnects, log a message to the console
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/page1.html');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/page2.html');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/page3.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});