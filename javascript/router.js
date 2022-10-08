import "https://unpkg.com/navigo"  //Will create the global Navigo object used below


import {
  setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from "/javascript/utils.js"

// imports for init method in the given script
// Employee
import { initCreateEmployee } from "/pages/employee/create/createEmployee.js"
import { initViewEmployees }  from "/pages/employee/view/viewEmployees.js"
// Movie
import { initCreateMovie } from "/pages/movie/create/createMovie.js"
//import { initViewMovie }   from "/pages/movie/view/viewMovies.js"

window.addEventListener("load", async () => {

  // loading the pages
  // Home
  const templateHome = await loadHtml("/html/EmployeeHome.html")
  // Employee
  const templateCreateEmployee = await loadHtml("/pages/employee/create/createEmployee.html")
  const templateViewEmployees  = await loadHtml("/pages/employee/view/viewEmployees.html")
  // Movie
  const templateCreateMovie = await loadHtml("/pages/movie/create/createMovie.html")
  //const templateViewMovie   = await loadHtml("/pages/movie/view/viewMovies.html")

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
        //renderTemplate(templateViewMovie, "content")
        //initUsers()
      },
      "/opret-film": () => {
        renderTemplate(templateCreateMovie, "content")
        initCreateMovie()
      },
      "/rediger-film/:id": ({data}) => {
        renderTemplate(templateCreateMovie, "content")
        initCreateMovie(data)
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