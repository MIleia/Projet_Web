if(sessionStorage.getItem('connecté')=='True'){
    window.location.href = "/pages/accueil.html";
}

var mail = "";
var nom = "";
var prenom = "";

//=====================================================INSCRIPTION===========================================================//
// Confirme l'inscription en redirigeant sur connection.html, ou renvoie un message d'erreur si le mail est déjà utilisé
function confirm(data){
    if(data=="Already"){
        inner = `<span style="color:red">Adresse mail déjà utilisée</span>`;
        document.getElementById("inscrire_error").innerHTML = inner;
    }else{
        window.location.href = "connection.html";
    }
}
// Récupère les différentes information du form, les vérifies, et fais une requête POST pour ajouter l'utilisateur
function inscription(){
    mail = document.getElementById("mail").value;
    document.getElementById('mail').value = "";
    nom = document.getElementById("nom").value
    document.getElementById('nom').value = "";
    prenom = document.getElementById("prenom").value
    document.getElementById('prenom').value = "";
    mdp = document.getElementById("mdp").value
    document.getElementById('mdp').value = "";
    cmdp = document.getElementById("cmdp").value
    document.getElementById('cmdp').value = "";

    if(mail!="" && nom!="" && prenom!="" && mdp!="" && cmdp!=""){
        if(mail.includes('@') && mail[mail.length-1]!='@'){
            if(mdp==cmdp){
                request = 'mail='+mail+'&nom='+nom+'&prenom='+prenom+'&mdp='+mdp;
                ajaxRequest('POST','../lib/request.php/inscription/',confirm,request);
            }else{
                inner = `<span style="color:red;">Veuillez renseigner le même mot de passe</span>`;
                document.getElementById("inscrire_error").innerHTML = inner;
            }
        }else{
            inner = `<span style="color:red;">Adresse mail incorrect</span>`;
            document.getElementById("inscrire_error").innerHTML = inner;
        }
    }else{
        inner = `<span style="color:red;">Veuillez renseigner tous les champs de textes</span>`;
        document.getElementById("inscrire_error").innerHTML = inner;
    }
}   

//=======================================================LISTENER============================================================//
// Ecoute le bouton d'inscription
function listener(){
    document.getElementById("inscrire").addEventListener("click", function(event){
        event.preventDefault();
        inscription();
    });
}
listener();