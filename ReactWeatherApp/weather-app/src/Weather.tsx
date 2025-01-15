import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from './assets/search.png'
import clear_icon from './assets/clear.png'
import cloud_icon from './assets/clouds.png'
import drizzle_icon from './assets/drizzle.png'
import rain_icon from './assets/rain.png'
import snow_icon from './assets/snow.png'
import wind_icon from './assets/wind.png'
import humidity_icon from './assets/humidity.png'

interface WeatherData {
    humidity: number;
    windSpeed: number;
    temperature: number;
    location: string;
    icon: string;
}

const Weather: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const allICons: { [key: string]: string } = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const search = async (city: string): Promise<void> =>{

        if (!city.trim()) {
            alert("Wpisz nazwe miasta");
            return;
        }

        if (!/^[\p{L}\s]+$/u.test(city)) {
            alert("Wpisz nazwę miasta wpisując tylko litery");
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&appid=${import.meta.env.VITE_APP_ID}`
        
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod !== 200) {
                alert("Nie znaleziono miasta. Spróbuj ponownie.");
                return;
              }

            const icon = allICons[data.weather[0]?.icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
        } catch (error){
            console.error("Error fetching data:", error);
        }
    }
    

    useEffect(() => {
        search("Brodnica");
      }, []);

  return (       
      <div className="weather">
      <h1>Weather App</h1>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder="Wpisz miasto" />
            <img 
             src={search_icon} 
             alt="" 
             onClick={() => {
                if(inputRef.current){
                    search(inputRef.current?.value || "")
                }
             }}
            />
        </div>
        {weatherData && (
        <>
            <img src={weatherData.icon} alt="" className="weather-icon" />
            <p className="temperature">{weatherData.temperature}°C</p>
            <p className="location">{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Wilgotność</span>
                    </div>
                </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span>Prędkość wiatru</span>
                </div>
            </div>
            </div>
        </>
         )}
      </div>
  )
}

export default Weather
