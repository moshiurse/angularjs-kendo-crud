<?php

//including header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

//including necesssary files 
include_once '../../db/DbConnect.php';
include_once '../../Model/User.php';


$database = new DbConnect();
$db = $database->connect();

$user = new User($db);

// Get the raw Users Data
// $data = json_decode(file_get_contents("php://input"));

if(!empty($_FILES['image']['name'])){
    $server_path = 'assets/img/';
    $path = $_SERVER['DOCUMENT_ROOT'] . '/angularjs-practice'. '/' .$server_path . $_FILES['image']['name'];

    if(move_uploaded_file($_FILES['image']['tmp_name'], $path)){

        echo json_encode(
            array(
                "file" => $server_path . $_FILES['image']['name'],
                "success" => "Image Uploaded Successfully"
            )
        );
    }else{
        echo json_encode(
            array(
                "error" => "Uploaded Error"
            )
        );
    }
}
