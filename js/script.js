






function listener(){
    document.getElementById("envoyer").addEventListener("click", function(event){
        event.preventDefault();
        inscription();
    });
}

listener();