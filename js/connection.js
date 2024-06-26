if(sessionStorage.getItem('connecté')=='True'){
    window.location.href = "/pages/accueil.html";
}

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


function listener(){
    document.getElementById("connect").addEventListener("click", function(event){
        event.preventDefault();
        connection();
    });
}

listener();