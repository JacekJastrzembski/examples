import { displayFormattedDate } from '../modules/displayFormattedDate.js';
import { fetchRocketsOnly } from '../rocket-list/rocket-list-local.js';
import { fetchShipsOnly } from '../ship-list/ship-list-local.js';

// Dane z API
async function fetchLaunches(){
    try {
        const response = await fetch('https://api.spacexdata.com/v5/launches');
        const launches = await response.json();
        sortLaunches(launches);
        displayLaunches(launches);
        
    } catch (error) {
        console.error('Error fetching launches:', error);
    }
}

// Sortowanie 
function sortLaunches(launches) {
    return launches.sort((a, b) => {
        if (b.date_unix !== a.date_unix) {
            return b.date_unix - a.date_unix;
        }
        return b.flight_number - a.flight_number;
    });
}

// Wyswietlanie startow
function displayLaunches(launches) {
    const launchesList = document.getElementById('launches-list');
    launches.forEach(launches => {
        const listItem = document.createElement('li');
        listItem.classList.add('launches-list')
        let imageUrl = launches.links.patch.small || "No Picture";
        listItem.innerHTML = `
            <div class="launch-link">
                <h2><a class="launches-link" alt="image"  href="../launches-details/launches-details.html?id=${launches.id}">${launches.name}</a></h2>
            </div>
            <div class="launch-desc">
                <p><strong>Flight number:</strong> ${launches.flight_number}</p>
                <p><strong>Date:</strong> ${displayFormattedDate(launches.date_utc)}</p>
                <p><strong>Upcoming:</strong> ${launches.upcoming ? 'Yes' : 'No'}</p>
            </div>
            <div class="launch-patch">
                ${imageUrl === "No Picture" ? imageUrl : `<img src="${imageUrl}" alt="Launch Patch">`}
            </div>
            
        `;
        launchesList.appendChild(listItem);
    });
}

// Uruchom przy zaladowaniu strony
fetchLaunches();
fetchRocketsOnly();
fetchShipsOnly();