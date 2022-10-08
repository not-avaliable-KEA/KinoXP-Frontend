const url = "https://kinoxp-na.azurewebsites.net/api/v1/movies";
//const url = "http://localhost:8080/api/v1/movies";

let id;

export function initCreateMovie(data) {
    id = data?.id

    console.log();
    if (id != null && id > 0) {
        showEmployee();
    } else {
        id = null;
    }
  
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
}

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
        fetch(url + "/" + id, {
            method:"PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        })
            .then((response) => response.json())
            .then(() => window.router.navigate("se-film"))
            .catch((error) => console.error('Error', error));

    } else {
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        })
            .then((response) => response.json())
            .then(() => window.router.navigate("se-film"))
            .catch((error) => console.error('Error', error));
        //redirect to view all
    }
}