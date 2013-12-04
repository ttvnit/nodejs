/**
 * Module dependencies.
 */
root.settings = require('./config/settings');
var express = require('express')
// , socketio = require('socket.io')
// , http = require('http')
// , path = require('path')
, fs = require('fs')
, sys = require('sys')
, crypto = require('crypto')
, hash = require('./lib/pass').hash
, md5sum = crypto.createHash('md5');
var user = require('./routes/user');
var app = express();
app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.use(express.favicon());
	// config
	/*
	 * app.register('html', require('ejs')); app.engine('html',
	 * require('ejs').renderFile); //make ".html" the default app.set('view
	 * engine', 'html');
	 */
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/views');
});

app.configure('development', function() {
	app.set('url', 'http://nttchat.ntt');
	app.use(express.errorHandler());
	// middleware
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
	app.use(express.session());
	// parses json, x-www-form-urlencoded, and multipart/form-data
	app.use(express.bodyParser());
	// support _method (PUT in forms etc)
	app.use(express.methodOverride());
	// Session-persisted message middleware

	app.use(function(req, res, next) {
		var err = req.session.error, msg = req.session.success;
		delete req.session.error;
		delete req.session.success;
		res.locals.message = '';
		if (err)
			res.locals.message = '<p class="msg error">' + err + '</p>';
		if (msg)
			res.locals.message = '<p class="msg success">' + msg + '</p>';
		next();
	});
});

function authenticate(name, pass, fn) {
	if (!module.parent)
		console.log('authenticating %s:%s', name, pass);
	var user = users[name];
	// query the db for the given username
	if (!user)
		return fn(new Error('cannot find user'));
	// apply the same algorithm to the POSTed password, applying
	// the hash against the pass / salt, if there is a match we
	// found the user
	hash(pass, user.salt, function(err, hash) {
		if (err)
			return fn(err);
		if (hash == user.hash)
			return fn(null, user);
		fn(new Error('invalid password'));
	})
}
app.get('/users', user.list);
app.get('/registration', user.registration);
app.post('/registration', function(req, res) {
	req.session.error = Array();
	user.validate(req, res, function(error) {
		if(error.length) { 
			req.session.error = error.join('\n');
			user.registration(req, res);
		}else{
			data = {uid:null,name:req.body.username,pass: req.body.password,mail:req.body.mail,gender:req.body.gender};
			if(req.files.avatar.name !=''){
				fs.readFile(req.files.avatar.path, function(err, filecontent) {
					var newPath = root.settings.ROOT_DIR + 'public/images/'
							+ req.files.avatar.name;
					fs.writeFile(newPath, filecontent, function(err) {
						data.avatar = req.files.avatar.name;
						//console.log(data);
						user.add_user(data,res);
						res.redirect("back");
					});
				});
			}else{
				user.add_user(data,res);
				res.redirect("back");
			}
		}
		
	});
});

app.get('/', function(req, res) {
	if (req.session.user) {
		// req.cookies.remember
		// next();
	} else {
		req.session.error = 'Access denied!';
		res.redirect('/login');
	}
});

app.get('/login', function(req, res) {
	res.render('login', {
		message : (req.session.error ? req.session.error : 'haha')
	});
});

app.get('/logout', function(req, res) {
	// destroy the user's session to log them out
	// will be re-created next request
	res.clearCookie('remember');
	req.session.destroy(function() {
		res.redirect('/');
		// res.redirect('back');
	});
});
app.post('/login', function(req, res) {
	db.getUserDetailsByUsername(req.body.username, res);

	/*
	 * authenticate(req.body.username, req.body.password, function(err, user){
	 * var minute = 60000; if (req.body.remember) res.cookie('remember', 1, {
	 * maxAge: minute });
	 * 
	 * if (user) { // Regenerate session when signing in // to prevent fixation
	 * req.session.regenerate(function(){ // Store the user's primary key // in
	 * the session store to be retrieved, // or in this case the entire user
	 * object req.session.user = user; req.session.success = 'Authenticated as ' +
	 * user.name + ' click to <a href="/logout">logout</a>. ' + ' You may now
	 * access <a href="/restricted">/restricted</a>.';
	 * res.redirect('/restricted'); }); } else { req.session.error =
	 * 'Authentication failed, please check your ' + ' username and password.' + '
	 * (use "tj" and "foobar")'; res.redirect('/login'); } });
	 */
});
if (!module.parent) {
	app.listen(app.get('port'), function() {
		console.log("Express server listening on port " + app.get('port'));
	});
}

/*
 * var fs = require('fs'); fs.writeFile('message.txt', 'Hello Node', function
 * (err) { if (err) throw err; console.log('It\'s saved!'); });
 * fs.appendFile('message.txt', 'data to append', function (err) { if (err)
 * throw err; console.log('The "data to append" was appended to file!'); });
 */
/*
 * var express = require('express') , socketio = require('socket.io') , http =
 * require('http') , path = require('path');
 * 
 * //var app = express(); var app=express.createServer(); app.get('/hello.txt',
 * function(req, res){ var body = 'Hello World asdfa sdf';
 * res.setHeader('Content-Type', 'text/plain'); res.setHeader('Content-Length',
 * body.length); res.end(body); }); app.get('*', function(req, res){
 * res.send('Hello World'); }); app.listen(3000); console.log('Listening on port
 * 3000');
 */
/*
 * var io = require('socket.io').listen(8080); // open the socket connection
 * io.sockets.on('connection', function (socket) { // listen for the chat even.
 * and will recieve // data from the sender. socket.on('chat', function (data) { //
 * default value of the name of the sender. var sender = 'unregistered'; // get
 * the name of the sender socket.get('nickname', function (err, name) {
 * console.log('Chat message by ', name); console.log('error ', err); sender =
 * name; }); // broadcast data recieved from the sender // to others who are
 * connected, but not // from the original sender. socket.broadcast.emit('chat', {
 * msg : data, msgr : sender }); }); // listen for user registrations // then
 * set the socket nickname to socket.on('register', function (name) { // make a
 * nickname paramater for this socket // and then set its value to the name
 * recieved // from the register even above. and then run // the function that
 * follows inside it. socket.set('nickname', name, function () { // this kind of
 * emit will send to all! :D io.sockets.emit('chat', { msg : "naay nag apil2! si " +
 * name + '!', msgr : "mr. server" }); }); });
 * 
 * });
 */