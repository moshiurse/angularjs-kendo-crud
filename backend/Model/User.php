<?php 

include_once('../db/db_connect.php');

class User {

    public $con;
    function __construct(\PDO $pdo)
    {
        $this->con = $pdo;
    }

    function createUser($user_data){
        $query = "INSERT INTO `user` (`name`, `email`, `mobile`, `address`, `username`, `password`, `image`) VALUES 
        ($user_data->name, $user_data->email, $user_data->mobile, $user_data->address, $user_data->username, $user_data->password, $user_data->file)";

        $this->con->exec($query);
    }

    function getAllUser(){

        $query = "select * from user";
        $stmt = $this->con->query($query);
        $stmt->fetch(PDO::FETCH_ASSOC);
    }

    function deleteUser($user_id){
        $query = "delete from user where user_id:$user_id";
        $this->con->exec($query);
    }

    function updateUser($user_data, $user_id){
       $query = "UPDATE user SET name = $user_data->name, email = $user_data->email, mobile = $user_data->mobile,
       address = $user_data->address, username = $user_data->username, password = $user_data->password, file = $user_data->file
       WHERE user_id = $user_id";
       
       $this->con->exec($query);
    }

}

?>

<!-- INSERT INTO `user` (`user_id`, `name`, `email`, `mobile`, `address`, `username`, `password`, `image`, `created_at`) VALUES (NULL, 'Moshiur Rahman', 'moshiur.swe@gmail.com', '01999999999', 'Mymensingh, Bangladesh', 'moshiurse', '11AAa@111', 'moshiur.png', current_timestamp()) -->