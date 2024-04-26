const arrayFilm = [
    "https://www.omdbapi.com/?t=your+name&y=2016&apikey=93b236e6&",
    "https://www.omdbapi.com/?t=jujutsu+kaisen&y=2021&apikey=93b236e6&",
    "http://www.omdbapi.com/?t=Men+in+Black&y=1997&apikey=93b236e6&"
];
let locandinaFilm = document.querySelector('#locandinaFilm');
let posizione = 0;
let arraySalvati = [];
let informazioniFilm = document.querySelector(".movieInfo");

let btnBack = document.querySelector('#bottoneBack');
let btnNext = document.querySelector('#bottoneNext');

let movieTitle = document.querySelector(".movieTitle");
let inputText = document.querySelector(".input");
let btnCerca = document.querySelector("#btnCerca");

/* ---------------------------------------------- Script ---------------------------------------------- */

arrayFilm.forEach(urlFilm => {

    fetch(urlFilm)
    .then(response => {
        return response.json()
    })
    .then(data => {
        arraySalvati.push(data);

        if(arraySalvati.length == 1){
            creaCarosello();
            
            
        }
    })
})

function creaCarosello() {
    let posterUrl = arraySalvati[posizione].Poster;
  let posterImg = document.createElement('img');

  let posterTitleText = arraySalvati[posizione].Title;
  let posterTitle = document.createElement('h2');

  let posterYearDate = arraySalvati[posizione].Year;
  let posterYear = document.createElement('p');

  let posterActorsFilm = arraySalvati[posizione].Actors;
  let posterActors = document.createElement('p');

  let posterRuntimeFilm= arraySalvati[posizione].Runtime;
  let posterRuntime = document.createElement('p');

  let posterGenreFilm = arraySalvati[posizione].Genre;
  let posterGenre = document.createElement('p');

  posterImg.src = posterUrl;
  posterTitle.textContent = posterTitleText;
  posterYear.textContent = posterYearDate;
  posterActors.textContent = posterActorsFilm;
  posterRuntime.textContent = posterRuntimeFilm;
  posterGenre.textContent = posterGenreFilm;



  locandinaFilm.innerHTML = '';

  locandinaFilm.appendChild(posterTitle);
  locandinaFilm.appendChild(posterImg);
  locandinaFilm.appendChild(posterActors);
  locandinaFilm.appendChild(posterRuntime);
  locandinaFilm.appendChild(posterYear);
  locandinaFilm.appendChild(posterGenre);

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

function barraRicerca() {
    if (inputText.value != '') {
        let urlDinamico = `http://www.omdbapi.com/?s=${inputText.value}&apikey=93b236e6&`;
        fetch(urlDinamico)
        .then(response => {
            return response.json();
        })
        .then(data => {
            // Processa i dati ricevuti
            if (data.Search) {
                // Cicla attraverso i risultati della ricerca e crea elementi HTML per ognuno
                data.Search.forEach(result => {
                    let movieTitle = result.Title;
                    let moviePoster = result.Poster;
                    
                    // Crea elementi HTML per visualizzare i risultati della ricerca
                    let movieResult = document.createElement('div');
                    movieResult.classList.add('movieResult');

                    let titleElement = document.createElement('h3');
                    titleElement.textContent = movieTitle;
                    
                    let posterElement = document.createElement('img');
                    posterElement.src = moviePoster;
                    
                    
                    // Aggiungi gli elementi creati alla pagina
                    movieResult.appendChild(titleElement);
                    movieResult.appendChild(posterElement);
                    
                    // Aggiungi il risultato della ricerca alla pagina
                    document.body.appendChild(movieResult);
                    
                    
                });
            } else {
                // Gestisci il caso in cui la ricerca non restituisce risultati
                console.log("Nessun risultato trovato");
            }
        })
        .catch(error => {
                // Gestisci eventuali errori nella chiamata all'API
                console.error('Si è verificato un errore:', error);
            });
    }
}
btnCerca.addEventListener("click",barraRicerca);
//    http://www.omdbapi.com/?s=your+name.&apikey=93b236e6&",