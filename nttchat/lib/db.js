 
var mysql = require('mysql');
module.exports.client = mysql.createClient(root.settings.DATABASE);
/*{
	user : 'root',
	password : '7144',
	database : 'nttchat'
}*/
// client.query('USE nttchat');

exports.db_insert = function(table, values , res, fn) {
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
	this.client.query(sql , field_val, function(err,result){
        if(err){
            console.log("ClientReady Error:" + err.message);
            return;
        }
        fn(result);
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