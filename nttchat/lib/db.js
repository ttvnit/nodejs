var mysql = require('mysql');
var client = mysql.createClient({
	user : 'root',
	password : '7144',
	database : 'nttchat'
});
// client.query('USE nttchat');
exports.getUserDetailsByUsername = function(username, res) {
	client.query("select uid,name,mail from users where name=?", [ username ],
			function selectCb(err, results, fields) {
		 //console.log(results);
	    //console.log(fields.mail);
				//res.send(err | fields);
		if (err) throw err;
		var output = '<html><head></head><body><h1>Latest Posts</h1><ul><table border=1><tr>';
		for (var index in fields) {
		output += '<td>' + fields[index].name + '</td>';
		}
		output += '</tr>';
		for (var index in results) {
		output += '<tr><td>' + results[index].uid + '</td>';
		output += '<td>' + results[index].name + '</td>';
		output += '<td>' + results[index].mail + '</td></tr>';
		}
		output += '</ul></body></html>';
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(output);
		
			});
}
exports.db_insert = function(table, values , res) {
	var sql = 'insert into ' + table;
	var field_name = Array();
	var field_val = Array();
	var field_params = Array();
	var i=0;
	for (var index in values) {
		console.log(index);
		field_name[i] = index; 
		field_params [i] = '?';
		switch(typeof values[index]){
		case 'string':
			field_val[i++] = values[index].replace("'","\'"); 
			break;
		case 'object':
		default:
			field_val[i++] = "'"+ values[index]+ "'"; 
		}
	}
	
	sql = sql + ' (' + field_name.join(',') + ') values ('+ field_params.join(',')  +')'
	client.query(sql , field_val, function(err,result){
        if(err){
            console.log("ClientReady Error:" + err.message);
            return;
        }
        console.log('inserted:'+result.affectedRows+' ros.');
        console.log('Id inserted:'+ result.insertId);
    });
}
exports.update = function(email, res) {
	client.query("select * from userdetails where email=?", [ email ],
			function selectCb(err, details, fields) {
				res.send(err | fields);
			});
}


exports.getUserDetailsByEmail = function(email, res) {
	client.query("select * from userdetails where email=?", [ email ],
			function selectCb(err, details, fields) {
				res.send(err | fields);
			});
}