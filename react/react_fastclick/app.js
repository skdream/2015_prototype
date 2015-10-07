var express = require("express"); 
var app = express(); 

app.use(express.static('public'));

app.get("/", function(req, res) {
	res.end("OK");
})

app.listen(80);