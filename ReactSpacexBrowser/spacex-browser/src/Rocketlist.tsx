import React, { useEffect, useState } from 'react'
import './rocketlist.css'

interface Rocket {
  id: string;
  name: string;
  description: string;
  flickr_images: string[];
}

const Rocketlist : React.FC = () => {
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchRockets = async () => {
    try {
      const response = await fetch('https://api.spacexdata.com/v4/rockets');
      if (!response.ok) {
        throw new Error('Failed to fetch rockets');
      }
      const data: Rocket[] = await response.json();
      setRockets(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    };
    
    fetchRockets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>
  }


  return (
    <div className="site">
        <h1>SpaceX Rockets</h1>
        <ul className="rocket-list">
          {rockets.map((rocket) => (
            <li key={rocket.id} className="rocket-item">
              <h2>
                <a className="rocket-link"href={`../rocket-details/rocket-details.html?id=${rocket.id}`}>
                 {rocket.name}
                </a>
              </h2>
              <p>{rocket.description}</p>
              <img src={rocket.flickr_images[0]} alt={rocket.name} />
            </li>
            
          ))}
        </ul>
    </div>
  )
}

export default Rocketlist
