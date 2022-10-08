import {config} from '/javascript/config.js';
const url =  config.url + "/api/v1/movies";

export async function initViewMovies(){
    document.getElementById('table-body').onclick = buttonClick;

    let response = await fetch(url);
    let data = await response.json();
    let list = Array.from(data);


    list.forEach((element) => makeNewMovie(element));
}

function makeNewMovie(element){
    let row = document.createElement("tr");
    row.id = "id-" + element.id;

    row.innerHTML =
        "<td>" + element.id          + "</td>" +
        "<td>" + element.name        + "</td>" +
        "<td>" + element.genre       + "</td>" +
        "<td>" + element.length      + "</td>" +
        "<td>" + element.description + "</td>" +
        "<td>" + element.actors      + "</td>" +
        "<td>" + element.director    + "</td>" +
        "<td>" + element.ageLimit    + "</td>" +
        "<td><button id=\"" + element.id +  "-column-id\" type=\"button\"  class=\"edit btn btn-sm btn-primary\">Redigér</button></td>" +
        "<td><button id=\"" + element.id +  "-column-id\" type=\"button\"  class=\"delete btn btn-sm btn-secondary\">Slet</button></td>";
        
    document.getElementById('table-body').appendChild(row);
}

function buttonClick(evt) {
    const target = evt.target

    // abort if not a button
    if (!target.id.includes("-column-id")) return

    // get id
    const id = target.id.replace("-column-id", "")

    // if delete
    if (target.classList.contains("delete")) {
        deleteMovie(id)
    } 

    // if edit, change to edit page
    if (target.classList.contains("edit")) {
        window.router.navigate("rediger-film/" + id)
    } 
}

async function deleteMovie(id){
    let response = await fetch(url + "/" + id, {method: 'DELETE'})
    let data = await response.json();

    if (data == true){
        alert("Movie with id:" + id + " has been deleted");
        document.getElementById("id-" + id).remove();
    }
}