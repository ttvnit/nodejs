exports.email_validate = function(email, res) {
	console.log('conkhi');
	/*client.query("select uid from users where email=?", [ email ],
			function selectCb(err, details, fields) {
				res.send(err | details);
			});*/
}
exports.username_validate = function(username, res) {
	client.query("select uid from users where name=?", [ username ],
			function selectCb(err, details, fields) {
				res.send(err | details);
			});
}
exports.list = function(req, res) {
	res.send("respond with a resource");
};
exports.registration = function(req, res) {
	res.render('registration', {message:  (req.session.error?req.session.error:'') });
};
exports.registration_submit = function(req, res) {
	//var validate  = module.parent.user.email_validate(req.body.mail);
	//console.log(req.body);
	console.log('thanh tuan');
	res.send(req.body.mail);
	//db.db_insert('users',{uid:null,name:'thanhtuan',pass: 'sdf"sdf',mail: 'hahaha@gaga.com'},res);
	
	  /*authenticate(req.body.username, req.body.password, function(err, user){
		var minute = 60000;
		if (req.body.remember) res.cookie('remember', 1, { maxAge: minute });
		  
	    if (user) {
	      // Regenerate session when signing in
	      // to prevent fixation 
	      req.session.regenerate(function(){
	        // Store the user's primary key 
	        // in the session store to be retrieved,
	        // or in this case the entire user object
	        req.session.user = user;
	        req.session.success = 'Authenticated as ' + user.name
	          + ' click to <a href="/logout">logout</a>. '
	          + ' You may now access <a href="/restricted">/restricted</a>.';
	        res.redirect('/restricted');
	      });
	    } else {
	      req.session.error = 'Authentication failed, please check your '
	        + ' username and password.'
	        + ' (use "tj" and "foobar")';
	      res.redirect('/login');
	    }
	  });*/
};