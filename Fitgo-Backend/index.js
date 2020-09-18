var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');
const { type } = require('os');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());



app.get('/knn', function(req, res) {
  res.send('Hello User');
});

app.post('/partners', function(req, res) {

  _type = 'python/getPartners.py';
  userData = req.body.data;
  console.log(req.body.data);
  userData.tProg = userData.tProg.replace(/(\r\n|\n|\r)/gm,"")

  let data = [
      userData.dist, 
      userData.lan, 
      userData.lon, 
      userData.tProg
  ];
    
    var spawn1 = require('child_process').spawn,
    py1    = spawn1('python', [_type]);
    
    let dataString = '';
    let ar = [];

    py1.stdout.on('data', function(data){
      dataString += data.toString();
      dataString = dataString.replace(/(\r\n|\n|\r)/gm," ")
      ar = dataString.split(' '); 
      console.log( 'ar - ', ar );      
    });
      
      py1.stdout.on('end', function(){
        console.log(ar);
        res.send([ar]);
      });
    
   py1.stdin.write(JSON.stringify(data));
    
    py1.stdin.end();

});



app.post('/knn', function(req, res) {

  _type = 'python/getTprog.py';
  userData = req.body.data;
  console.log(req.body.data);

  if (userData.request == 'menu'){
    _type = 'python/getMenu.py'
  }
  else if (userData.request == 'partners'){
    _type = 'python/getPartners.py'
  }

  let data = [
      userData.gender, 
      userData.target, 
      userData.height, 
      userData.weight, 
      userData.bmi,
      userData.numericLevel
  ];
    
    var spawn = require('child_process').spawn,
    py    = spawn('python', [_type]);
    
    let dataString = '';

    py.stdout.on('data', function(data){
        dataString += data.toString();
        
      });
      
      py.stdout.on('end', function(){
        console.log(dataString);
        res.send([dataString]);
      });
    
   py.stdin.write(JSON.stringify(data));
    
    py.stdin.end();

});



app.listen(process.env.PORT || 8080);