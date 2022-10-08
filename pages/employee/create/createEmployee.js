let id

import {config} from '/javascript/config.js';
const url =  config.url + "/api/v1/employees";


export function initCreateEmployee(data) {
    id = data?.id

    console.log();
    if (id != null && id > 0) {
        showEmployee();
    } else {
        id = null;
    }
  
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
}



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


function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());

    if (id != null) {
        sendRequest("PATCH", url + "/" + id, value);
    } else {
        sendRequest("POST", url, value);
    }
}


function sendRequest(method, url, value) {
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
    })
        .then((response) => response.json())
                    //redirect to view all
        .then(() => window.router.navigate("se-medarbejdere"))
        .catch((error) => console.error('Error', error));
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