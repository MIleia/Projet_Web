<?php
    require("fonction.php");

 

    function cardsDernierMorceauEcoute(){
        try{
            echo "<div class='card' style='width: 18rem;'>";
            echo "<div class='card-header'>";
            echo "Derniers morceaux écoutés :";
            echo "</div>";
            echo "<ul class='list-group list-group-flush'>";

            $num_morceau = dbGetNumMorceauxDernier($pdo, $id_utilisateur);
            foreach($num_morceau as $key =>$value){
                $titreArtiste = dbGetTitreArtiste($pdo,$value['num_morceau']);
                echo "<li class='list-group-item'>".$titreArtiste['titre']." - ".$titreArtiste['nom']."</li>";
            }
            
            echo "</ul>";
            echo "</div>";

        }
        catch (PDOException $exception){
            error_log('Request error: '.$exception->getMessage());
            return false;
        }
        return true;
    }
?>