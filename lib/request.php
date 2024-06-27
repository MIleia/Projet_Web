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
            $request = dbInsertNewArb($db,$_POST['longitude'],$_POST['latitude'],$_POST['haut_tot'],$_POST['haut_tronc'],$_POST['tronc_diam'],$_POST['fk_arb_etat'],$_POST['fk_stadedev'],$_POST['fk_situation'],$_POST['fk_port'],$_POST['fk_pied'],$_POST['fk_revetement'],$_POST['remarquable'],$_POST['age_estim'],$_POST['fk_prec_estim'],$_POST['fk_nomtech'],$_POST['mail']);
        }
    }elseif($requesttype=="remplir"){
        if($_SERVER['REQUEST_METHOD']=="POST"){
            $request = True;
            $exec = 'python3 ../ressources/remplissage.py '.$_POST['mail'];
            exec($exec);
        }
    }elseif($requesttype=="autocomp"){
        if($_SERVER['REQUEST_METHOD']=="GET"){
            $request = dbGetNoms($db);
        }
    }elseif($requesttype=="tab"){
        if($_SERVER['REQUEST_METHOD']=="GET"){
            $request = dbGetArbres($db);
        }
    }elseif($requesttype=="tabmodif"){
        if($_SERVER['REQUEST_METHOD']=="GET"){
            $request = dbGetArbresWhere($db,$_GET['remarquable'],$_GET['fk_arb_etat'],$_GET['fk_stadedev'],$_GET['fk_situation']);
        }
    }elseif($requesttype=="predict_cluster"){
        if($_SERVER['REQUEST_METHOD']=="GET"){
            $request = dbGetArbresWhere($db,$_GET['remarquable'],$_GET['fk_arb_etat'],$_GET['fk_stadedev'],$_GET['fk_situation']);
            $myfile = fopen("../ressources/F1/arbre.csv", "w");
            if (!$myfile) {
                $request = "not open";
            }else{
                $list = array(
                    array("haut_tot", "haut_tronc", "fk_stadedev", "fk_nomtech")
                );
                foreach ($request as $item) {
                    $list[] = array(
                        $item['haut_tot'], 
                        $item['haut_tronc'], 
                        $item['fk_stadedev'], 
                        $item['fk_nomtech']
                    );
                }
                foreach ($list as $line) {
                    fputcsv($myfile, $line);
                }
                exec('python3 ../ressources/F1/script_1.py ../ressources/F1/arbre.csv ../ressources/F1/F1_Kmeans_3c.csv');
            }
        }
    }elseif($requesttype=="predict_age"){
        if($_SERVER['REQUEST_METHOD']=="GET"){
            $request = dbGetArbre($db,$_GET['id']);
            $myfile = fopen("../ressources/F2/arbre.csv", "w");
            if (!$myfile) {
                $request = "not open";
            }else{
                $list = array (
                    array("longitude", "latitude" ,"haut_tot", "haut_tronc", "tronc_diam", "fk_prec_estim"),
                    array($request['longitude'], $request['latitude'] ,$request['haut_tot'], $request['haut_tronc'], $request['tronc_diam'], $request['fk_prec_estim'])
                  );
                foreach ($list as $line) {
                    fputcsv($myfile, $line);
                }
                exec('python3 ../ressources/F2/script_2.py ../ressources/F2/arbre.csv ../ressources/F2/F2_RandomForestClassifier.pkl');
            }
        }
    }elseif($requesttype=="predict_essouche"){
        if($_SERVER['REQUEST_METHOD']=="GET"){
            $request = dbGetArbre($db,$_GET['id']);
            $myfile = fopen("../ressources/F3/arbre.csv", "w");
            if (!$myfile) {
                $request = "not open";
            }else{
                $list = array (
                    array("longitude", "latitude" ,"fk_port", "fk_pied", "fk_revetement", "fk_situation","age_estim"),
                    array($request['longitude'], $request['latitude'] ,$request['fk_port'], $request['fk_pied'], $request['fk_revetement'], $request['fk_situation'], $request['age_estim'])
                  );
                foreach ($list as $line) {
                    fputcsv($myfile, $line);
                }
                exec('python3 ../ressources/F3/script_3.py ../ressources/F3/arbre.csv ../ressources/F3/F3_RandomForestClassifier.pkl');
            }
        }
    }

    echo json_encode($request);

?>