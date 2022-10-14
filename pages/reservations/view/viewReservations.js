import {config} from '/javascript/config.js';
const url =  config.url + "/api/v1/reservations";


export async function initViewReservation(){

    document.getElementById('table-body').onclick = buttonClick;

    const response = await fetch(url);
    const reservationInfo = await response.json();

    document.getElementById('table-body').innerHTML = ""; // to prevent showing of old entities
    reservationInfo.forEach((element) => makeNewReservation(element));
}

function makeNewReservation(element) {
    let row = document.createElement("tr");
    row.id = "id-" + element.id;

    row.innerHTML = "<td>" + element.id            + "</td>" +
                    "<td>" + element.name          + "</td>" + 
                    "<td>" + element.numberOfSeats + "</td>" +
                    "<td>" + element.meetsAgeRequirement + "</td>" +
                    "<td>" + element.movieListinsId + "</td>" +
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
        deleteReservation(id)
    } 

    // if edit, change to edit page
    if (target.classList.contains("edit")) {
        window.router.navigate("rediger-sal/" + id)
    } 
}

async function deleteReservation(id) {
    let response = await fetch(url + "/" + id, {method: 'DELETE'});
    let data = await response.json();

    if (data == true) {
        alert("Reservation with id:" + id + " has been deleted");
        document.getElementById("id-" + id).remove();
    }   
}