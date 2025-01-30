import React from 'react'
import { Outlet } from 'react-router-dom'

const Educator : React.FC = () => {
  return (
    <div>
      <h1>Educator Page</h1>
      <div>
        {<Outlet/>}
      </div>
    </div>
  )
}

export default Educator
