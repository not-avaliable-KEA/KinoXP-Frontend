let id;

//const url = "https://kinoxp-na.azurewebsites.net/api/v1/movietheaters";
const url = "http://localhost:8080/api/v1/movietheaters";


export function initCreateMovieTheater(data) {
    id = data?.id

    console.log();
    if (id != null && id > 0) {
        showMovieTheater();
        document.getElementById("button").innerHTML = "Redigér";
    } else {
        id = null;
    }

  
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
}


async function showMovieTheater(){
    const response = await fetch(url + "/" + id);
    const employeeData = await response.json();

    document.getElementById("name").value = employeeData.name;
    document.getElementById("numberOfRows").value = employeeData.numberOfRows;
    document.getElementById("numberOfSeats").value = employeeData.numberOfSeats;

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
        .then(() => window.router.navigate("se-sale"))
        .catch((error) => console.error('Error', error));
}
  

/*
    {
        "name": "Bio 1 ",
        "numberOfRows": 25,
        "numberOfSeats": 16
    }
*/