<?php
    require_once('database.php');    
    
    $db = database::connexionBD();
    $requestid = substr($_SERVER['PATH_INFO'], 1);
    $requestid = explode('/', $requestid);
    $requesttype = array_shift($requestid);
    
    if($requesttype=="inscription"){
        if($_SERVER['REQUEST_METHOD']=="POST"){
            $request = dbInsertNewUser($db,$_POST['mail'],$_POST['nom'],$_POST['prenom'],$_POST['mdp']);
        }
    }elseif($requesttype=="connection"){
        if($_SERVER['REQUEST_METHOD']=="GET"){
            $request = dbGetUser($db,$_GET['mail'],$_GET['mdp']);
        }
    }elseif($requesttype=="form"){
        if($_SERVER['REQUEST_METHOD']=="POST"){
            $request = dbInsertNewArb($db,$_POST['longitude'],$_POST['latitude'],$_POST['haut_tot'],$_POST['haut_tronc'],$_POST['tronc_diam'],$_POST['fk_arb_etat'],$_POST['fk_stadedev'],$_POST['fk_situation'],$_POST['fk_port'],$_POST['fk_pied'],$_POST['fk_revetement'],$_POST['remarquable'],$_POST['age_estim'],$_POST['fk_prec_estim'],$_POST['fk_nomtech']);
        }
    }

    echo json_encode($request);

?>