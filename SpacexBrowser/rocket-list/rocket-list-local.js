export async function fetchRocketsOnly(){
    try {
        const response = await fetch('https://api.spacexdata.com/v4/rockets');
        const rockets = await response.json();
        localStorage.setItem('rockets', JSON.stringify(rockets));
    } catch (error) {
        console.error('Error fetching rockets:', error);
    }
}