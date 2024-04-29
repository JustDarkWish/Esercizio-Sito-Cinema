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
  console.log(arraySalvati);
  
  function creaCarosello() {
    let { Poster: posterUrl, Title: posterTitleText, Year: posterYearDate, Actors: posterActorsFilm, Runtime: posterRuntimeFilm, Genre: posterGenreFilm } = arraySalvati[posizione];
  
    let posterImg = document.createElement('img');
    posterImg.src = posterUrl;
  
    let posterTitle = document.createElement('h2');
  
    posterTitle.classList.add("titoloFilm");
  
    posterTitle.innerHTML = `<a href="https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(posterTitleText)}" target="_blank">${posterTitleText}</a>`;
  
    let posterYear = document.createElement('p');
    posterYear.textContent = posterYearDate;
  
    let posterActors = document.createElement('p');
    
    posterActors.classList.add('movieActors');
    posterActors.innerHTML = posterActorsFilm.split(", ").map(actor => {
        return `<a href="https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(actor)}" target="_blank">${actor}</a>`;
    }).join(", ");
  
    let posterRuntime = document.createElement('p');
    posterRuntime.textContent = posterRuntimeFilm;
  
    let posterGenre = document.createElement('p');
    posterGenre.textContent = posterGenreFilm;
  
    locandinaFilm.innerHTML = '';
    locandinaFilm.appendChild(posterTitle);
    locandinaFilm.appendChild(posterImg);
    locandinaFilm.appendChild(posterActors);
    locandinaFilm.appendChild(posterRuntime);
    locandinaFilm.appendChild(posterYear);
    locandinaFilm.appendChild(posterGenre);
  }
  
   
  
  
  
  
  // funzione per il tasto
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
  
  
  /*****************************************SECONDA PARTE***********************************************************/
  
  
  
  let locandinaFilm_2 = document.querySelector('#Locandina_2');
  let inputText = document.querySelector('#inputText').value;
  let btnCerca = document.querySelector('#btnCerca');
  
  
  
  function cercaFilmDaInput() {
  
  
  
  let ricercaFilm = document.querySelector('#inputText').value.trim(); //trim per non avere spazi
  const apiKey = '93b236e6';
  
  const url = encodeURI(`http://www.omdbapi.com/?t=${ricercaFilm}&apikey=${apiKey}`);
  console.log(url);
  
  
  
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore nella richiesta API');
      }
      return response.json();
    })
    .then(data => {
      // Qui puoi gestire la risposta ricevuta, ad esempio:
      postaInfoFilm(data);
  
      // Esegui ulteriori operazioni con i dati, se necessario
    })
    .catch(errore => {
      console.error('Si è verificato un errore:', errore);
    });
  }
  
  
  
  btnCerca.addEventListener('click', cercaFilmDaInput);
  
  
  
  function postaInfoFilm(data) {
    
    if (data != null && data.Title != null) {
      console.log('dati validi');
    locandinaFilm_2.innerHTML = 
      `
      <div class="padre">  
        <div class="container_plot">
          <h3>Trama di ${data.Title}:</h3>
          <p>${data.Plot}</p>
        </div>
  
        <div class="container_poster">
          <h2>${data.Title}</h2>
          <img alt="poster" src="${data.Poster}">
        </div>
      </div>
      `;  
  
     
    } else {
      locandinaFilm_2.innerHTML = '<p>Nessun film trovato con questo titolo</p>';
    }
   
  }