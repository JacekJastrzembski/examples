import './App.css'
import Navbar from './components/Navbar';
import Homepage from './Homepage';
import {Route, Routes} from 'react-router-dom'
import Rocketlist from './Rocketlist';
import RocketDetails from './RocketDetails';

function App() {

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/rockets" element={<Rocketlist />} />
          <Route path="/rockets/:id" element={<RocketDetails />} />

        </Routes>
      </div>
    </>
  )
}

export default App
