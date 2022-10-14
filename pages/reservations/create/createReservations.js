

//get movieListing object with movieName and theater

const url = "https://kinoxp-na.azurewebsites.net/api/v1/reservations/"

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id')


async function getMovielistings(){
    const listingsurl = "http://localhost:8080/api/v1/movieListings/" + id + "/test";
    const response = await fetch(listingsurl)
    const movieListings = await response.json();


    console.log(movieListings)

    //gennemgå movieListings

    document.getElementById("movieName").innerHTML = movieListings.movie.name;
    document.getElementById("playtime").innerHTML = movieListings.date;
    document.getElementById("movie-theater").innerHTML = movieListings.movieTheater.name;
    
    document.getElementById("ageLimit").innerHTML = movieListings.movie.ageLimit;

     

  const form = document.querySelector('form');
  //eventlistener listens for actions from type name in HTML, and runs method (handlesubmit)
  form.addEventListener('submit', handleSubmit);
}

getMovielistings();


function handleSubmit(event) {
    event.preventDefault();

    if (!document.getElementById("meetsAgeRequirement").checked) return;

    //formData APi that pulls data from form, takes event (parameter) from HTML form element.
    const data = new FormData(event.target);


    data.append("meetsAgeRequirement", document.getElementById("meetsAgeRequirement").checked)
    data.append("movieListingId", id)

    //entries er key /values pairs som OBJECT kan lave om til et rigtigt object. 
    const value = Object.fromEntries(data.entries());



    console.log(JSON.stringify(value));

    sendRequest("POST", url, value);
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
        .then(() => window.location.href = "/")
        .catch((error) => console.error('Error', error));
}
/*
date
: 
"2022-10-14 12:26"
id
: 
1
movie
: 
actors
: 
" Martin Freeman, Ian McKellen, Richard Armitage, Andy Serkis"
ageLimit
: 
11
description
: 
"A reluctant Hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home, and the gold within it from the dragon Smaug."
director
: 
"Peter Jackson"
genre
: 
"Fantasy"
id
: 
1
length
: 
169
name
: 
"Hobbitten: En uventet rejse"
[[Prototype]]
: 
Object
movieTheater
: 
id
: 
1
name
: 
"Bio 1 "
numberOfRows
: 
25
numberOfSeats
: 
16
*/
