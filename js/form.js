if(sessionStorage.getItem('connecté')!='True'){
    window.location.href = "../connection.html";
}else{
    prenom = sessionStorage.getItem('prenom');
    nom = sessionStorage.getItem('nom');
    inner = prenom+' '+nom;
    document.getElementById("profil").innerHTML = inner;
    if(localStorage.getItem('remplir')=='True'){
        inner =`<button type="submit" class="btn btn-success btn-block mb-4" id="remplir" disabled>Remplir avec Data_Arbre.csv</button>`;
        document.getElementById("bouton_remplir").innerHTML = inner;
    }
}

function confirm(){
    inner =`<span style="color:#198754;">Arbre bien ajouté<span>`
    document.getElementById("ajout_succerror").innerHTML = inner;
}

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
        request = 'longitude='+longitude+'&latitude='+latitude+'&haut_tot='+haut_tot+'&haut_tronc='+haut_tronc+'&tronc_diam='+tronc_diam+'&fk_arb_etat='+fk_arb_etat+'&fk_stadedev='+fk_stadedev+'&fk_situation='+fk_situation+'&fk_port='+fk_port+'&fk_pied='+fk_pied+'&fk_revetement='+fk_revetement+'&remarquable='+remarquable+'&age_estim='+age_estim+'&fk_prec_estim='+fk_prec_estim+'&fk_nomtech='+fk_nomtech+'&mail='+mail;

        ajaxRequest('POST','../lib/request.php/form/',confirm,request);
    }else{
        inner =`<span style="color:red;">Veuillez renseigner tous les champs de textes<span>`
        document.getElementById("ajout_succerror").innerHTML = inner;
    }
}

function confirmr(){
    inner =`<span style="color:#198754;">Arbres bien ajoutés<span>`
    document.getElementById("ajout_succerror").innerHTML = inner;
}
function remplir(){
    inner =`<button type="submit" class="btn btn-success btn-block mb-4" id="remplir" disabled>Remplir avec Data_Arbre.csv</button>`;
    document.getElementById("bouton_remplir").innerHTML = inner;
    localStorage.setItem('remplir', 'True');
    request = 'mail='+sessionStorage.getItem('mail');
    ajaxRequest('POST','../lib/request.php/remplir/',confirmr,request);
}
//localStorage.setItem('remplir', '');

function listener(){
    document.getElementById("ajout").addEventListener("click", function(event){
        event.preventDefault();
        form();
    });
    document.getElementById("remplir").addEventListener("click", function(event){
        event.preventDefault();
        remplir();
    });
}
listener();