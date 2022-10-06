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

async function sendData(){
    let form = new FormData(document.getElementById("form"));

    const data = Object.fromEntries(form.entries());
}
