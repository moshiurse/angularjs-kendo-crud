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

//get users query
$result = $user->getAllUser();

//Get row count
$num = $result->rowCount();

//check if any user exists
if($num > 0){
    $users_arr = array();

    $users_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $user_item = array(
            'user_id' => $user_id,
            'name' => $name,
            'email' => $email,
            'mobile' => $mobile,
            'address' => $address,
            'username' => $username,
            'password' => $password,
            'image' => $image,
            'created_at'=> $created_at
        );

        array_push($users_arr['data'], $user_item);
    }

    // convert array to json
    echo json_encode($users_arr);

}else{
    // No user found
    echo json_encode(
        array('msg' => 'No User Found!!')
    );
}
