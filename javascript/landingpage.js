getMovies();

async function getMoviesAndGenres(){
    const moviesUrl= "http://localhost:8080/api/v1/movies";
    const movieResponse = await fetch(moviesUrl);
    const movieData = await movieResponse.json();
    console.log(movieData);

    const genreUrl = "http://localhost:8080/api/v1/genre";
    const genreResponse = await fetch(genreUrl);
    const genreData = await genreResponse.json();
    console.log(genreData);

    const movieListe = Array.from(movieData);

    let table1 = document.getElementById('table1');
    table1.innerHTML += `<tr>
        <th>Title</th>
        <th>genre</th>
        <th>længde</th>
        <th>Skuespillere</th>
    </tr>`


    for(let i=0; i<movieListe.length; i++){
        table1.innerHTML += "<tr>" +
            "<tr>" + movieListe[i].name +"</tr>" + 
            "<tr>" + movieListe[i].genre + "</tr>" +
            "<tr>" + movieListe[i].length + "</tr>" +
            "<tr>" + movieListe[i].actors + "</tr>" +

        "</tr>"
    }

}

