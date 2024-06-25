if(sessionStorage.getItem('connecté')=='True'){
    window.location.href = "/pages/accueil.html";
}



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
        if(mdp==cmdp){
            //sessionStorage.setItem('connecté', 'True');
            //window.location.href = "pages/accueil.html";
        }else{
            inner = `<span color="red">Veuillez renseigner le même mot de passe</span>`;
            document.getElementById("inscrire_error").innerHTML = inner;
        }
    }else{
        inner = `<span color="red">Veuillez renseigner tous les champs de textes</span>`;
        document.getElementById("inscrire_error").innerHTML = inner;
    }
}   


function listener(){
    document.getElementById("inscrire").addEventListener("click", function(event){
        event.preventDefault();
        inscription();
    });
}

listener();