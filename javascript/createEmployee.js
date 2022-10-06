const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

//const url = "https://kinoxp-na.azurewebsites.net/api/v1/employees";
const url = "http://localhost:8080/api/v1/employees";


function checkIfUpdate() {

    console.log(id);
    if (id != null && id > 0) {
        showEmployee();
    } else {
        id = null;
    }
}
checkIfUpdate();



async function showEmployee(){
    const response = await fetch(url + "/" + id);
    const employeeData = await response.json();

    document.getElementById("name").value = employeeData.name;
    document.getElementById("email").value = employeeData.email;
    document.getElementById("telephone").value = employeeData.telephone;
    document.getElementById("username").value = employeeData.username;
    document.getElementById("role").value = employeeData.role;
    document.getElementById("button").innerHTML = 'Opdater';

}


async function sendData() {
    let form = new FormData(document.getElementById("form"));

    const data = Object.fromEntries(form.entries());
}



/*
        {
        "id": 1,
        "name": "new",
        "role": "role",
        "email": "email",
        "telephone": "phone",
        "username": "username3"
        }
    */