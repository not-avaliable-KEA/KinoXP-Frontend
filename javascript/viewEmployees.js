


    async function fetchData() {
        let response = await fetch("https://kinoxp-na.azurewebsites.net/api/v1/employees");
        let data = await response.json();
        console.log(JSON.stringify(data));
    }
    fetchData();


    async function loadIntoTable(url,table){
        const tableHead = table.querySelector("thead");
        const tableBody = table.querySelector("tbody");
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
        
        document.getElementById('name').innerHTML = Navn;
        document.getElementById('role').innerHTML = Stilling;
        document.getElementById('email').innerHTML = Email;
        document.getElementById('phone').innerHTML = Telefonnummer;
    
    }

    loadIntoTable("https://kinoxp-na.azurewebsites.net/api/v1/employees", document.querySelector("table"))
