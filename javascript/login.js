

//import {config} from "./config.js";

const url =  config.url + "/api/v1/employeeHomepage";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id')
var attempt = 3; // Variable to count number of attempts.


function validate(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if ( username == username && password == password){
        alert ("Login successfully");
        window.location = "/html/employeeHomepage.html"; // Redirecting to other page.
        return true;
    }
    else{
        attempt --;// Decrementing by one.
        alert("You have left "+attempt+" attempt;");
// Disabling fields after 3 attempts.
        if( attempt == 0){
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
}