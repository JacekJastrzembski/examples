import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './RocketDetails.css';
import ClipLoader from "react-spinners/ClipLoader";
import { Launches } from './Launcheslist';
import { displayFormattedDate } from './components/displayFormattedDate';

export interface PayloadWeight {
    id: string;
    name: string;
    kg: number;
}

export interface Rocket {
  id: string;
  name: string;
  description: string;
  first_flight: string;
  height: { meters: number };
  diameter: { meters: number };
  mass: { kg: number };
  cost_per_launch: number;
  payload_weights: PayloadWeight[];
  flickr_images: string[];
}

const RocketDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [rocket, setRocket] = useState<Rocket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [launches, setLaunches] = useState<Launches[]>([]);
  const [showLaunches, setShowLaunches] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      setError('Missing rocket ID in URL.');
      return;
    }

    const fetchRocketDetails = async () => {
      try {
        const response = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`);
        if (!response.ok) throw new Error('Failed to fetch rocket details.');
        const data: Rocket = await response.json();
        setRocket(data);
      } catch (err) {
        setError('Failed to load rocket details.');
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
    
    fetchRocketDetails();
    fetchLaunches();
  }, [id]);

  const toggleLaunches = () => {
    setShowLaunches((prev) => !prev);
  };

  const renderRocketDetails = () => {
    if (!rocket) return null;

    const rocketLaunches = launches.filter((launch) => launch.rocket === rocket.id);

    return (
      <div className="site">
        <h1>Rocket Details</h1>
        <div className="details">
          <h2>{rocket.name}</h2>
          <p>
            <strong>Description:</strong> {rocket.description}
          </p>
          <p>
            <strong>First Flight:</strong> {rocket.first_flight}
          </p>
          <p>
            <strong>Height:</strong> {rocket.height.meters} meters
          </p>
          <p>
            <strong>Diameter:</strong> {rocket.diameter.meters} meters
          </p>
          <p>
            <strong>Mass:</strong> {rocket.mass.kg} kg
          </p>
          <p>
            <strong>Cost per Launch:</strong> ${rocket.cost_per_launch}
          </p>
          <h2>Payload Weights:</h2>
          {rocket.payload_weights.map((payload) => (
            <div key={payload.id}>
              <h4>{payload.name}</h4>
              <p>
                Payload Weight: {payload.kg} kg
              </p>
            </div>
          ))}
          <button onClick={toggleLaunches} className="toggle-launches">
            {showLaunches ? 'Hide Launches' : 'Show Launches'}
          </button>
          {showLaunches && rocketLaunches.length > 0 && (
            <ul>
              {rocketLaunches.map((launch) => (
                <li key={launch.id}>
                  <strong><Link className="launch-details-link" to={`/launches/${launch.id}`}>{launch.name}</Link></strong> - {displayFormattedDate(launch.date_utc)}
                </li>
              ))}
            </ul>
          )}
          {showLaunches && rocketLaunches.length === 0 && (
            <p>No launches found for this rocket.</p>
          )}
          <div className="rocket-images">
            {rocket.flickr_images.map((image, index) => (
              <img key={index} src={image} alt={rocket.name} />
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
    <div id="rocket-details">
      {renderRocketDetails()}
      <div className="return">
        <Link to="/rockets" className="back">
          Back to the rocket list
        </Link>
      </div>
    </div>
  );
};

export default RocketDetails;
