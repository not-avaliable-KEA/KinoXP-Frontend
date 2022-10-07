const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

//const url = "https://kinoxp-na.azurewebsites.net/api/v1/movies";
const url = "http://localhost:8080/api/v1/movies";

function chechIfUpdate(){
    console.log(id);
    if (id != null && id > 0) {
        showMovie();
    } else {
        id = null;
    }
}

chechIfUpdate();

async function showMovie(){
    const response = await fetch(url + "/" + id);
    const movieData = await response.json();

    document.getElementById("name").value = movieData.name;
    document.getElementById("genre").value = movieData.genre;
    document.getElementById("length").value = movieData.length;
    document.getElementById("actors").value = movieData.actors;
    document.getElementById("director").value = movieData.director;
    document.getElementById("ageLimit").value = movieData.ageLimit;
    document.getElementById("button").innerHTML = 'Opdater';
}

function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    if (id != null) {
        fetch(url + "/" + id,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        })
            .then((response) => response.json())
            .then(() => window.location.href = "/html/viewMovies.html")
            .catch((error) => console.error('Error', error));

    } else {
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then(() => window.location.href = "/html/viewMovies.html")
            .catch((error) => console.error('Error', error));
        //redirect to view all
    }
}
const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);