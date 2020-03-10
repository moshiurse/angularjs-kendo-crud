<?php

//including header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

//including necesssary files 
include_once '../../db/DbConnect.php';
include_once '../../Model/User.php';

// initialize db connection
$database = new DbConnect();
$db = $database->connect();

//intantiate User Object
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

// Set the data
$user->username = $data->username;

//get users query
$result = $user->usernameExists();
//Get row count
// $num = $result->rowCount();

if($result > 0){
    echo json_encode 
    (
        array("msg" => "Username is not available", "error" => true)
    );
}else{
    echo json_encode 
    (
        array("msg" => "Username is available", "error" => false)
    );
}
