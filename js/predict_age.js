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
            <td>`+sessionStorage.getItem('haut_tot')+`</td>
            <td>`+sessionStorage.getItem('haut_tronc')+`</td>
            <td>`+sessionStorage.getItem('tronc_diam')+`</td>
            <td>`+sessionStorage.getItem('fk_prec_estim')+`</td>`;
document.getElementById("tab_age").innerHTML = inner;


document.getElementById("mod").innerHTML = sessionStorage.getItem('modele');

fetch('../ressources/F2/Result.json')
    .then((response) => response.json())
    .then((json) => {
        if(json['age_arbre']==0){
            inner = `<h4 style="color:red;">Tranche d'âge estimé : 0-9 ans</h4>`;
        }else if(json['age_arbre']==10){
            inner = `<h4 style="color:red;">Tranche d'âge estimé : 10-49 ans</h4>`;
        }else if(json['age_arbre']==50){
            inner = `<h4 style="color:red;">Tranche d'âge estimé : 50-99 ans</h4>`;
        }else{
            inner = `<h4 style="color:red;">Tranche d'âge estimé : 100 ans et plus</h4>`;
        }
        document.getElementById("response").innerHTML = inner;
    });



sessionStorage.setItem('longitude', '');
sessionStorage.setItem('latitude', '');
sessionStorage.setItem('haut_tot', '');
sessionStorage.setItem('haut_tronc', '');
sessionStorage.setItem('tronc_diam', '');
sessionStorage.setItem('fk_prec_estim', '');


