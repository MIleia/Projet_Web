if(sessionStorage.getItem('connecté')!='True'){
    window.location.href = "../connection.html";
}else if(sessionStorage.getItem('data')=='' ){
    window.location.href = "visualisation.html";
}else{
    prenom = sessionStorage.getItem('prenom');
    nom = sessionStorage.getItem('nom');
    inner = prenom+' '+nom;
    document.getElementById("profil").innerHTML = inner;
}


var datarbre = JSON.parse(sessionStorage.getItem('data'));
inner = "Nombre d'arbres : "+datarbre.length;
document.getElementById("nb_arb").innerHTML = inner;



function getColor(cluster) {
    switch(cluster) {
        case 'Petit':
            return 'rgb(0, 255, 0)';
        case 'Moyen':
            return 'rgb(0, 0, 255)';
        case 'Grand':
            return 'rgb(255, 0, 0)';
    }
}

function printMap(res){
    res = res.map(element => {
        let taille;
        switch(element.taille_arbre) {
            case 0:
                taille = "Petit";
                break;
            case 1:
                taille = "Moyen";
                break;
            case 2:
                taille = "Grand";
                break;
        }
        return { 'taille_arbre': taille };
    });
    let arbres = datarbre.map((element, index) => {
        return { ...element, ...res[index] };
    });

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
        Pied: ${arbre.fk_pied}<br>
        Cluster: ${arbre.taille_arbre}
    `);

    const data = [{
        type: 'scattermapbox',
        lat: lats,
        lon: lons,
        mode: 'markers',
        marker: {
            size: 10,
            color: arbres.map(arbre => getColor(arbre.taille_arbre))
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

fetch('../ressources/F1/Result.json')
    .then((response) => response.json())
    .then((json) => {
        printMap(json);
    });


sessionStorage.setItem('data', '');


