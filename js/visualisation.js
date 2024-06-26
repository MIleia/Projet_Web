if(sessionStorage.getItem('connecté')!='True'){
    window.location.href = "../connection.html";
}else{
    prenom = sessionStorage.getItem('prenom');
    nom = sessionStorage.getItem('nom');
    inner = prenom+' '+nom;
    document.getElementById("profil").innerHTML = inner;
}


function printtab(data){
    inner= '';
    for(let i=0; i<data.length; i++){
        inner += `  <tr>
                        <td class="align-middle"><input class="form-check-input" type="radio" name="choix_arbre" id="`+data[i]['id']+`"></td>
                        <td class="align-middle">`+data[i]['fk_nomtech']+`</td>
                        <td class="align-middle">`+data[i]['haut_tot']+`</td>
                        <td class="align-middle">`+data[i]['haut_tronc']+`</td>
                        <td class="align-middle">`+data[i]['tronc_diam']+`</td>
                        <td class="align-middle">`+data[i]['remarquable']+`</td>
                        <td class="align-middle">`+data[i]['longitude']+`</td>
                        <td class="align-middle">`+data[i]['latitude']+`</td>
                        <td class="align-middle">`+data[i]['fk_arb_etat']+`</td>
                        <td class="align-middle">`+data[i]['fk_stadedev']+`</td>
                        <td class="align-middle">`+data[i]['fk_situation']+`</td>
                        <td class="align-middle">`+data[i]['fk_port']+`</td>
                        <td class="align-middle">`+data[i]['fk_pied']+`</td>
                    </tr>`;
    }
    document.getElementById("tab").innerHTML = inner;
}

ajaxRequest('GET','../lib/request.php/tab',printtab);




