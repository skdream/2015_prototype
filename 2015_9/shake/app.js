var express = require("express"); 
var app = express(); 
var port = "80"; 
var localhost = "192.168.1.104"; 
// var localhost = "127.0.0.1";
// var localhost = "172.27.23.1";

app.use(express.static('public'));

app.get('/index', function(req, res) {
	console.log('coming')
	res.status(200).end('hi')
})

app.listen(port, localhost, function() {
	console.log("listening on:" + localhost + ":" + port);
});

