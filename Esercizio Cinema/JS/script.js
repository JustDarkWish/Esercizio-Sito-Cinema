const arrayFilm = [
    "https://www.omdbapi.com/?t=your+name&y=2016&apikey=93b236e6&",
    "https://www.omdbapi.com/?t=jujutsu+kaisen&y=2021&apikey=93b236e6&",
    "http://www.omdbapi.com/?t=Men+in+Black&y=1997&apikey=93b236e6&"
];
let locandinaFilm = document.querySelector('#locandinaFilm')
let posizione = 0;
let arraySalvati = [];
let informazioniFilm = document.querySelector('#movieInfoJs')

let btnBack = document.querySelector('#bottoneBack');
let btnNext = document.querySelector('#bottoneNext');

/* ---------------------------------------------- Script ---------------------------------------------- */

arrayFilm.forEach(urlFilm => {

    fetch(urlFilm)
    .then(response => {
        return response.json()
    })
    .then(data => {
        arraySalvati.push(data);

        if(arraySalvati.length == 1){
            creaCarosello()
        }
    })
})

function creaCarosello() {


    let posterUrl = arraySalvati[posizione].Poster;
    let posterImg = document.createElement('img');

    posterImg.src = posterUrl;

    locandinaFilm.innerHTML = '';
    locandinaFilm.appendChild(posterImg);
}

function back() {
    posizione--
    
    if(posizione < 0) {
        posizione = 2;
    }

    creaCarosello();
}

btnBack.addEventListener('click', back);

function next() {
    posizione++
    
    if(posizione > 2) {
        posizione = 0;
    }

    creaCarosello();
}

btnNext.addEventListener('click', next);

