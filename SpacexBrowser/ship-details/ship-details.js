import { fetchLaunches } from '../launches-list/launches-list-local.js';
import { dropFunc } from '../modules/dropFunc.js';
// Pobierz dane na podstawie ID z linku
async function fetchLaunchesDetails() {
    const params = new URLSearchParams(window.location.search);
    const shipId = params.get('id');
    if (!shipId) {
        displayError('Missing ID of the ship in URL')
        return;
    }

    try {
        const response = await fetch(`https://api.spacexdata.com/v4/ships/${shipId}`);
        if (!response.ok) throw new Error('Failed to fetch ship details.');
        const ship = await response.json();
        displayShipDetails(ship);

        dropFunc();
        
        const launchesData = localStorage.getItem('launches');
        const launches = JSON.parse(launchesData);
        displayShipLaunches(launches, shipId);

    } catch (error) {
        console.error('Error fetching ships details:', error);
        displayError('Failed to load ship details.');
    }
}

// Wyswietlenie szczegolow rakiety
function displayShipDetails(ship) {
    const container = document.getElementById('ship-details');
    const imageHTML = ship.image 
        ? `<div class="ship-image"><img src="${ship.image}" alt="${ship.name}"></div>` 
        : `<div class="ship-image"><h2><strong>No photo</strong></h2></div>`;

    let shipDetailsHTML = `
        <h2>${ship.name}</h2>
        <p><strong>Type:</strong> ${ship.type || 'Unknown' }</p>
        <p><strong>Roles:</strong> ${ship.roles || 'Unknown'}</p>
        <p><strong>Year built:</strong> ${ship.year_built || 'Unknown'}</p>
        <p><strong>Mass:</strong> ${ship.mass_kg ? ship.mass_kg + ' kg' : 'Unknown'}</p>
        <p><strong>Home port:</strong> ${ship.home_port || 'Unknown'}</p>
        <p><strong>Marine traffic:</strong> <a href="${ship.link || ''}" target="_blank">${ship.name}</a></p>
        ${imageHTML}

        <div class="return">
            <a class="back" href="../ship-list/ship-list.html">Back to the list</a>
        </div>
    `;
        shipDetailsHTML += `            
            <div class="drop" id="drop">
                <button class="drop-button" id="drop-button" type="button">Launches</button>
                <ul class="drop-list" id="drop-list">
                    
                </ul>
            </div>
    `;  
    container.innerHTML = shipDetailsHTML;
}
function displayShipLaunches(launches, ship) {
    const container = document.getElementById('drop-list');
    if (!container) {
        console.error("There is no drop-list element");
        return;
    }
    
    launches.forEach(launch => {
        if(launch.ships == ship)
        {
            const listItem = document.createElement('li');
            const link = document.createElement('a');

            link.href = `../launches-details/launches-details.html?id=${launch.id}`;
            link.textContent = launch.name;

            listItem.appendChild(link);
            container.appendChild(listItem);
        }
       
    });

}
// Wyswietl blad
function displayError(message) {
    const container = document.getElementById('ship-details');
    container.innerHTML = `<p style="color: red;">${message}</p>`;
}
// Uruchom przy zaladowaniu strony
fetchLaunchesDetails();
fetchLaunches();