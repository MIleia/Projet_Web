if(sessionStorage.getItem('connecté')!='True'){
    window.location.href = "../connection.html";
}else{
    prenom = sessionStorage.getItem('prenom');
    nom = sessionStorage.getItem('nom');
    inner = prenom+' '+nom;
    document.getElementById("profil").innerHTML = inner;
}

function printMap(arbres) {
    const lats = arbres.map(arbre => arbre.latitude);
    const lons = arbres.map(arbre => arbre.longitude);
    const texts = arbres.map(arbre => `
        <b>${arbre.fk_nomtech}</b><br>
        Hauteur Totale: ${arbre.haut_tot} m<br>
        Hauteur Tronc: ${arbre.haut_tronc} m<br>
        Diamètre Tronc: ${arbre.tronc_diam} cm<br>
        Remarquable: ${arbre.remarquable ? 'Oui' : 'Non'}<br>
        État: ${arbre.fk_arb_etat}<br>
        Stade de Développement: ${arbre.fk_stadedev}<br>
        Situation: ${arbre.fk_situation}<br>
        Port: ${arbre.fk_port}<br>
        Pied: ${arbre.fk_pied}
    `);

    const data = [{
        type: 'scattermapbox',
        lat: lats,
        lon: lons,
        mode: 'markers',
        marker: {
            size: 10,
            color: 'rgb(0, 150, 0)'
        },
        text: texts,
        hoverinfo: 'text'
    }];

    const layout = {
        mapbox: {
            style: 'open-street-map',
            center: {
                lat: 49.8483,
                lon: 3.2865
            },
            zoom: 12
        },
        margin: {
            t: 0,
            b: 0
        }
    };
    Plotly.newPlot('map', data, layout);
}

function printtab(data){
    inner= '';
    for(let i=0; i<data.length; i++){
        inner += `  <tr>
                        <td class="align-middle"><input class="form-check-input" type="radio" name="choix_arbre" value="`+data[i]['id']+`"></td>
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

    remarquable = document.getElementById("remarquable").value;
    fk_arb_etat = document.getElementById("fk_arb_etat").value;
    fk_stadedev = document.getElementById("fk_stadedev").value;
    fk_situation = document.getElementById("fk_situation").value;
    inner = `   <th></th>
                <th scope="col" class="align-middle">Nom de l'espèce</th>
                <th scope="col" class="align-middle">Hauteur totale</th>
                <th scope="col" class="align-middle">Hauteur du tronc</th>
                <th scope="col" class="align-middle">Diamètre du tronc</th>
                <th scope="col" class="align-middle" id="clremarquable" value="`+remarquable+`">Remarquable</th>
                <th scope="col" class="align-middle">Longitude</th>
                <th scope="col" class="align-middle">Latitude</th>
                <th scope="col" class="align-middle" id="clfk_arb_etat" value="`+fk_arb_etat+`">État de l'arbre</th>
                <th scope="col" class="align-middle" id="clfk_stadedev" value="`+fk_stadedev+`">Stade de dév.</th>
                <th scope="col" class="align-middle" id="clfk_situation" value="`+fk_situation+`">Situation</th>
                <th scope="col" class="align-middle">Port</th>
                <th scope="col" class="align-middle">Pied</th>`;
    document.getElementById("th").innerHTML = inner;


    printMap(data);
}
ajaxRequest('GET','../lib/request.php/tab',printtab);


function trier(){
    remarquable = document.getElementById("remarquable").value;
    fk_arb_etat = document.getElementById("fk_arb_etat").value;
    fk_stadedev = document.getElementById("fk_stadedev").value;
    fk_situation = document.getElementById("fk_situation").value;

    ajaxRequest('GET','../lib/request.php/tabmodif?remarquable='+remarquable+'&fk_arb_etat='+fk_arb_etat+'&fk_stadedev='+fk_stadedev+'&fk_situation='+fk_situation,printtab);
}




function gopredict_clusters(data){
    sessionStorage.setItem('data', JSON.stringify(data));
    window.location.href = "predict_clusters.html";
}
function predict_clusters(){
    remarquable = document.getElementById("clremarquable").getAttribute("value");
    fk_arb_etat = document.getElementById("clfk_arb_etat").getAttribute("value");
    fk_stadedev = document.getElementById("clfk_stadedev").getAttribute("value");
    fk_situation = document.getElementById("clfk_situation").getAttribute("value");

    ajaxRequest('GET','../lib/request.php/predict_cluster?remarquable='+remarquable+'&fk_arb_etat='+fk_arb_etat+'&fk_stadedev='+fk_stadedev+'&fk_situation='+fk_situation,gopredict_clusters);
}

function gopredict_age(data){
    sessionStorage.setItem('longitude', data['longitude']);
    sessionStorage.setItem('latitude', data['latitude']);
    sessionStorage.setItem('haut_tot', data['haut_tot']);
    sessionStorage.setItem('haut_tronc', data['haut_tronc']);
    sessionStorage.setItem('tronc_diam', data['tronc_diam']);
    sessionStorage.setItem('fk_prec_estim', data['fk_prec_estim']);
    window.location.href = "predict_age.html";
}
function predict_age(){
    id = document.querySelector('input[name=choix_arbre]:checked');
    if (id == null){
        inner = `<span style="color:red">Veuillez sélectionner un arbre</span>`;
        document.getElementById("error_predict").innerHTML = inner;
    }else{
        ajaxRequest('GET','../lib/request.php/predict_age?id='+id.value,gopredict_age);
    }
}

function gopredict_essouche(data){
    sessionStorage.setItem('longitude', data['longitude']);
    sessionStorage.setItem('latitude', data['latitude']);
    sessionStorage.setItem('fk_port', data['fk_port']);
    sessionStorage.setItem('fk_pied', data['fk_pied']);
    sessionStorage.setItem('fk_revetement', data['fk_revetement']);
    sessionStorage.setItem('fk_situation', data['fk_situation']);
    sessionStorage.setItem('age_estim', data['age_estim']);
    window.location.href = "predict_essouche.html";
}
function predict_essouche(){
    id = document.querySelector('input[name=choix_arbre]:checked');
    if (id == null){
        inner = `<span style="color:red">Veuillez sélectionner un arbre</span>`;
        document.getElementById("error_predict").innerHTML = inner;
    }else{
        ajaxRequest('GET','../lib/request.php/predict_essouche?id='+id.value,gopredict_essouche);
    }
}




function listener(){
    document.getElementById("trie").addEventListener("click", function(event){
        event.preventDefault();
        trier();
    });
    document.getElementById("predict_clusters").addEventListener("click", function(event){
        event.preventDefault();
        predict_clusters();
    });
    document.getElementById("predict_age").addEventListener("click", function(event){
        event.preventDefault();
        predict_age();
    });
    document.getElementById("predict_essouche").addEventListener("click", function(event){
        event.preventDefault();
        predict_essouche();
    });
}
listener();
