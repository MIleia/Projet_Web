if(sessionStorage.getItem('connecté')=='True'){
    window.location.href = "/pages/accueil.html";
}



function connection(){
    sessionStorage.setItem('connecté', 'True');
    window.location.href = "pages/accueil.html";
}   


function listener(){
    document.getElementById("connect").addEventListener("click", function(event){
        event.preventDefault();
        connection();
    });
}

listener();