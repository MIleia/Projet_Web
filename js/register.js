if(sessionStorage.getItem('connecté')=='True'){
    window.location.href = "/pages/accueil.html";
}

function connection(){
    sessionStorage.setItem('connecté', 'True');
    window.location.href = "/pages/accueil.html";
}   

function inscription(){


    sessionStorage.setItem('connecté', 'True');
    window.location.href = "pages/accueil.html";
}   


function listener(){
    document.getElementById("connect").addEventListener("click", function(event){
        event.preventDefault();
        connection();
    });
    document.getElementById("inscrire").addEventListener("click", function(event){
        event.preventDefault();
        inscription();
    });
}

listener();