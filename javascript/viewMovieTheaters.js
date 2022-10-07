const table_body = document.getElementById('table-body');
//const url = "https://kinoxp-na.azurewebsites.net/api/v1/employees";
const url = "http://localhost:8080/api/v1/employees";


async function fetchData() {
    let response = await fetch(url);
    let data = await response.json();
    let list = Array.from(data);

    list.forEach((element) => makeNewTheatre(element));
}
fetchData();

function makeNewTheatre(element) {
    let.row = document.createElement("tr");
    row.id = "id-" + element.id;

    row.innerHTML = "<td>" + element.id + "</td>" +
                    "<td>" + element.name + "</td>" + 
                    "<td>" + element.role + "</td>" +
                    "<td>" + element.email + "</td>" +
                    "<td><a href=\"createMovie.html?id=" + element.id + "\">link</a></td>" +
                     "<td><span onclick=\"deleteMovie(" + element.id + ")\">click to delete</span></td>";
                    
                
    table_body.appendChild(row)
}

async function deleteEmployee(id) {
    let response = await fetch(url + "/" + id, {method: 'DELETE'});
    let data = await response.json();

    if (data == true) {
        alert("Employee with id:" + id + " has been deleted");
        document.getElementById("id-" + id).remove();
    }   
}