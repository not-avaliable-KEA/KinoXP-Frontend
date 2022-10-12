//import {config} from './config';
//const url = config.url + "api/v1/employees/login";
//let id;
const url = "http://localhost:8080/api/v1/employees/login";
var attempt = 3; // Variable to count number of attempts.

async function validateLogin(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (await loginValidation(username, password) === true){
        window.location = "../html/employeeHomepage.html"; // Redirecting to other page.

    } else {
        attempt --;// Decrementing by one.
        alert("Du har nu "+attempt+" forsøg tilbage;");
        // Disabling fields after 3 attempts.
        if( attempt == 0){
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }

    async function loginValidation(username, password){
        const values = {
            "username": username,
            "password": password
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        let data = await response.json();
        return data;
    }
}


