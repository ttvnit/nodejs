var db = require(root.settings.ROOT_DIR + 'lib/db');
exports.validate = function(req, res, fn) {
	// arguments.length
	error = Array();
	if (req.body.password != req.body.repassword) {
		error.push('The specified passwords do not match');
		fn(error);
		return;
	}
	db.client.query("select uid from users where mail=?", [ req.body.mail ],
			function(err, result, fields) {

				if (result.length) {
					error.push('The email ' + req.body.mail
							+ ' is already registered.');
				}
				db.client.query("select uid from users where name=?",
						[ req.body.username ], function(err, result, fields) {
							if (result.length) {
								error.push('The username "' + req.body.username
										+ '" is already registered.');
							}
							fn(error);
						});
			});
}

exports.add_user = function(data, res) {
	db.db_insert('users', data, res, function(result){
		if(result.insertId){
			db.db_insert('user_groups', {gid:null,uid: result.insertId,group_name: 'General',is_system: 1},function(){});
		}
	});
	// db.db_insert('users',{uid:null,name:'ttvnit',pass:'hahaha',mail:'ttvnit@gmail.com'},res);
}
exports.username_validate = function(username, res) {
	client.query("select uid from users where name=?", [ username ],
			function selectCb(err, result, fields) {
				res.send(err | fields);
			});
}
exports.list = function(req, res) {
	db.client.query("select * from users",[],
					function selectCb(err, results, fields) {
						if (err)
							throw err;
						res.send(results);
					});
};
exports.registration = function(req, res) {
	if (!req.body.first_name) {
		req.body = {
			first_name : '',
			last_name : '',
			username : '',
			mail : '',
			gender: 1,
		};
	}
	res.render('registration', {
		data : req,
		message : (req.session.error ? req.session.error : '')
	});
};
exports.getUserDetailsByUsername = function(username, res, fn) {
	db.client.query("select * from users where name=?",[ username ], 
			function selectCb(err, results, fields) {
				// res.send(err | fields);
				if (err) throw err;
				fn(results, fields);
			});
};

exports.registration_submit = function(req, res) {
	// var validate = module.parent.user.email_validate(req.body.mail);
	// console.log(req.body);
	console.log('thanh tuan');
	res.send(req.body.mail);
	// db.db_insert('users',{uid:null,name:'thanhtuan',pass: 'sdf"sdf',mail:
	// 'hahaha@gaga.com'},res);

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
};