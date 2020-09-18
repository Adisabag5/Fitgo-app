var express = require('express');
var mysql = require('mysql');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.listen(3300, ()=>console.log("node app is running on port 3300"));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'shapeappdb'

});

connection.connect((err)=>{
    if(!err)
        console.log('connection succeeded.');
    else
        console.log('connection failed.');
});





app.post('/tryregister', function(req,res){
    var data = JSON.parse(req.body.data);
    var name = data.your_name;
    var gender = data.gender;
    var birthYear = data.birthYear;
    var email = data.email;
    var height = data.height;
    var weight = data.weight;
    var target = data.target;
    var level = data.level;
    var password = data.password;

    connection.connect(function(){
        var query =
            "insert into user (Name,Email,UserPassword,Age,Height,Weight,Gender,Goal,UserLevel) valuse \
             ('"+ name +"','"+ email +"','"+ password +"','"+ birthYear +"','"+ height +"','"+ weight +"','"+ gender +"','"+ target +"','"+ level +"') ";

        connection.query(query,function(err,result,field){
            if(err){
                res.end(JSON.stringify(err));
            }
            else{
                if(result.affectedRows>0){
                    res.end("successfuly inserted");
                }
                else {
                    res.end("Please try again");
                }
            }
        })
                     
        
    })
})

