let id
let reservation

import {config} from '/javascript/config.js';
const url =  config.url + "/api/v1/reservations";
const movieListingurl =  config.url + "/api/v1/movieListings";


export async function initCreateReservation(data) {
    id = data?.id

    if (id != null && id > 0) {
        await getReservation();
        document.getElementById("movieListingId").innerHTML = "";
        document.getElementById("button").innerHTML = "Godkend";
    } else {
        id = null;
    }
  
    getMovieListings()

  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
}

async function getReservation() {
    // get Reservation
    const response = await fetch(url + "/" + id);
    reservation = await response.json();

    console.log(JSON.stringify(reservation))
    
    document.getElementById("amountOfSeats").value = reservation.amountOfSeats;
    document.getElementById("meetsAgeRequirement").checked = reservation.meetsAgeRequirement;
    document.getElementById("name").value = reservation.name;
}

async function getMovieListings(){
    // get listings
    const response = await fetch(movieListingurl);
    let listings = await response.json();
    const listingsArray = Array.from(listings);

    // get the selector 
    const movieListingSelector = document.getElementById("movieListingId");

    // put each of the movie listings into the array
    listingsArray.forEach((listing) => {
        if (reservation?.movieListingId == listing.id) {
            movieListingSelector.innerHTML += `<option value="${listing.id}" selected> ${listing.date} - ${listing.id} - ${listing.movieId} - ${listing.movieTheaterId}</option>`
        } else {
            movieListingSelector.innerHTML += `<option value="${listing.id}">${listing.date} - ${listing.id} - ${listing.movieId} - ${listing.movieTheaterId}</option>`
        }
    });
}

function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    data.append("meetsAgeRequirement", document.getElementById("meetsAgeRequirement").checked)

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
        .then(() => window.router.navigate("se-reservationer"))
        .catch((error) => console.error('Error', error));
}

/*
 {
        "id": 2,
        "name": "name2",
        "amountOfSeats": 2,
        "meetsAgeRequirement": false,
        "movieListingId": 1
    }
*/
  