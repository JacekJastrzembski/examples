import React, { useEffect, useState } from 'react'
import './Shipdetails.css'
import { Link, useParams } from 'react-router-dom';

interface Ship {
    id: string;
    name: string;
    type: string;
    roles: string;
    year_built: number;
    mass_kg: number;
    home_port: string;
    link: string;
    image: string;
  }

const Shipdetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ship, setShip] = useState<Ship | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Missing ship ID in URL.');
      return;
    }

    const fetchShipDetails = async () => {
      try {
        const response = await fetch(`https://api.spacexdata.com/v4/ships/${id}`);
        if (!response.ok) throw new Error('Failed to fetch ship details.');
        const data: Ship = await response.json();
        setShip(data);
      } catch (err) {
        setError('Failed to load ship details.');
      }
    };

    fetchShipDetails();
  }, [id]);

  const renderShipDetails = () => {
    if (!ship) return null;

    return (
      <div className="site">
        <h1>Ship Details</h1>
        <div className="site-img">
            <div className="text">
                <h2>{ship.name}</h2>
                <p><strong>Type:</strong> {ship.type || 'Unknown' }</p>
                <p><strong>Roles:</strong> {ship.roles || 'Unknown'}</p>
                <p><strong>Year built:</strong> {ship.year_built || 'Unknown'}</p>
                <p><strong>Mass:</strong> {ship.mass_kg ? ship.mass_kg + ' kg' : 'Unknown'}</p>
                <p><strong>Home port:</strong> {ship.home_port || 'Unknown'}</p>
                {ship.link ? (
                <p><strong>Marine traffic:</strong> <a href={ship.link} target="_blank"> {ship.name}</a></p>
                ) : (
                    <p><strong>Marine traffic:</strong></p>
                )}
            </div>
                <div className="ship-image">
                {ship.image ? (
                <img src={ship.image} alt={ship.name} />
                ) : (
                <div className="ship-photo">
                    <p><strong>No photo</strong></p>
                </div>
                )}
                </div>
            
        </div>
      </div>
    );
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div id="ship-details">
        {renderShipDetails()}
        <div className="return">
            <Link to="/ships" className="back">
                Back to the ship list
            </Link>
        </div>
    </div>
  );
};


export default Shipdetails
