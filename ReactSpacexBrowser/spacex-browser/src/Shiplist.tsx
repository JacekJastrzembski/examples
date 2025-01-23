import React, { useEffect, useState } from 'react'
import './Shiplist.css'
import { Link } from 'react-router-dom';


interface Ship {
  id: string;
  name: string;
  image: string;
  type: string;
}

const Shiplist : React.FC = () => {
  const [ships, setShips] = useState<Ship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchShips = async () => {
    try {
      const response = await fetch('https://api.spacexdata.com/v4/ships');
      if (!response.ok) {
        throw new Error('Failed to fetch ships');
      }
      const data: Ship[] = await response.json();
      setShips(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    };
    fetchShips();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>
  }


  return (
    <div className="site">
        <h1>SpaceX Ships</h1>
        <ul className="ship-list">
          {ships.map((ship) => (
            <li key={ship.id} className="ship-item">
              <h2>
                <Link className="ship-link" to={`/ships/${ship.id}`}>
                {ship.name}
               </Link>
              </h2>
              <h3>{ship.type}</h3>
              {ship.image ? (
                <img src={ship.image} alt={ship.name} />
                ) : (
                <div className="ship-photo">
                    <p><strong>No photo</strong></p>
                </div>
                )}
            </li>
            
          ))}
        </ul>
    </div>
  )
}

export default Shiplist
