function connection(){
    sessionStorage.setItem('connecté', 'True');
    window.location.href = "../pages/formulaire.html";
}   




function listener(){
    document.getElementById("connect").addEventListener("click", function(event){
        event.preventDefault();
        connection();
    });

}

listener();