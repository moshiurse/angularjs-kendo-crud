<?php

//including header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

//including necesssary files 
include_once '../../db/DbConnect.php';
include_once '../../Model/User.php';

// initialize db connection
$database = new DbConnect();
$db = $database->connect();

//intantiate User Object
$user = new User($db);

// get user id
$user->user_id = isset($_GET['id']) ? $_GET['id'] : die();
// Get user from specific Id
$user->getUser();

// array creation
$user_arr = array(
    'user_id' => $user->user_id,
    'name' => $user->name,
    'email' => $user->email,
    'mobile' => $user->mobile,
    'address' => $user->address,
    'username' => $user->username,
    'password' => $user->password,
    'image' => $user->image,
    'created_at'=> $user->created_at
);

// encode to json
echo json_encode($user_arr);
