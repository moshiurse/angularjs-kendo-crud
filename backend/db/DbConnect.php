<?php 

class DbConnect{

    private $server_name = "localhost";
    private $db_name = "angular_practice";
    private $username = "root";
    private $password = "";

    private $con;

    public function connect(){
    
        $this->con = null;
    try{
        $this->con = new PDO("mysql:host=". $this->server_name. ";dbname=". $this->db_name, $this->username, $this->password);
        $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch(PDOException $e){
        echo "FAILED TO CONNECT DATABASE ". $e->getMessage();
    }

    return $this->con;
}

}

?>