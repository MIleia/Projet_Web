// Si l'utilisateur n'est pas connecté, le renvoie sur la page de connection
if(sessionStorage.getItem('connecté')!='True'){
    window.location.href = "../connection.html";
}else{
    // Affiche son nom et prénom
    prenom = sessionStorage.getItem('prenom');
    nom = sessionStorage.getItem('nom');
    inner = prenom+' '+nom;
    document.getElementById("profil").innerHTML = inner;
    // Si les arbres du fichier Data_Arbre.csv sont déjà dans la BDD, on ne peut pas rappuyer sur le bouton
    if(localStorage.getItem('remplir')=='True'){
        inner =`<button type="submit" class="btn btn-success btn-block mb-4" id="remplir" disabled>Remplir avec Data_Arbre.csv</button>`;
        document.getElementById("bouton_remplir").innerHTML = inner;
    }
}

//======================================================FORMULAIRE===========================================================//
// Confirme que l'arbre a bien été ajouté
function confirm(){
    inner =`<span style="color:#198754;">Arbre bien ajouté<span>`
    document.getElementById("ajout_succerror").innerHTML = inner;
}
// Récupère les informations dans le formulaire, les vérifies, et fait une requête POST pour inséré un arbre
function form(){
    longitude = document.getElementById("longitude").value;
    document.getElementById('longitude').value = "";
    latitude = document.getElementById("latitude").value;
    document.getElementById('latitude').value = "";
    haut_tot = document.getElementById("haut_tot").value;
    document.getElementById('haut_tot').value = "";
    haut_tronc = document.getElementById("haut_tronc").value;
    document.getElementById('haut_tronc').value = "";
    tronc_diam = document.getElementById("tronc_diam").value;
    document.getElementById('tronc_diam').value = "";
    fk_arb_etat = document.getElementById("fk_arb_etat").value;
    document.getElementById('fk_arb_etat').value = "EN PLACE";
    fk_stadedev = document.getElementById("fk_stadedev").value;
    document.getElementById('fk_stadedev').value = "Jeune";
    fk_situation = document.getElementById("fk_situation").value;
    document.getElementById('fk_situation').value = "Alignement";
    fk_port = document.getElementById("fk_port").value;
    document.getElementById('fk_port').value = "architecturé";
    fk_pied = document.getElementById("fk_pied").value;
    document.getElementById('fk_pied').value = "Bac de plantation";
    fk_revetement = document.getElementById("fk_revetement").value;
    document.getElementById('fk_revetement').value = "Oui";
    remarquable = document.getElementById("remarquable").value;
    document.getElementById('remarquable').value = "Oui";
    age_estim = document.getElementById("age_estim").value;
    document.getElementById('age_estim').value = "";
    fk_prec_estim = document.getElementById("fk_prec_estim").value;
    document.getElementById('fk_prec_estim').value = "";
    fk_nomtech = document.getElementById("fk_nomtech").value;
    document.getElementById('fk_nomtech').value = "";
    
    mail = sessionStorage.getItem('mail');

    if(longitude!="" && latitude!="" && haut_tot!="" && haut_tronc!="" && tronc_diam!="" && fk_arb_etat!="" && fk_stadedev!="" && fk_situation!="" && fk_port!="" && fk_pied!="" && fk_revetement!="" && remarquable!="" && age_estim!="" && fk_prec_estim!="" && fk_nomtech!=""){
        if(haut_tot<0 || haut_tronc<0 || tronc_diam<0 || age_estim<0 || fk_prec_estim<0){
            inner =`<span style="color:red;">Veuillez renseigner des valeurs positives<span>`
            document.getElementById("ajout_succerror").innerHTML = inner;
        }else{
            request = 'longitude='+longitude+'&latitude='+latitude+'&haut_tot='+haut_tot+'&haut_tronc='+haut_tronc+'&tronc_diam='+tronc_diam+'&fk_arb_etat='+fk_arb_etat+'&fk_stadedev='+fk_stadedev+'&fk_situation='+fk_situation+'&fk_port='+fk_port+'&fk_pied='+fk_pied+'&fk_revetement='+fk_revetement+'&remarquable='+remarquable+'&age_estim='+age_estim+'&fk_prec_estim='+fk_prec_estim+'&fk_nomtech='+fk_nomtech+'&mail='+mail;

            ajaxRequest('POST','../lib/request.php/form/',confirm,request);
        }
    }else{
        inner =`<span style="color:red;">Veuillez renseigner tous les champs de textes<span>`
        document.getElementById("ajout_succerror").innerHTML = inner;
    }
}

//========================================================BOUTONS============================================================//
// Confirme que les arbres ont bien été ajoutés
function confirmr(){
    inner =`<span style="color:#198754;">Arbres bien ajoutés<span>`
    document.getElementById("ajout_succerror").innerHTML = inner;
}
// Remplace le bouton par un bouton désactivé et appel une requête POST pour appeler le script python qui insérera les arbres du fichier Data_Arbre.csv et appel confirmr
function remplir(){
    inner =`<button type="submit" class="btn btn-success btn-block mb-4" id="remplir" disabled>Remplir avec Data_Arbre.csv</button>`;
    document.getElementById("bouton_remplir").innerHTML = inner;
    localStorage.setItem('remplir', 'True');
    request = 'mail='+sessionStorage.getItem('mail');
    ajaxRequest('POST','../lib/request.php/remplir/',confirmr,request);
}
//localStorage.setItem('remplir', 'False');

// Confirme que les arbres ont bien été supprimé et réactive le bouton d'ajout des arbres depuis le fichier .csv
function confirmv(){
    inner =`<span style="color:#198754;">Arbres bien supprimés<span>`
    document.getElementById("ajout_succerror").innerHTML = inner;
    localStorage.setItem('remplir', 'False');
    inner =`<button type="submit" class="btn btn-success btn-block mb-4" id="remplir">Remplir avec Data_Arbre.csv</button>`;
    document.getElementById("bouton_remplir").innerHTML = inner;
    listener();
}
// Fais une requête DELETE pour supprimer tous les arbres de la base de données et appel confirmv
function vider(){
    ajaxRequest('DELETE','../lib/request.php/vider',confirmv);
}


// Remplis les noms disponible pour l'autocompletion
function autocompletion(data){
    inner = "";
    for(let i=0; i<data.length; i++){
        inner += `<option value="`+data[i]["fk_nomtech"]+`">`+data[i]["fk_nomtech"]+`</option>`;
    }
    document.getElementById("noms").innerHTML = inner;
}
// Fais une requête pour récupérer les différents noms dans la base de données, et appel autocompletion
ajaxRequest('GET','../lib/request.php/autocomp',autocompletion);


//=======================================================LISTENER============================================================//
// Ecoute les différents boutons d'ajouts et de suppression
function listener(){
    document.getElementById("ajout").addEventListener("click", function(event){
        event.preventDefault();
        form();
    });
    document.getElementById("remplir").addEventListener("click", function(event){
        event.preventDefault();
        remplir();
    });
    document.getElementById("vider").addEventListener("click", function(event){
        event.preventDefault();
        vider();
    });
}
listener();