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

    function dbGetUser($db,$mail,$mdp){
        try{
            $request = 'SELECT * FROM users where mail=:mail';
            $statement = $db->prepare($request);
            $statement->bindParam(':mail', $mail);   
            $statement->execute();
            $result = $statement->fetch(PDO::FETCH_ASSOC);
            if(!empty($result) && password_verify($mdp,$result['mdp'])){
                return array($result['mail'],$result['nom'],$result['prenom']);
            }else{
                return "error";
            }
        }catch (PDOException $exception){
            error_log('Request error: '.$exception->getMessage());
            return false;
        }
    } 


    function AlreadyUser($db,$mail){
        try{
            $request = 'SELECT * FROM users where mail=:mail';
            $statement = $db->prepare($request);
            $statement->bindParam(':mail', $mail);    
            $statement->execute();
            $user = $statement->fetch(PDO::FETCH_ASSOC);
            if(empty($user)){
                return false;
            }else{
                return true;
            }
        }catch (PDOException $exception){
            error_log('Request error: '.$exception->getMessage());
            return false;
        }
    }
    function dbInsertNewUser($db,$mail,$nom,$prenom,$mdp){
        try{
            if(!AlreadyUser($db,$mail)){
                $hash=password_hash($mdp, PASSWORD_DEFAULT);
                $stmt = $db->prepare("INSERT INTO users (mail, nom, prenom, mdp) VALUES (:mail, :nom, :prenom, :mdp)");
                $stmt->bindParam(':mail', $mail);
                $stmt->bindParam(':nom', $nom);
                $stmt->bindParam(':prenom', $prenom);
                $stmt->bindParam(':mdp', $hash);
                $stmt->execute();
                return true;
            }else{
                return "Already";
            }
        }catch (PDOException $exception){
            error_log('Request error: '.$exception->getMessage());
            return false;
        }
    } 



    function dbInsertNewArb($db, $longitude, $latitude, $haut_tot, $haut_tronc, $tronc_diam, $fk_arb_etat, $fk_stadedev, $fk_situation, $fk_port, $fk_pied, $fk_revetement, $remarquable, $age_estim, $fk_prec_estim, $fk_nomtech, $mail){
        try {
            $stmt = $db->prepare("INSERT INTO arbre (longitude, latitude, haut_tot, haut_tronc, tronc_diam, fk_arb_etat, fk_stadedev, fk_situation, fk_port, fk_pied, fk_revetement, remarquable, age_estim, fk_prec_estim, fk_nomtech, mail) VALUES (:longitude, :latitude, :haut_tot, :haut_tronc, :tronc_diam, :fk_arb_etat, :fk_stadedev, :fk_situation, :fk_port, :fk_pied, :fk_revetement, :remarquable, :age_estim, :fk_prec_estim, :fk_nomtech, :mail)");
            $stmt->bindParam(':longitude', $longitude);
            $stmt->bindParam(':latitude', $latitude);
            $stmt->bindParam(':haut_tot', $haut_tot);
            $stmt->bindParam(':haut_tronc', $haut_tronc);
            $stmt->bindParam(':tronc_diam', $tronc_diam);
            $stmt->bindParam(':fk_arb_etat', $fk_arb_etat);
            $stmt->bindParam(':fk_stadedev', $fk_stadedev);
            $stmt->bindParam(':fk_situation', $fk_situation);
            $stmt->bindParam(':fk_port', $fk_port);
            $stmt->bindParam(':fk_pied', $fk_pied);
            $stmt->bindParam(':fk_revetement', $fk_revetement);
            $stmt->bindParam(':remarquable', $remarquable);
            $stmt->bindParam(':age_estim', $age_estim);
            $stmt->bindParam(':fk_prec_estim', $fk_prec_estim);
            $stmt->bindParam(':fk_nomtech', $fk_nomtech);
            $stmt->bindParam(':mail', $mail);
            $stmt->execute();
            return true;
        } catch (PDOException $exception){
            error_log('Request error: '. $exception->getMessage());
            return false;
        }
    }
    
    function dbGetNoms($db){
        try{
            $request = "SELECT DISTINCT fk_nomtech FROM arbre ORDER BY fk_nomtech";
            $statement = $db->prepare($request);
            $statement->execute();
            return $statement->fetchall(PDO::FETCH_ASSOC);
        }catch (PDOException $exception){
            error_log('Request error: '.$exception->getMessage());
            return false;
        }
    } 



    function dbGetArbres($db){
        try{
            $request = "SELECT * from arbre ORDER BY fk_nomtech";
            $statement = $db->prepare($request);
            $statement->execute();
            return $statement->fetchall(PDO::FETCH_ASSOC);
        }catch (PDOException $exception){
            error_log('Request error: '.$exception->getMessage());
            return false;
        }
    } 

    function dbGetArbresWhere($db,$remarquable,$fk_arb_etat,$fk_stadedev,$fk_situation){
        $remarquableIN = '(:remarquable)';
        $fk_arb_etatIN = '(:fk_arb_etat)';
        $fk_stadedevIN = '(:fk_stadedev)';
        $fk_situationIN = '(:fk_situation)';
        if($remarquable=='Tous'){
            $remarquableIN = "('Oui','Non')";
        }
        if($fk_arb_etat=='Tous'){
            $fk_arb_etatIN = "('EN PLACE','ABATTU','Essouché','Non essouché','REMPLACÉ','SUPPRIMÉ')";
        }
        if($fk_stadedev=='Tous'){
            $fk_stadedevIN = "('Jeune','Adulte','vieux','senescent')";
        }
        if($fk_situation=='Tous'){
            $fk_situationIN = "('Alignement','Groupe','Isolé')";
        }
        try{
            $request = "SELECT * from arbre WHERE remarquable IN ".$remarquableIN." AND fk_arb_etat IN ".$fk_arb_etatIN." AND fk_stadedev IN ".$fk_stadedevIN." AND fk_situation IN ".$fk_situationIN." ORDER BY fk_nomtech";
            $statement = $db->prepare($request);
            if($remarquable!='Tous'){
                $statement->bindParam(':remarquable', $remarquable);
            }
            if($fk_arb_etat!='Tous'){
                $statement->bindParam(':fk_arb_etat', $fk_arb_etat);
            }
            if($fk_stadedev!='Tous'){
                $statement->bindParam(':fk_stadedev', $fk_stadedev);
            }
            if($fk_situation!='Tous'){
                $statement->bindParam(':fk_situation', $fk_situation);
            }
            $statement->execute();
            return $statement->fetchall(PDO::FETCH_ASSOC);
        }catch (PDOException $exception){
            error_log('Request error: '.$exception->getMessage());
            return false;
        }
    } 


    function dbGetArbre($db,$id){
        try{
            $request = "SELECT * from arbre WHERE id=:id";
            $statement = $db->prepare($request);
            $statement->bindParam(':id', $id);
            $statement->execute();
            return $statement->fetch(PDO::FETCH_ASSOC);
        }catch (PDOException $exception){
            error_log('Request error: '.$exception->getMessage());
            return false;
        }
    } 
?>