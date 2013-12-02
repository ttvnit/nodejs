var express=require('express');
var app=express.createServer();
var fs=require('fs');
var sys=require('sys');
app.listen(8080);
app.get('/',function(req,res){
fs.readFile('upload.html',function (err, data){
    res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
    res.write(data);
    res.end();
});


});
app.use(express.bodyParser({ keepExtensions: true, uploadDir: '/' }));
app.post('/upload',function(req,res)
{
console.log(req.files);
fs.readFile(req.files.displayImage.path, function (err, data) {
  // ...
  var newPath = __dirname;
  fs.writeFile(newPath, data, function (err) {
    res.redirect("back");
  });
});

});