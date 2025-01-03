import { displayFormattedDate } from "../modules/displayFormattedDate.js";

// Pobierz dane na podstawie ID z linku
async function fetchLaunchesDetails() {
    const params = new URLSearchParams(window.location.search);
    const launchesId = params.get('id');
    if (!launchesId) {
        displayError('Missing ID of the Launches in URL')
        return;
    }
    try {
        const response = await fetch(`https://api.spacexdata.com/v5/launches/${launchesId}`);
        if (!response.ok) throw new Error('Failed to fetch Launches details.');
        const launches = await response.json();
        displayLaunchesDetails(launches);
    } catch (error) {
        console.error('Error fetching Launchess details:', error);
        displayError('Failed to load Launches details.');
    }
}

// Wyswietlenie szczegolow rakiety
function displayLaunchesDetails(launches) {
    const container = document.getElementById('launches-details');

// Nazwa rakiety by ID 
    const rocketName = getRocketNameById(launches.rocket);

// Linki do statkow 
    let shipName;
    let shipNameHTML = ``;
    const shipsCount = launches.ships.length;
    if (shipsCount > 0) {
        for (let i=0; i<shipsCount;i++)
            {
                shipName = getShipNameById(launches.ships[i])
                shipNameHTML += `<a class="ship-link" href="../ship-details/ship-details.html?id=${launches.ships[i]}" target="_blank"> ${shipName}</a>, `;
            }
    } else shipNameHTML = ` Unknown`;

// Foto launch
    const imageHTML = launches.links.flickr.original[0]
    ? `<div class="launches-image"><img src="${launches.links.flickr.original[0]}" alt="${launches.name}"></div>` 
    : `<div class="launches-image"><h2><strong>No photo</strong></h2></div>`;

// Reddit
    let redditCamp =``;
    if (launches.links.reddit.campaign){
        redditCamp = `<a href="${launches.links.reddit.campaign}">${launches.name}</a>`;
    } 

// Wyswietlanie DOM
    const launchesDetailsHTML = `
        <h2>${launches.name}</h2><br>
        <p><strong>Rocket:</strong><a class="rocket-link" href="../rocket-details/rocket-details.html?id=${launches.rocket}" target="_blank"> ${rocketName}</a></p>
        <p><strong>Date UTC:</strong> ${displayFormattedDate(launches.date_utc)}</p>
        <p><strong>Success:</strong> ${launches.success ? 'Yes': 'No'}</p>
        <p><strong>Reddit Campaign:</strong> ${redditCamp}</p>
        <p><strong>Details:</strong> ${launches.details}</p>
        <p><strong>Ships:</strong>${shipNameHTML}</p>
        
        ${imageHTML}
        <div class="return">
            <a class="back" href="../launches-list/launches-list.html">Back to the list</a>
        </div>
    `;
    container.innerHTML = launchesDetailsHTML;
}

// Nazwa rakiety by ID
function getRocketNameById(rocketId) {
    const rocketsData = localStorage.getItem('rockets');
    const rockets = JSON.parse(rocketsData);
    const rocket = rockets.find(r => r.id === rocketId);
    return rocket.name;
}

// Nazwa statku
function getShipNameById(shipId) {
    const shipsData = localStorage.getItem('ships');
    const ships = JSON.parse(shipsData);
    const ship = ships.find(r => r.id === shipId);
    return ship.name;
}

// Wyswietl blad
function displayError(message) {
    const container = document.getElementById('launches-details');
    container.innerHTML = `<p style="color: red;">${message}</p>`;
}

// Uruchom przy zaladowaniu strony
fetchLaunchesDetails();