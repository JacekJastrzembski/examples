export async function fetchShipsOnly(){
    try {
        const response = await fetch('https://api.spacexdata.com/v4/ships');
        const ships = await response.json();
        localStorage.setItem('ships', JSON.stringify(ships));
    } catch (error) {
        console.error('Error fetching ships:', error);
    }
}