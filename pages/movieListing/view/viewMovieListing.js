import {config} from '/javascript/config.js';
const url =  config.url + "/api/v1/movieListings/test";
const url1 =  config.url + "/api/v1/movies";
const url2 = config.url + "/api/v1/movieListings";

export async function  initViewMovieListing(){

//vi laver en evenhandlerer på tbody- og gir den metoden buttonclick. - vi gir metoden som en variablen uden at køre metoden.  
    document.getElementById('tbody').onclick = buttonClick;

    const response = await fetch(url);
    console.log(response)
    const data = await response.json();

    const movieListings = Array.from(data);

    console.log(movieListings);

    let table1 = document.getElementById("thead");
    let table2 = document.getElementById("tbody");

        table1.innerHTML = `<tr>

                <th>Forestillings id</th>
                <th>Film Navn</th>
                <th>Sal/th>
                <th>Dato</th>

                </tr>`


        for(let i=0; i < movieListings.length; i++){
            table2.innerHTML += "<tr>" + 
                
                "<td>" + movieListings[i].id +  "</td>" +
                "<td>" + movieListings[i].movie.name + "</td>" +
                "<td>" + movieListings[i].movieTheater.name + "</td>" +
                "<td>" + movieListings[i].date + "</td>" + 
                "<td><button id=\"" + movieListings[i].id + "-column-id\" type=\"button\"  class=\"edit btn btn-sm btn-primary\">Redigér</button></td>" +
                "<td><button id=\"" + movieListings[i].id + "-column-id\" type=\"button\"  class=\"delete btn btn-sm btn-secondary\">Slet</button></td>"

            "</tr>"

        }

        function buttonClick(evt) {
            const target = evt.target
        
            // abort if not a button
            if (!target.id.includes("-column-id")) return
        
            // get id
            const id = target.id.replace("-column-id", "")
        
            // if delete
            if (target.classList.contains("delete")) {
                deleteMovieListing(id)
            } 
        
            // if edit, change to edit page
            if (target.classList.contains("edit")) {
                window.router.navigate("rediger-forestilling/" + id)
            } 
        }

        async function deleteMovieListing(id){
            let response = await fetch(url2 + "/" + id, {method: 'DELETE'})
            let data = await response.json();
        
            if (data == true){
                alert("MovieListing with id:" + id + " has been deleted");
                document.getElementById("id-" + id).remove();
            }

    }
}
