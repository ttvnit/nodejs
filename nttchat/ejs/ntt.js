var express = require('express');
    var http = require('http');
    var ejs = require('ejs');

    var app = express.createServer();

    app.set('views', __dirname + '/views');
    app.set( "view engine", "ejs" );

    app.get('/', function(req, res) {
	res.local('layout', false);
    res.render('index');
    });
    app.listen(8000);
    console.log('Listening 8000');