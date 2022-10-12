import {config} from '/javascript/config.js';
const url =  config.url + "/api/v1/movieListings";


async function getMovieListing(){
    const url = 'https://localhost:8080/api/v1/movieListings';
    const response = await fetch(url);
    const data = await response.json();

    const movieListings = Array.from(data);

    console.log(movieListings);

    let table1 = document.getElementById("table1");

    table1.innerHTML += `<thead>
                <tr>

                <th>Titel</th>
                <th>Sal</th>
                <th>Dato</th>

                </tr>
        
            </thead>`
            



            `<tbody>
            
            
            </tbody>`

                




}