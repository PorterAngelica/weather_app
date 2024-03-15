import { useState } from 'react'
import './assests/css/App.css'
import NavBar from './components/NavBar'
import WeatherPanel from './components/WeatherPanel'

function App() {


  return (
      <div>
        <NavBar />

        <WeatherPanel />
      </div>
  )
}

export default App
