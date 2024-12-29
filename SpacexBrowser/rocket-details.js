// Pobierz dane na podstawie ID z linku
async function fetchRocketDetails() {
    const params = new URLSearchParams(window.location.search);
    const rocketId = params.get('id');
    if (!rocketId) {
        displayError('Missing ID of the rocket in URL')
        return;
    }

    try {
        const response = await fetch(`https://api.spacexdata.com/v4/rockets/${rocketId}`);
        if (!response.ok) throw new Error('Failed to fetch rocket details.');
        const rocket = await response.json();
        displayRocketDetails(rocket);
    } catch (error) {
        console.error('Error fetching rockets details:', error);
        displayError('Failed to load rocket details.');
    }
}

// Wyswietlenie szczegolow rakiety
function displayRocketDetails(rocket) {
    const container = document.getElementById('rocket-details');
    container.innerHTML = `
        <h2>${rocket.name}</h2>
        <p><strong>Description:</strong> ${rocket.description}</p>
        <p><strong>First Flight:</strong> ${rocket.first_flight}</p>
        <p><strong>Height:</strong> ${rocket.height.meters} meters</p>
        <p><strong>Diameter:</strong> ${rocket.diameter.meters} meters</p>
        <p><strong>Mass:</strong> ${rocket.mass.kg} kg</p>
        <a href="index.html">Back to the list</a>
    `;
}

// Wyswietl blad
function displayError(message) {
    const container = document.getElementById('rocket-details');
    container.innerHTML = `<p style="color: red;">${message}</p>`;
}
// Uruchom przy zaladowaniu strony
fetchRocketDetails();