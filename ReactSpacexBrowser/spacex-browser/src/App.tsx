import './App.css'
import Navbar from './components/Navbar';
import Homepage from './Homepage';
import {Route, Routes} from 'react-router-dom'
import Rocketlist from './Rocketlist';
import RocketDetails from './RocketDetails';
import Shiplist from './Shiplist';
import Shipdetails from './Shipdetails';

function App() {

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/rockets" element={<Rocketlist />} />
          <Route path="/rockets/:id" element={<RocketDetails />} />
          <Route path="/ships" element={<Shiplist />} />
          <Route path="/ships/:id" element={<Shipdetails />} />
        </Routes>
      </div>
    </>
  )
}

export default App
