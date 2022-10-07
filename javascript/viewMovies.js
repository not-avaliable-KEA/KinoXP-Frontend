const table_body = document.getElementById('table-body');
const url = "https://kinoxp-na.azurewebsites.net/api/v1/movies"
//const url = "http://localhost:8080/api/v1/movies";

async function fetchData(){
    let response = await fetch(url);
    let data = await response.json();
    let list = Array.from(data);

    list.forEach((element) => makeNewMovie(element));
}
fetchData();

function makeNewMovie(element){
    let row = document.createElement("tr");
    row.id = "id-" + element.id;

    row.innerHTML =
        "<td>" + element.id +  "</td>" +
        "<td>" + element.name + "</td>" +
        "<td>" + element.genre + "</td>" +
        "<td>" + element.length + "</td>" +
        "<td>" + element.description + "</td>" +
        "<td>" + element.actors + "</td>" +
        "<td>" + element.director + "</td>" +
        "<td>" + element.ageLimit + "</td>" +
        "<td><a href=\"createMovie.html?id=" + element.id + "\">link</a></td>" +
        "<td><span onclick=\"deleteMovie(" + element.id + ")\">click to delete</span></td>";

    table_body.appendChild(row);
}

async function deleteMovie(id){
    let response = await fetch(url + "/" + id, {method: 'DELETE'})
    let data = await response.json();

    if (data == true){
        alert("Movie with id:" + id + " has been deleted");
        document.getElementById("id-" + id).remove();
    }
}