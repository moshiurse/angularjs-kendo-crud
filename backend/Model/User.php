<?php 

class User {
// create db con
    private $con;
    // initialize table name
    private $table = 'user';

    // Initialize users properties
    public $user_id;
    public $name;
    public $username;
    public $email;
    public $address;
    public $image;
    public $mobile;
    public $password;
    public $created_at;

    function __construct($db)
    {
        $this->con = $db;
    }

    // Create an User
    function createUser(){ 

        $query = 'INSERT INTO '. $this->table . 
        ' SET 
            `name` = :name,
            mobile = :mobile,
            address = :address,
            email = :email,
            username = :username,
            password = :password';
// image = :image
        $stmt = $this->con->prepare($query);
        // cleaning data
        $this->name = $this->name;
        $this->mobile = $this->mobile;
        $this->address = $this->address;
        $this->email = $this->email;
        $this->username = $this->username;
        $this->password = $this->password;
        // $this->image = $this->image;

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':mobile', $this->mobile);
        $stmt->bindParam(':address', $this->address);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':password', $this->password);
        // $stmt->bindParam(':image', $this->image);

        if($stmt->execute()){
            return true;
        }

        //printf("Error: %s.\n", $stmt->error);
        return false;
    }

    // Update existing User Data
    function updateUser(){ 

        $query = 'UPDATE '. $this->table . 
        ' SET 
            `name` = :name,
            mobile = :mobile,
            address = :address,
            email = :email,
            username = :username,
            password = :password,
            image = :image
            WHERE user_id = :user_id';

        $stmt = $this->con->prepare($query);
        // cleaning data
        $this->name = $this->name;
        $this->mobile = $this->mobile;
        $this->address = $this->address;
        $this->email = $this->email;
        $this->username = $this->username;
        $this->password = $this->password;
        $this->image = $this->image;
        $this->user_id = $this->user_id;

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':mobile', $this->mobile);
        $stmt->bindParam(':address', $this->address);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':image', $this->image);
        $stmt->bindParam(':user_id', $this->user_id);

        if($stmt->execute()){
            return true;
        }

        printf("Error: %s.\n", $stmt->error);
        return false;
    }

    // get All user Data
    function getAllUser($take, $skip){
// query for counting total data
        $countQuery = "select count(*) as count from user";
        $count_stmt = $this->con->prepare($countQuery);
        $count_stmt->execute();
        $count = $count_stmt->fetchColumn(0);
        // query for paging data
        $query = "select * from user
        LIMIT $skip, $take";
        $stmt = $this->con->prepare($query);
        $stmt->execute();
        return [$count, $stmt];
    }

    // get single user
    function getUser(){
        $query = "select * from user
        where user_id = ?";
        $stmt = $this->con->prepare($query);
        $stmt->bindParam(1, $this->user_id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->name = $row['name'];
        $this->email = $row['email'];
        $this->mobile = $row['mobile'];
        $this->address = $row['address'];
        $this->username = $row['username'];
        $this->password = $row['password'];
        $this->image = $row['image'];

    }

    function deleteUser(){
        $query = 'DELETE FROM ' .$this->table . ' where user_id = :user_id';
        $stmt = $this->con->prepare($query);

        $this->user_id = $this->user_id;

        $stmt->bindParam(':user_id', $this->user_id);

        if($stmt->execute()){
            return true;
        }

        printf("Error: %s.\n", $stmt->error);
        return false;
    }

    function usernameExists(){
        $query = "select username from user
        where username = :username";
        $stmt = $this->con->prepare($query);
        $stmt->bindParam(":username", $this->username);
        $stmt->execute();
        $result = $stmt->rowCount();
        return $result;
    }

    function emailExists(){
        $query = "select email from user
        where email = :email";
        $stmt = $this->con->prepare($query);
        $stmt->bindParam(":email", $this->email);
        $stmt->execute();
        $result = $stmt->rowCount();
        return $result;
    }

}

?>