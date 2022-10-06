getMoviesAndGenres();

async function getMoviesAndGenres(){
    const moviesUrl= "http://localhost:8080/api/v1/movies";
    const movieResponse = await fetch(moviesUrl);
    const movieData = await movieResponse.json();
    console.log(movieData);

    const genreUrl = "http://localhost:8080/api/v1/movies?genre";
    const genreResponse = await fetch(genreUrl);
    const genreData = await genreResponse.json();
    console.log(genreData);

    const movieListe = Array.from(movieData);

    function reducer(prev, curr){
        const currentGenre = curr.genre;
        console.log(currentGenre, prev[currentGenre])
        if(!prev[currentGenre]){
            prev[currentGenre] =[]
        }

        prev[currentGenre].push(curr)

        return prev;
    }
    
    let genreList = movieListe.reduce(reducer, {}) 

    console.log(genreList);

    const genres = Object.keys(genreList)
    const carousselpage = document.getElementById("movies");

    
    for(const genre of genres){
        const moviesInGenre = genreList[genre]
        for(const movie of moviesInGenre){

            carousselpage.innerHTML +=

            `<div class="col-6 col-md-4 col-xl-2">
            <div class="card" style="width: 100%;">
              <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${movie.name}</h5>
                <p class="card-text">
                
                <div><p>Genre: </p> ${movie.genre}</div>
                <div><p>Længde: </p>${movie.length}</div>
                <div><p>Skuespillere: </p>${movie.actors}</div> 

                </p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>`
            
        }
    }


}

