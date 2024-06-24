<?php
    require_once('database.php');    
    $db = database::connexionBD();
    $requestid = substr($_SERVER['PATH_INFO'], 1);
    $requestid = explode('/', $requestid);
    $requesttype = array_shift($requestid);

    
?>