<?php


define('DB_NAME', 'shapeappdb');
define('DB_USER', 'root');
define('DB_PASSWORD', '1234');
define('DB_HOST', 'localhost');

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);


date_default_timezone_set('+2:00');

?>