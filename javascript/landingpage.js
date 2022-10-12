getMoviesAndGenres();

async function getMoviesAndGenres(){
    const moviesUrl= "http://localhost:8080/api/v1/movies";
    //const moviesUrl = "https://kinoxp-na.azurewebsites.net/api/v1/movies";
    const movieResponse = await fetch(moviesUrl);
    const movieData = await movieResponse.json();

    const movieListe = Array.from(movieData);
    const genreMap = new Map();

    for(let i=0; i<movieListe.length; i++){
      genreMap.set(movieListe[i].genre, movieListe[i].genre)
    }

    const GenreValues = Array.from(genreMap.values());

    for(let i=0; i<genreMap.size; i++){
      let element = document.createElement("div")

      document.getElementById("carousel-inner").appendChild(element)

      if (i === 0){
      element.className = "carousel-item active"
      element.id = `carousel-item-${GenreValues[i]}`
    } else {
      element.className = "carousel-item"
      element.id = `carousel-item-${GenreValues[i]}`
    }

      let carouselContainer = document.createElement("div")
      document.getElementById(`carousel-item-${GenreValues[i]}`).appendChild(carouselContainer)
      carouselContainer.className = "carousel-container container-fluid"
      carouselContainer.id = `carousel-container-${GenreValues[i]}`

      carouselContainer.innerHTML = `<h2 class="carousel-heading">${GenreValues[i]}</h2>`

      let row = document.createElement("div")
      document.getElementById(`carousel-container-${GenreValues[i]}`).appendChild(row)
      row.className = "row"
      row.id = `row-${GenreValues[i]}`

      for (let ii = 0; ii < movieListe.length; ii++){

        if (movieListe[ii].genre === GenreValues[i]){
          let elem = document.createElement("div")

            document.getElementById(`row-${GenreValues[i]}`).appendChild(elem)

            elem.className = 'col-6 col-md-4 col-xl-2'
            
            elem.innerHTML = `<a href="/pages/movieInfo/view/viewMovieInfo.html?id=${movieListe[ii].id}">
                                <div class="card"> 
                                <img src="https://via.placeholder.com/150" class="card-img-top" />  
                                <div class="card-body">  
                                    <h5 class="card-title"> ` + movieListe[ii].name + `</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${movieListe[ii].length} min.</h6> 
                                    </div>
                                </div>
                                </a>`
        }

      }
    
    }
    
}

