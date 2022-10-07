import "https://unpkg.com/navigo"  //Will create the global Navigo object used below


import {
  setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from "./utils.js"

// imports for init method in the given script
/*import { initNavigate } from "./pages/navigate/navigate.js"
import { showMatchObject } from "./pages/show-match/match.js"
import { initUsers } from "./pages/users/users.js"
import { initFindUser } from "./pages/findUser/findUser.js"
*/

window.addEventListener("load", async () => {

  // loading the pages
  //const templateCreateEmployee = await loadHtml("/html/createEmployee.html")
  const templateViewEmployees = await loadHtml("/html/viewEmployees.html")
  //const templateCreateMovie = await loadHtml("/html/createMovie.html")
  //const templateViewMovies = await loadHtml("/html/viewMovies.html")
  //const templateCreateMovieTheater = await loadHtml("/html/createMovieTheater.html")
  //const templateViewMovieTheaters = await loadHtml("/html/viewMovietheaters.html")
  const templateHome = await loadHtml("/html/EmployeeHome.html")

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
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () => renderTemplate(templateHome, "content"),
      
      "/about": () => renderTemplate(templateAbout, "content"),

      "/users": () => {
        renderTemplate(templateViewEmployees, "content")
        initUsers()
      },
      "/find-user": (match) => {
        renderTemplate(templateFindUser, "content")
        initFindUser(match)
      },

      "/navigate-programatically": () => {
        renderTemplate(templateNavigate, "content")
        initNavigate()
      },

      "/show-match": (match) => {
        renderTemplate(templateMatch, "content")
        showMatchObject(match)
      }
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