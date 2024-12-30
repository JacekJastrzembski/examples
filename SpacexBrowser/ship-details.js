// Pobierz dane na podstawie ID z linku
async function fetchShipDetails() {
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

    const shipDetailsHTML = `
        <h2>${ship.name}</h2>
        <p><strong>Type:</strong> ${ship.type || 'Unknown' }</p>
        <p><strong>Roles:</strong> ${ship.roles || 'Unknown'}</p>
        <p><strong>Year built:</strong> ${ship.year_built || 'Unknown'}</p>
        <p><strong>Mass:</strong> ${ship.mass_kg ? ship.mass_kg + ' kg' : 'Unknown'}</p>
        <p><strong>Home port:</strong> ${ship.home_port || 'Unknown'}</p>
        <p><strong>Marine traffic:</strong> <a href="${ship.link || ''}" target="_blank">${ship.name}</a></p>
        ${imageHTML}

        <div class="return">
            <a class="back" href="ship-list.html">Back to the list</a>
        </div>
    `;
    container.innerHTML = shipDetailsHTML;
}

// Wyswietl blad
function displayError(message) {
    const container = document.getElementById('ship-details');
    container.innerHTML = `<p style="color: red;">${message}</p>`;
}
// Uruchom przy zaladowaniu strony
fetchShipDetails();