// Si l'utilisateur est connecté, le redirige vers la page d'accueil
if(sessionStorage.getItem('connecté')=='True'){
    window.location.href = "/pages/accueil.html";
}


//======================================================CONNECTION===========================================================//
// Dit si le mot de passe ou le mail est incorrect, sinon envoie à la page d'accueil 
function confirm(data){
    if(data=="error"){
        inner = `<span style="color:red">Adresse mail ou mot de passe incorrect</span>`;
        document.getElementById("connect_error").innerHTML = inner;
    }else{
        sessionStorage.setItem('mail', data[0]);
        sessionStorage.setItem('nom', data[1]);
        sessionStorage.setItem('prenom', data[2]);
        sessionStorage.setItem('connecté', 'True');
        window.location.href = "pages/accueil.html";
    }
}
// Récupère les champs de connection et fait une requête GET au serveur et renvoie le résultat dans confirm
function connection(){
    mail = document.getElementById("mail").value;
    document.getElementById('mail').value = "";
    mdp = document.getElementById("mdp").value
    document.getElementById('mdp').value = "";

    if(mail!="" && mdp!=""){
        if(mail.includes('@') && mail[mail.length-1]!='@'){
            ajaxRequest('GET','../lib/request.php/connection?mail='+mail+'&mdp='+mdp,confirm);
        }else{
            inner = `<span style="color:red;">Adresse mail incorrect</span>`;
            document.getElementById("connect_error").innerHTML = inner;
        }
    }else{
        inner = `<span style="color:red;">Veuillez renseigner tous les champs de textes</span>`;
        document.getElementById("connect_error").innerHTML = inner;
    }
}   


//=======================================================LISTENER============================================================//
// Ecoute le bouton de connection, et si il est appuyer, appel la fonction connection
function listener(){
    document.getElementById("connect").addEventListener("click", function(event){
        event.preventDefault();
        connection();
    });
}
listener();