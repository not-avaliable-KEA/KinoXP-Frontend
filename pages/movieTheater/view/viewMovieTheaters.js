//const url = "https://kinoxp-na.azurewebsites.net/api/v1/movietheaters";
const url = "http://localhost:8080/api/v1/movietheaters";


export async function initViewMovieTheaters() {
    document.getElementById('table-body').onclick = buttonClick;
    let response = await fetch(url);
    let data = await response.json();
    let list = Array.from(data);

    list.forEach((element) => makeNewTheatre(element));
}

function makeNewTheatre(element) {
    let row = document.createElement("tr");
    row.id = "id-" + element.id;

    row.innerHTML = "<td>" + element.id            + "</td>" +
                    "<td>" + element.name          + "</td>" + 
                    "<td>" + element.numberOfRows  + "</td>" +
                    "<td>" + element.numberOfSeats + "</td>" +
                    "<td><button id=\"" + element.id +  "-column-id\" type=\"button\"  class=\"edit btn btn-sm btn-primary\">Redigér</button></td>" +
                    "<td><button id=\"" + element.id +  "-column-id\" type=\"button\"  class=\"delete btn btn-sm btn-secondary\">Slet</button></td>";
        
                
    document.getElementById('table-body').appendChild(row)
}

async function buttonClick(evt) {
    const target = evt.target

    // abort if not a button
    if (!target.id.includes("-column-id")) return

    // get id
    const id = target.id.replace("-column-id", "")

    // if delete
    if (target.classList.contains("delete")) {
        deleteMovieTheater(id)
    } 

    // if edit, change to edit page
    if (target.classList.contains("edit")) {
        window.router.navigate("rediger-sal/" + id)
    } 
}

async function deleteMovieTheater(id) {
    let response = await fetch(url + "/" + id, {method: 'DELETE'});
    let data = await response.json();

    if (data == true) {
        alert("MovieTheater with id:" + id + " has been deleted");
        document.getElementById("id-" + id).remove();
    }   
}