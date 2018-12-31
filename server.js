var express = require("express" );
var multer  = require('multer');
var app = express();
var fs = require('fs');
let csvtojson = require('convert-csv-to-json');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    fs.mkdir('./uploads', function(err) {
        if(err) {
            console.log(err.stack)
        } else {
            callback(null, './uploads');
        }
    })
  },
  filename: function (req, file, callback) {
    
    callback(null, file.fieldname + '-' + Date.now() + '.csv');
  }

});

app.post('/api/file',function(req,res){
    var upload = multer({ storage : storage}).single('input');
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});
