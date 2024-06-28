if(sessionStorage.getItem('connecté')!='True'){
    window.location.href = "../connection.html";
}else if(sessionStorage.getItem('longitude')==''){
    window.location.href = "visualisation.html";
}else{
    prenom = sessionStorage.getItem('prenom');
    nom = sessionStorage.getItem('nom');
    inner = prenom+' '+nom;
    document.getElementById("profil").innerHTML = inner;
}

// Récupère et affiche les informations utiles
inner = `   <td>`+sessionStorage.getItem('longitude')+`</td>
            <td>`+sessionStorage.getItem('latitude')+`</td>
            <td>`+sessionStorage.getItem('fk_port')+`</td>
            <td>`+sessionStorage.getItem('fk_pied')+`</td>
            <td>`+sessionStorage.getItem('fk_revetement')+`</td>
            <td>`+sessionStorage.getItem('fk_situation')+`</td>
            <td>`+sessionStorage.getItem('age_estim')+`</td>`;
document.getElementById("tab_essouche").innerHTML = inner;

// Récupère et affiche le modèle
document.getElementById("mod").innerHTML = sessionStorage.getItem('modele');

// Récupère le résultat de la prédiction et l'affiche
fetch('../ressources/F3/Result.json')
    .then((response) => response.json())
    .then((json) => {
        if(json['essouche']==0){
            inner = `<h4 style="color:red;">Arbre non déraciné</h4>`;
        }else{
            inner = `<h4 style="color:red;">Arbre déraciné</h4>`;
        }
        document.getElementById("response").innerHTML = inner;
    });

// Supprime les informations utiles
sessionStorage.setItem('longitude', '');
sessionStorage.setItem('latitude', '');
sessionStorage.setItem('fk_port', '');
sessionStorage.setItem('fk_pied', '');
sessionStorage.setItem('fk_revetement', '');
sessionStorage.setItem('fk_situation', '');
sessionStorage.setItem('age_estim', '');