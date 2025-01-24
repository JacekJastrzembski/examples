import React, { useEffect, useState } from 'react'
import './Launcheslist.css'
import ClipLoader from 'react-spinners/ClipLoader';
import { Link } from 'react-router-dom';
import { displayFormattedDate } from './components/displayFormattedDate';

export interface Patch {
    small: string;
    large: string;
}
export interface Links {
    patch: Patch; 
    reddit?: { 
        campaign: string;
        launch: string;
        media: string;
        recovery: string;
    }
}
export interface Launches {
    id: string;
    name: string;
    date_unix: number;
    date_utc: string;
    flight_number: number;
    upcoming: boolean;
    links: Links; 
    success:boolean;
    details:string;
}
const Launcheslist: React.FC= () => {
    
    const [launches, setLaunches] = useState<Launches[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
      const fetchLaunches = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v5/launches');
        if (!response.ok) {
          throw new Error('Failed to fetch ships');
        }
        const data: Launches[] = await response.json();
        setLaunches(sortLaunches(data));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      };
      fetchLaunches();
    }, []);
  
    if (loading) {
      return <div className="loader"><ClipLoader /></div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>
    }

    function sortLaunches(launches: Launches[]) {
        return launches.sort((a, b) => {
            if (b.date_unix !== a.date_unix) {
                return b.date_unix - a.date_unix;
            }
            return b.flight_number - a.flight_number;
        });
    }

  return (
    <div className="site">
        <h1>SpaceX Launches</h1>
        <ul id="launches-list">
          {launches.map((launch) => (
            <li key={launch.id} className="launch-item">
                <h2 className="launch-header">
                    <Link className="launch-link" to={`/launches/${launch.id}`}>
                    {launch.name}
                    </Link>
                </h2>
                <div className="launch-desc">
                    <p><strong>Flight number:</strong> {launch.flight_number}</p>
                    <p><strong>Date:</strong> {displayFormattedDate(launch.date_utc)}</p>
                    <p><strong>Upcoming:</strong> {launch.upcoming ? 'Yes' : 'No'}</p>
                </div>
                {launch.links.patch.small ? (
                    <div className="launch-patch">
                        <img src={launch.links.patch.small} alt={launch.name} />
                    </div>
                ) : (
                    <div className="launch-patch">
                        <p><strong>No photo</strong></p>
                    </div>
                )}
            </li>
          ))}
        </ul>
    </div>
  )
}

export default Launcheslist
