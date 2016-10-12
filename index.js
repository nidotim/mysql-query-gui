var express = require('express');
var mysql  = require('mysql');
var path = require('path');
var app = express();
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'xxxxxx',
  password : 'xxxxxx'
});
connection.connect();
app.get('/', function(req, res){
	res.sendFile(path.resolve("index.html"));
});


app.get('/databases', function(req, res){
	connection.query('show databases;', function(err, rows, fields) {
		if (err) throw err;
	 	res.status(200);
	 	res.json(rows);
	});
});

app.get('/databases/:database/tables', function(req, res){
	var database = req.params.database;
	console.log("database:", database);
	connection.query('use '+ database, function(err){
		if(err) throw err;

		connection.query('show tables', function(err, rows, fields){
			if(err) throw err;
			res.status(200);
			res.json(rows);
		})
	});
});

var port = process.env.PORT || 3000;

app.listen(port, function(err){
	if(err) throw err;
	console.log("listening on port " + port);	
});

//connection.end();