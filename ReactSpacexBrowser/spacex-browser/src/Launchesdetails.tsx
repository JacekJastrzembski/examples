import React, { useEffect, useState } from 'react'
import './Launchesdetails.css'
import { displayFormattedDate } from './components/displayFormattedDate'
import { Link, useParams } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import { Launches } from './Launcheslist'
import { Rocket } from './RocketDetails'
import { Ship } from './Shiplist'

const Launchesdetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [launch, setLaunch] = useState<Launches | null>(null);
  const [rocket, setRocket] = useState<Rocket | null>(null);
  const [ships, setShip] = useState<Ship[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      setError('Missing launch ID in URL.');
      return;
    }

    const fetchLaunchDetails = async () => {
      try {
        const response = await fetch(`https://api.spacexdata.com/v5/launches/${id}`);
        if (!response.ok) throw new Error('Failed to fetch launch details.');
        const data: Launches = await response.json();
        setLaunch(data);

        if (data.rocket) {
          const rocketResponse = await fetch(`https://api.spacexdata.com/v4/rockets/${data.rocket}`);
          if (!rocketResponse.ok) throw new Error('Failed to fetch rocket details.');
          const rocketData: Rocket = await rocketResponse.json();
          setRocket(rocketData);
        }
        if (data.ships && data.ships.length > 0) {
          const shipDetails = await Promise.all(
            data.ships.map(async (shipId: string) => {
              const shipResponse = await fetch(`https://api.spacexdata.com/v4/ships/${shipId}`)
              if (!shipResponse.ok) throw new Error('Failed to fetch ships details')
              return await shipResponse.json();
            })
          );
          setShip(shipDetails);
        }
      } catch (err) {
        setError('Failed to load launch details.');
      } finally {
        setLoading(false);
      }
    };

    fetchLaunchDetails();
  }, [id]);

  const renderLaunchDetails = () => {
    if (!launch) return null;

    return (
      <div className="site">
        <h1>Launch Details</h1>
        <div className="details">
          <h2>{launch.name}</h2><br />
          {rocket ? (
            <p><strong>Rocket: </strong><Link to={`/rockets/${launch.rocket}`} target="_blank" className="launch-details-link" >{rocket.name}</Link></p>
          ) : (
            ' '
          )}
          <p><strong>Date UTC: </strong>{displayFormattedDate(launch.date_utc)}</p>
          <p><strong>Success: </strong>{launch.success ? 'Yes' : 'No'}</p>
          {launch.links.reddit.campaign ? (
            <p><strong>Reddit Campaign: </strong><a href={launch.links.reddit.campaign} className="launch-details-link" target="_blank" rel="noopener noreferrer">{launch.name}</a></p>
          ) : (
            <p><strong>Reddit Campaign: </strong></p>
          )}
          <p><strong>Details: </strong>{launch.details}</p>
          {ships.length > 0 && (
            <div className="launch-ships">
              <h3>Ships:</h3>
              <ul>
                {ships.map((ship) => (
                  <li key={ship.id}>
                    <Link to={`/ships/${ship.id}`} target="_blank" className="launch-details-link" >{ship.name}</Link>
                    <strong>({ship.type})</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="launch-images">
            {launch.links.flickr.original.map((image, index) => (
              <img key={index} src={image} alt={launch.name} />
            ))}
          </div>
        </div>
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
    <div id="launches-details">
      {renderLaunchDetails()}
      <div className="return">
        <Link to="/launches" className="back">
          Back to the launches list
        </Link>
      </div>
    </div>
  )
}

export default Launchesdetails
