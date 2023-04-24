convert the above code in Next.js as server.js and index.js file seperate without using css
write index.js first and then server.js
<!DOCTYPE html>
<html>

<head>
	<title>Button Count Example</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<script src="server.js"></script>
</head>

<body>

	<button id="modal-button" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
		Alert
	</button>
	<a href="page1.html"><button>Page 1</button></a>
	<a href="page2.html"><button>Page 2</button></a>
	<a href="page3.html"><button>Page 3</button></a>

	<!-- Modal -->
	<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
		aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Alert</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div id="modal" class="modal-body">
					<!-- <p id="viewerCount"></p> -->
					<button id="incrementButton">123</button>
					<button id="incrementButton1">456</button>
					<button id="incrementButton2">789</button>
					<h1>123 Count: <span id="count">0</span></h1>
					<h1>456 Count: <span id="count1">0</span></h1>
					<h1>789 Count: <span id="count2">0</span></h1>
					<button id="closeButton">Close 123</button>
					<button id="closeButton1">Close 456</button>
					<button id="closeButton2">Close 789</button>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	<script src="/socket.io/socket.io.js"></script>
	<script>
		const socket = io();
		let count = 0;
		let count1 = 0;
		let count2 = 0;
		socket.emit('countUpdate', count);
		socket.emit('countUpdate1', count1);
		socket.emit('countUpdate2', count2);

		document.querySelector('#incrementButton').addEventListener('click', () => {
			socket.emit('incrementCount');
		});

		document.querySelector('#closeButton').addEventListener('click', () => {
			socket.emit('decrementCount');
		});

		socket.on('countUpdate', (count) => {
			document.querySelector('#count').textContent = count;
		});

		document.querySelector('#incrementButton1').addEventListener('click', () => {
			socket.emit('incrementCount1');
		});

		document.querySelector('#closeButton1').addEventListener('click', () => {
			socket.emit('decrementCount1');
		});

		socket.on('countUpdate1', (count1) => {
			document.querySelector('#count1').textContent = count1;
		});

		document.querySelector('#incrementButton2').addEventListener('click', () => {
			socket.emit('incrementCount2');
		});

		document.querySelector('#closeButton2').addEventListener('click', () => {
			socket.emit('decrementCount2');
		});

		socket.on('countUpdate2', (count2) => {
			document.querySelector('#count2').textContent = count2;
		});
	</script>
</body>

</html>

this is server.js code
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
    
    socket.emit('countUpdate', count);
    socket.emit('countUpdate1', count1);
    socket.emit('countUpdate2', count2);

    socket.on('incrementCount', function() {
      count++;
      io.emit('countUpdate', count);
    });

    socket.on('incrementCount1', function() {
      count1++;
      io.emit('countUpdate1', count1);
    });
    socket.on('incrementCount2', function() {
      count2++;
      io.emit('countUpdate2', count2);
    });

    socket.on('decrementCount', function() {
      count--;
      io.emit('countUpdate', count);
    });

    socket.on('decrementCount1', function() {
      count1--;
      io.emit('countUpdate1', count1);
    });

    socket.on('decrementCount2', function() {
      count2--;
      io.emit('countUpdate2', count2);
    });

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