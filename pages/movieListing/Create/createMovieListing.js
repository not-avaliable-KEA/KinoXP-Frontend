let id

import {config} from '/javascript/config.js';
const url =  config.url + "/api/v1/movieListings";
const movieUrl =  config.url + "/api/v1/movies";
const movieTheaterUrl =  config.url + "/api/v1/movietheaters";


export function initCreateMovieListing(data) {
    id = data?.id

    getMovies();
    getMovieTheaters();

    console.log();
    if (id != null && id > 0) {

    } else {
        id = null;
    }
  
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
}

async function getMovies(){
    // get movies
    const response = await fetch(movieUrl);
    const movies = await response.json();
    const moviesArray = Array.from(movies);

    // get the selector 
    const movieSelector = document.getElementById("movieId");

    // put each of the movies into the array
    moviesArray.forEach((movie) => {
        movieSelector.innerHTML += `<option value="${movie.id}">${movie.name}</option>`
    });
}

async function getMovieTheaters(){
    // get movies
    const response = await fetch(movieTheaterUrl);
    const movies = await response.json();
    const moviesArray = Array.from(movies);

    // get the selector 
    const movieSelector = document.getElementById("movieTheaterId");

    // put each of the movies into the array
    moviesArray.forEach((movie) => {
        movieSelector.innerHTML += `<option value="${movie.id}">${movie.name}</option>`
    });
}


function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    data.set("date", (data.get("date").replace("T", " ")));

    const value = Object.fromEntries(data.entries());

    console.log(JSON.stringify(value));
    if (id != null) {
        sendRequest("PATCH", url + "/" + id, value);
    } else {
        sendRequest("POST", url, value);
    }
}


function sendRequest(method, url, value) {
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
    })
        .then((response) => response.json())
                    //redirect to view all
        .then(() => window.router.navigate("se-forestilinger"))
        .catch((error) => console.error('Error', error));
}
  