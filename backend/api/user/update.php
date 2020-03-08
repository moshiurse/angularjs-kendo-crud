<?php

//including header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
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

// Also set The Id to update
$user->user_id = $data->user_id;

// Set the data
$user->name = $data->name;
$user->mobile = $data->mobile;
$user->address = $data->address;
$user->email = $data->email;
$user->username = $data->username;
$user->password = $data->password;
$user->image = $data->image;

if($user->updateUser()){
    echo json_encode(
        array(
            'msg' => 'User Updated successfully!!'
        )
        );
}else{
    echo json_encode(
        array(
            'msg' => 'User failed to update!!'
        )
        );
}
