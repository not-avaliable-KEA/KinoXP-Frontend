const url = "http://localhost:8080/api/v1/movies/";



async function initMovieInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')
  

    const response = await fetch(url + id +  "/full");
    const movieInfo = await response.json();

    console.log(movieInfo);

    document.getElementById("name1").innerHTML = movieInfo.name;
    document.getElementById("genre").innerHTML = movieInfo.genre;
    document.getElementById("length").innerHTML = movieInfo.length
    document.getElementById("description").innerHTML = movieInfo.description;
    document.getElementById("actors").innerHTML = movieInfo.actors;
    document.getElementById("directors").innerHTML = movieInfo.director
    document.getElementById("ageLimit").innerHTML = movieInfo.ageLimit
}

initMovieInfo();






/*{
    "id": 1,
    "name": "name1",
    "genre": "Genre",
    "length": 1.2,
    "actors": "actors",
    "director": "director",
    "ageLimit": 13,
    "description": "beskrivelse",
    "movieListings": [
        {
            "id": 1,
            "movieTheater": {
                "id": 1,
                "name": "Bio 1 ",
                "numberOfRows": 25,
                "numberOfSeats": 16
            },
            "date": "2022-10-12 10:29"
        },
        {
            "id": 2,
            "movieTheater": {
                "id": 2,
                "name": "Bio 2 ",
                "numberOfRows": 20,
                "numberOfSeats": 12
            },
            "date": "2022-10-11 13:30"
        },
        {
            "id": 3,
            "movieTheater": {
                "id": 2,
                "name": "Bio 2 ",
                "numberOfRows": 20,
                "numberOfSeats": 12
            },
            "date": "2022-10-11 13:30"
        }
    ]
}*/