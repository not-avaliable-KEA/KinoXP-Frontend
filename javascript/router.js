import "https://unpkg.com/navigo"  //Will create the global Navigo object used below, framework/værktøj (skifter indhold på siderne, afhængigt af hvilket urL)


import {
  setActiveLink, 
  adjustForMissingHash, 
  renderTemplate, 
  loadHtml
} from "/javascript/utils.js"

// imports for init method in the given script
// Employee
import { initCreateEmployee } from "/pages/employee/create/createEmployee.js"
import { initViewEmployees }  from "/pages/employee/view/viewEmployees.js"
// Movie
import { initCreateMovie }  from "/pages/movie/create/createMovie.js"
import { initViewMovies }   from "/pages/movie/view/viewMovies.js"
// Movie theater
import { initCreateMovieTheater }  from "/pages/movieTheater/create/createMovieTheater.js"
import { initViewMovieTheaters }   from "/pages/movieTheater/view/viewMovieTheaters.js"
// Movie Listing
import { initCreateMovieListing }  from "/pages/movieListing/Create/createMovieListing.js"
import { initViewMovieListing }    from "/pages/movieListing/view/viewMovieListing.js"

window.addEventListener("load", async () => {

  // loading the pages
  // Home
  const templateHome = await loadHtml("/html/EmployeeHome.html")
  // Employee
  const templateCreateEmployee = await loadHtml("/pages/employee/create/createEmployee.html")
  const templateViewEmployees  = await loadHtml("/pages/employee/view/viewEmployees.html")
  // Movie
  const templateCreateMovie = await loadHtml("/pages/movie/create/createMovie.html")
  const templateViewMovies  = await loadHtml("/pages/movie/view/viewMovies.html")
  // Movie theater
  const templateCreateMovieTheater = await loadHtml("/pages/movieTheater/create/createMovieTheater.html")
  const templateViewMovieTheaters  = await loadHtml("/pages/movieTheater/view/viewMovieTheaters.html")
  // Movie Listing
  const templateCreateMovieListing = await loadHtml("/pages/movieListing/create/createMovieListing.html")
  const templateViewMovieListing = await loadHtml("/pages/movieListing/view/viewMovieListing.html")

  adjustForMissingHash()

  const router = new Navigo("/", { hash: true });
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router

  

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({
      "/": () => renderTemplate(templateHome, "content"),

      "/se-medarbejdere": () => {
        renderTemplate(templateViewEmployees, "content")
        initViewEmployees()
      },
      "/opret-medarbejder": () => {
        renderTemplate(templateCreateEmployee, "content")
        initCreateEmployee()
      },
      "/rediger-medarbejder/:id": ({data}) => {
        renderTemplate(templateCreateEmployee, "content")
        initCreateEmployee(data)
      },
      "/se-film": () => {
        renderTemplate(templateViewMovies, "content")
        initViewMovies()
      },
      "/opret-film": () => {
        renderTemplate(templateCreateMovie, "content")
        initCreateMovie()
      },
      "/rediger-film/:id": ({data}) => {
        renderTemplate(templateCreateMovie, "content")
        initCreateMovie(data)
      },
      "/se-sale": () => {
        renderTemplate(templateViewMovieTheaters, "content")
        initViewMovieTheaters()
      },
      "/opret-sal": () => {
        renderTemplate(templateCreateMovieTheater, "content")
        initCreateMovieTheater()
      },
      "/rediger-sal/:id": ({data}) => {
        renderTemplate(templateCreateMovieTheater, "content")
        initCreateMovieTheater(data)
      },
      "/se-forestillinger": () => {
        renderTemplate(templateViewMovieListing, "content")
        initViewMovieListing()
      },
      "/opret-forestilling": () => {
        renderTemplate(templateCreateMovieListing, "content")
        initCreateMovieListing()
      },
      "/rediger-forestilling/:id": ({data}) => {
        renderTemplate(templateCreateMovieListing, "content")
        initCreateMovieListing(data)
      },
    })
    .notFound(() => {
      renderTemplate(templateNotFound, "content")
    })
    .resolve()
});

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}