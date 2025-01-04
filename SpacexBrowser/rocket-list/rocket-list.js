// Dane z API
async function fetchRockets(){
    try {
        const response = await fetch('https://api.spacexdata.com/v4/rockets');
        const rockets = await response.json();
        displayRockets(rockets);
    } catch (error) {
        console.error('Error fetching rockets:', error);
    }
}

// Wyswietlanie rakiet
function displayRockets(rockets) {
    const rocketList = document.getElementById('rocket-list');

    rockets.forEach(rocket => {
        const listItem = document.createElement('li');
        listItem.classList.add('rocket-list')
        listItem.innerHTML = `
            <h2><a class="rocket-link" href="../rocket-details/rocket-details.html?id=${rocket.id}">${rocket.name}</a></h2>
            <p>${rocket.description}</p>
            <img src="${rocket.flickr_images[0]}" alt="${rocket.name}">

        `;
        rocketList.appendChild(listItem);
    });
}


// Uruchom przy zaladowaniu strony
fetchRockets();