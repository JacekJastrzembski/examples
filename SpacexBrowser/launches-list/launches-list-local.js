export async function fetchLaunches(){
    try {
        const response = await fetch('https://api.spacexdata.com/v5/launches');
        const launches = await response.json();
        localStorage.setItem('launches', JSON.stringify(launches));
    } catch (error) {
        console.error('Error fetching launches:', error);
    }
}
