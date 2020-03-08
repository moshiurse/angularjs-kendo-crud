<?php

//including header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

//including necesssary files 
include_once '../../db/DbConnect.php';
include_once '../../Model/User.php';

// initialize db connection
$database = new DbConnect();
$db = $database->connect();

//intantiate User Object
$user = new User($db);

// Get the raw Users Data
$data = json_decode(file_get_contents("php://input"));

// Set The Id to DELETE
$user->user_id = $data->user_id;

if($user->deleteUser()){
    echo json_encode(
        array(
            'msg' => 'User Deleted successfully!!'
        )
        );
}else{
    echo json_encode(
        array(
            'msg' => 'User failed to delete!!'
        )
        );
}
