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


    function dbInsertNewArb($db, $longitude, $latitude, $haut_tot, $haut_tronc, $tronc_diam, $fk_arb_etat, $fk_stadedev, $fk_situation, $fk_port, $fk_pied, $fk_revetement, $remarquable, $age_estim, $fk_prec_estim, $fk_nomtech){
        try {
            $stmt = $db->prepare("INSERT INTO Arbres (longitude, latitude, haut_tot, haut_tronc, tronc_diam, fk_arb_etat, fk_stadedev, fk_situation, fk_port, fk_pied, fk_revetement, remarquable, age_estim, fk_prec_estim, fk_nomtech) VALUES (:longitude, :latitude, :haut_tot, :haut_tronc, :tronc_diam, :fk_arb_etat, :fk_stadedev, :fk_situation, :fk_port, :fk_pied, :fk_revetement, :remarquable, :age_estim, :fk_prec_estim, :fk_nomtech)");
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
            $stmt->execute();
            return true;
        } catch (PDOException $exception){
            error_log('Request error: '. $exception->getMessage());
            return false;
        }
    }
?>