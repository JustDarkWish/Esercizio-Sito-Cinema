const urlFilmUno = ("https://www.omdbapi.com/?t=your+name&y=2016&apikey=93b236e6&");
const urlFilmDue = ("https://www.omdbapi.com/?t=jujutsu+kaisen&y=2021&apikey=93b236e6&");
const urlFilmTre = ("http://www.omdbapi.com/?t=Men+in+Black&y=1997&apikey=93b236e6&");

fetch(urlFilmUno)

.then(data => {
    data.json()
})

.then(response => {

    stampaTitolo(response);

    creaCarosello(response);

    stampaInformazioni(response);
});

fetch(urlFilmDue)

.then(data => {
    data.json()
})

.then(response => {

    stampaTitolo(response);

    creaCarosello(response);

    stampaInformazioni(response);
})

fetch(urlFilmTre)

.then(data => {
    data.json()
})

.then(response => {

    stampaTitolo(response);

    creaCarosello(response);

    stampaInformazioni(response);
})