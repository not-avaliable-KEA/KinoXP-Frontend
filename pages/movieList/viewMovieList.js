


export async function initViewMovieTheaters() {
    document.getElementById('table-body').onclick = buttonClick;
    
    let response = await fetch(url);
    let data = await response.json();
    let list = Array.from(data);

    document.getElementById('table-body').innerHTML = ""; // to prevent showing of old entities
    list.forEach((element) => makeNewTheatre(element));
}