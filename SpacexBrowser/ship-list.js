// Dane z API
async function fetchShips(){
    try {
        const response = await fetch('https://api.spacexdata.com/v4/ships');
        const ships = await response.json();
        displayShips(ships);
    } catch (error) {
        console.error('Error fetching ships:', error);
    }
}

// Wyswietlanie statkow
function displayShips(ships) {
    const shipList = document.getElementById('ship-list');
    

    ships.forEach(ship => {
        const listItem = document.createElement('li');
        listItem.classList.add('ship-list');

        if (ship.image != null){
            listItem.innerHTML = `
            <h2><a class="ship-link" href="ship-details.html?id=${ship.id}">${ship.name}</a></h2>
            <h3 class="ship">${ship.type}</h3>
            <img src="${ship.image}" alt="${ship.name}">
        `;
        } else{
            listItem.innerHTML = `
            <h2><a class="ship-link" href="ship-details.html?id=${ship.id}">${ship.name}</a></h2>
            <h3 class="ship">${ship.type}</h3>
            <p>No photo</p>
        `;
        }

        shipList.appendChild(listItem);
    });
}

// Uruchom przy zaladowaniu strony
fetchShips();