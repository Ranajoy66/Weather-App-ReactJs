import React, { useEffect, useState } from 'react'
import Descriptions from './components/Descriptions';
import getFormattedWeatherData from './weatherService';

function App() {

  const [city, setCity] = useState("Kolkata")

  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units)
      setWeather(data);
    }

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) =>{
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(12)
    // console.log(currentUnit);
    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? 'Convert To °F' : 'Convert To °C';
    setUnits(isCelsius ? "metric" : "imperial");
  }

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
    }
  }

  return (
    <div className='App'>
      <div className='overlay'>
        {
          weather && (
            <div className='container'>
              <h2 className='my-heading'>Weather Report</h2>
              <div className='section section__inputs'>
                <input className='my-input' onKeyDown={(e) => enterKeyPressed(e)} type="text" name="city" placeholder='Search for city....' />
                
                <button className='btn-btn-primary' onClick={(e) => handleUnitsClick(e)}>Convert To °F</button>
              </div>

              <div className='section section__temperature'>
                <div className='icon'>
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img src={weather.iconURL} alt='' />
                  <h3>{weather.description}</h3>
                </div>
                <div className='temperature'>
                  <h1>{`${weather.temp.toFixed()} °${units=== 'metric' ? 'C' : 'F'}`}</h1>
                </div>
              </div>

              {/* bottom description */}
              <Descriptions weather={weather} units={units} />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App;