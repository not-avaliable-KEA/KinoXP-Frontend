

//get movieData

const url = "localhost:8080/api/v1/movieListings";

async function getMovielistings(){
    const response = await fetch(url)
    const movieListings = await response.json();

    console.log(movieListings)

    //gennemgå movieListings

    let movietitle = document.getElementById("name")


    for(let i; i<movieListings.length; i++){
        movietitle.innerHTML += movieListings[i].name
    }

    
     
}