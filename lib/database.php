<?php
    include("config.php");

    //Connection database
    class database {
        static $db = null;
        static function connexionBD() {
            if (self::$db != null) {
                return self::$db;
            }
            require_once ("config.php");
            try {
                self::$db = new PDO('pgsql:host='.DB_SERVER.';port='.DB_PORT.';dbname='.DB_NAME, DB_USER, DB_PWD);
            }
            catch (PDOException $exception) {
                error_log('Connection error: '.$exception->getMessage());
                return false;
            }
            return self::$db;
        }
    }


    function dbInsertNewArb($longitude, $latitude, $haut_tot, $haut_tronc, $tronc_diam, $fk_stadedev, $fk_situation, $fk_port, $fk_pied, $fk_revetement, $){
        try{
            $request = 'SELECT * FROM users where email=:email';
            $statement = $db->prepare($request);
            $statement->bindParam(':email', $email);   
            $statement->execute();
            $result = $statement->fetch(PDO::FETCH_ASSOC);
            if(!empty($result) && password_verify($mdp,$result['mdp'])){
                return array($result['id_user'],$result['nom'],$result['prenom']);
            }else{
                return "error";
            }
        }catch (PDOException $exception){
            error_log('Request error: '.$exception->getMessage());
            return false;
        }
    }
?>