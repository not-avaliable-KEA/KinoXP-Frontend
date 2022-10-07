const table_body = document.getElementById('table-body');
//const url = "https://kinoxp-na.azurewebsites.net/api/v1/movietheaters";
const url = "http://localhost:8080/api/v1/movietheaters";


async function fetchData() {
    let response = await fetch(url);
    let data = await response.json();
    let list = Array.from(data);

    console.log(data);

    list.forEach((element) => makeNewTheatre(element));
}
fetchData();

function makeNewTheatre(element) {
    let row = document.createElement("tr");
    row.id = "id-" + element.id;

    row.innerHTML = "<td>" + element.id + "</td>" +
                    "<td>" + element.name + "</td>" + 
                    "<td>" + element.numberOfRows + "</td>" +
                    "<td>" + element.numberOfSeats + "</td>" +
                    "<td><a href=\"createMovieTheater.html?id=" + element.id + "\">link</a></td>" +
                     "<td><span onclick=\"deleteMovieTheater(" + element.id + ")\">click to delete</span></td>";
                    
                
    table_body.appendChild(row)
}

async function deleteMovieTheater(id) {
    let response = await fetch(url + "/" + id, {method: 'DELETE'});
    let data = await response.json();

    if (data == true) {
        alert("MovieTheater with id:" + id + " has been deleted");
        document.getElementById("id-" + id).remove();
    }   
}