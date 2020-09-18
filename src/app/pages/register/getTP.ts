/*
var spawn = require('child_process').spawn,
py    = spawn('python', ['KNN.py']),
data = [158,117,4,100],
dataString = '';

py.stdout.on('data', function(data){
    dataString += data.toString();
  });
  
  /*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
 /*
  py.stdout.on('end', function(){
    console.log('Sum of numbers=',dataString);
  });

  /*We have to stringify the data first otherwise our python process wont recognize it*/
/*
  py.stdin.write(JSON.stringify(data));

py.stdin.end();



*/