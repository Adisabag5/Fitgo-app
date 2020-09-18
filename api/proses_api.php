<?php



header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-Requested-With,Access-Control-Allow-Origin, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methodss: PUT, GET, POST, DELETE, OPTIONS");
header("Content-Type: application/jason; charset-utf-8");


/*
debug_to_console("Test");
// Allow from any origin
if(isset($_SERVER["HTTP_ORIGIN"]))
{
    // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] is something you want to allow, or as we do here, just allow all
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}
else
{
    //No HTTP_ORIGIN set, so we allow any. You can disallow if needed here
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 600");    // cache for 10 minutes

if($_SERVER["REQUEST_METHOD"] == "OPTIONS")
{
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT"); //Make sure you remove those you do not want to support

    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
*/
    
    include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);
//$today = date('Y-m-d H:i;s');

if($postjson['aski'] == "proses_register"){
    $password = md5($postjson['password']);
   
    $insert = mysqli_query($mysqli, "INSERT INTO user SET
        
        Name = '$postjson[your_name]',
        Email = '$postjson[email_address]',
        UserPassword = '$password'
        Age = '$postjson[birthYear]',
        Height = '$postjson[height]',
        Weight = '$postjson[weight]',
        Gender = '$postjson[gender]',
        Goal = '$postjson[target]',
        UserLevel = '$postjson[level]',
     ");
    

 

    
    if($insert){
        $result = json_encode(array('success' => true, 'msg' => 'Registered successfuly')); 
    }
    else {
        $result = json_encode(array('success' => false, 'msg' => 'Register error'));

    }
    echo $result;
}

//From here, handle the request as it is ok


?>