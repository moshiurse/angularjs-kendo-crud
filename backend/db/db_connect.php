<?php 

class DbConnect{

    function connect(){
    $server_name = "localhost";
    $db_name = "angular_practice";
    $username = "root";
    $password = "";

    try{
        $con = new PDO("mysql:host=$server_name;dbname=$db_name", $username, $password);
        $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "DATABASE CONNECTED" . $con;
        return $con;
    }catch(PDOException $e){
        echo "FAILED TO CONNECT DATABASE ". $e->getMessage();
    }
}

}

?>