import React, { useEffect, useState } from 'react'
import './Shipdetails.css'
import { Link, useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { Launches } from './Launcheslist';
import { displayFormattedDate } from './components/displayFormattedDate';
import { Ship } from './Shiplist';

const Shipdetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ship, setShip] = useState<Ship | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [launches, setLaunches] = useState<Launches[]>([]);
  const [showLaunches, setShowLaunches] = useState<boolean>(false);

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
      } finally {
      setLoading(false);
      }
    };
    const fetchLaunches = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v5/launches');
        if (!response.ok) throw new Error('Failed to fetch launches.');
        const data: Launches[] = await response.json();
        setLaunches(data);
      } catch (err) {
        setError('Failed to load launches.');
      }
    };
    fetchShipDetails();
    fetchLaunches();
  }, [id]);

  const toggleLaunches = () => {
    setShowLaunches((prev) => !prev);
  };

  const renderShipDetails = () => {
    if (!ship) return null;

    
    const shipLaunches = launches.filter((launch) => launch.ships?.includes(ship.id));

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
        <button onClick={toggleLaunches} className="toggle-launches">
          {showLaunches ? 'Hide Launches' : 'Show Launches'}
        </button>
        {showLaunches && shipLaunches.length > 0 && (
          <ul>
            {shipLaunches.map((launch) => (
              <li key={launch.id}>
                <strong><Link className="launch-details-link" to={`/launches/${launch.id}`}>{launch.name}</Link></strong> - {displayFormattedDate(launch.date_utc)}
              </li>
            ))}
          </ul>
        )}
        {showLaunches && shipLaunches.length === 0 && (
          <p>No launches found for this ship.</p>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="loader"><ClipLoader /></div>;
  }

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
