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

inner = `   <td>`+sessionStorage.getItem('longitude')+`</td>
            <td>`+sessionStorage.getItem('latitude')+`</td>
            <td>`+sessionStorage.getItem('fk_port')+`</td>
            <td>`+sessionStorage.getItem('fk_pied')+`</td>
            <td>`+sessionStorage.getItem('fk_revetement')+`</td>
            <td>`+sessionStorage.getItem('fk_situation')+`</td>
            <td>`+sessionStorage.getItem('age_estim')+`</td>`;
document.getElementById("tab_essouche").innerHTML = inner;


fetch('../ressources/F3/Result.json')
    .then((response) => response.json())
    .then((json) => {
        if(json['essouche']==0){
            inner = `<h4>Arbre non déraciné</h4>`;
        }else{
            inner = `<h4>Arbre déraciné</h4>`;
        }
        document.getElementById("response").innerHTML = inner;
    });



sessionStorage.setItem('longitude', '');
sessionStorage.setItem('latitude', '');
sessionStorage.setItem('fk_port', '');
sessionStorage.setItem('fk_pied', '');
sessionStorage.setItem('fk_revetement', '');
sessionStorage.setItem('fk_situation', '');
sessionStorage.setItem('age_estim', '');


