'use strict';

var express = require('express');
var cors = require('cors');
var multer  = require('multer')
var upload = multer({limits:{fileSize:1000000}});


// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post("/api/fileanalyse", upload.single("upfile"), (req,res)=>{
  var buff = req.file;
  //console.log(buff);
  //console.log(req.body);
  if (buff){
    var name = buff.originalname;
    var size = buff.size;
    return res.json({name: name, size: size});
  }
  return res.json({message: "Error"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
