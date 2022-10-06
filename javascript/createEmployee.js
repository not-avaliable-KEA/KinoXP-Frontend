const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id')

const url = "https://kinoxp-na.azurewebsites.net/api/v1/employees";
//const url = "http://localhost:8080/api/v1/employees";


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


function handleSubmit(event) {
    event.preventDefault();
  
    const data = new FormData(event.target);
  
    const value = Object.fromEntries(data.entries());
  
    

    if (id != null) {
        fetch(url + "/" + id, {
            method:"PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        })
        .then((response) => response.json())
        .then(() => window.location.href = "/html/viewEmployees.html")
        .catch((error) => console.error('Error', error));
        
    } else {
        fetch(url, {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        })
        .then((response) => response.json())
        .then(() => window.location.href = "/html/viewEmployees.html")
        .catch((error) => console.error('Error', error));
        // redirect to view all or somthing
    }
    


  }
  
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
  



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