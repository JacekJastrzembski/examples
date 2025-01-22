import React from 'react'
import spacex_logo from './assets/spacex_logo.png'
import './Homepage.css'
const Homepage: React.FC = () => {

  return (
    <div className="container">
        <div className="site">
            <img src={spacex_logo} alt="SpaceX Logo" className="logo" />
        </div>
    </div>

  )
}

export default Homepage
