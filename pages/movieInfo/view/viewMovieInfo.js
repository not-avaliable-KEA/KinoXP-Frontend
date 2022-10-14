const url = "https://kinoxp-na.azurewebsites.net/api/v1/movies/";



async function initMovieInfo() {
    // get which movie to show
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')
  
    // get the full movie data
    const response = await fetch(url + id +  "/full");
    const movieInfo = await response.json();

    // overwrite standard data
    document.getElementById("name1").innerHTML = movieInfo.name;
    document.getElementById("genre").innerHTML = movieInfo.genre;
    document.getElementById("length").innerHTML = movieInfo.length
    document.getElementById("description").innerHTML = movieInfo.description;
    document.getElementById("actors").innerHTML = movieInfo.actors;
    document.getElementById("directors").innerHTML = movieInfo.director
    document.getElementById("ageLimit").innerHTML = movieInfo.ageLimit

    // setting the page title
    document.title = movieInfo.name;

    // get the movieListings and sort them by date oldest to newest
    const movieListings = Array.from(movieInfo.movieListings)
                          .sort((l1, l2) => l1.date.localeCompare(l2.date));

    const tablebody = document.getElementById("tablebody");
    
    const d = Date.now()
    // add the listings to the table
    movieListings
    .filter((listing) => {
        let str = listing.date.replace(" ", "T");
        return Date.parse(str) > d;
        
    })
    .forEach((listing) => {
        let row = document.createElement("tr");

        row.innerHTML = `
        <tr>
            <td>${listing.movieTheater.name}</td>
            <td>${listing.date}</td>
            <td><a href="to be added ! ?id=${listing.id}"><button class="btn btn-primary reserveButton">Bestil</button></a></td>
        </tr>`;

        tablebody.appendChild(row);
    });
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