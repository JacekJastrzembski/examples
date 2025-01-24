import React, { useEffect, useState } from 'react'
import './Launchesdetails.css'
import { displayFormattedDate } from './components/displayFormattedDate'
import { Link, useParams } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader';
import { Launches } from './Launcheslist'


const Launchesdetails: React.FC = () => {
      const { id } = useParams<{ id: string }>();
      const [launch, setLaunch] = useState<Launches | null>(null);
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
            {/* <p><strong>Rocket:</strong><Link to="/rockets/id={launches.rocket}" target="_blank" class="rocket-link" > ${rocketName}</a></p> */}
            <p><strong>Date UTC:</strong> {displayFormattedDate(launch.date_utc)}</p>
            <p><strong>Success:</strong> {launch.success ? 'Yes': 'No'}</p>
            {/* <p><strong>Reddit Campaign:</strong> {launch.links.reddit.campaign}</p> */}
            <p><strong>Details:</strong> {launch.details}</p>
            {/* <p><strong>Ships:</strong>${shipNameHTML}</p> */}
            {/* <div className="launch-images">
              {launch.flickr_images.map((image, index) => (
                <img key={index} src={image} alt={launch.name} />
              ))}
            </div> */}
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
