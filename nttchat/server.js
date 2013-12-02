/**
 * Module dependencies.
 */

var express = require('express')
  , app = module.exports = express.createServer();


// add favicon() before logger() so
// GET /favicon.ico requests are not
// logged, because this middleware
// reponds to /favicon.ico and does not
// call next()
app.use(express.favicon());

// custom log format
if ('test' != process.env.NODE_ENV)
  app.use(express.logger(':method :url'));

// parses request cookies, populating
// req.cookies and req.signedCookies
// when the secret is passed, used 
// for signing the cookies.
app.use(express.cookieParser('my secret here'));

// parses json, x-www-form-urlencoded, and multipart/form-data
app.use(express.bodyParser());

app.get('/', function(req, res){
  if (req.cookies.remember) {
    res.send('Remembered :). Click to <a href="/forget">forget</a>!.');
  } else {
    res.send('<form method="post"><p>Check to <label>'
      + '<input type="checkbox" name="remember"/> remember me</label> '
      + '<input type="submit" value="Submit"/>.</p></form>');
  }
});

app.get('/forget', function(req, res){
  res.clearCookie('remember');
  res.redirect('back');
});

app.post('/', function(req, res){
  var minute = 60000;
  if (req.body.remember) res.cookie('remember', 1, { maxAge: minute });
  res.redirect('back');
});

if (!module.parent){
  app.listen(3000);
  console.log('Express started on port 3000');
}


/*var fs = require('fs');
fs.writeFile('message.txt', 'Hello Node', function (err) {
	  if (err) throw err;
	  console.log('It\'s saved!');
	});
fs.appendFile('message.txt', 'data to append', function (err) {
	  if (err) throw err;
	  console.log('The "data to append" was appended to file!');
	});
*/
/*var express = require('express')
	, socketio = require('socket.io')
	, http = require('http')
	, path = require('path');
  
//var app = express();
var app=express.createServer();
app.get('/hello.txt', function(req, res){
  var body = 'Hello World asdfa sdf';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});
app.get('*', function(req, res){
   res.send('Hello World');
});
app.listen(3000);
console.log('Listening on port 3000');
*/
/*
var io = require('socket.io').listen(8080);

// open the socket connection
io.sockets.on('connection', function (socket) {
   
   // listen for the chat even. and will recieve
   // data from the sender.
   socket.on('chat', function (data) {
   
      // default value of the name of the sender.
      var sender = 'unregistered';
      
      // get the name of the sender
      socket.get('nickname', function (err, name) {
         console.log('Chat message by ', name);
         console.log('error ', err);
         sender = name;
      });   

      // broadcast data recieved from the sender
      // to others who are connected, but not 
      // from the original sender.
      socket.broadcast.emit('chat', {
         msg : data, 
         msgr : sender
      });
   });
   
   // listen for user registrations
   // then set the socket nickname to 
   socket.on('register', function (name) {
   
      // make a nickname paramater for this socket
      // and then set its value to the name recieved
      // from the register even above. and then run
      // the function that follows inside it.
      socket.set('nickname', name, function () {
      
         // this kind of emit will send to all! :D
         io.sockets.emit('chat', {
            msg : "naay nag apil2! si " + name + '!', 
            msgr : "mr. server"
         });
      });
   });

});
*/
/*
var mysql = require('mysql');
var client = mysql.createConnection({ user: 'user1',  password: 'secret',database:'mydatabase'});

exports.getUserDetailsByEmail=function(email, res) {
  client.query("select * from userdetails where email=?",[email],function selectCb(err, details, fields) {
      res.send(err|details);
  });
}
*/
/*
var mysql = require('mysql');
var TEST_DATABASE = 'nttchat';
var client = mysql.createClient({
  user: 'root',
  password: '7144',
});
client.query('USE '+TEST_DATABASE);
client.query(
  'SELECT * FROM users',
  function selectCb(err, results, fields) {
    if (err) {
      throw err;
    }
    //console.log(results);
    console.log(fields);
    //client.end();
  }
);
*/