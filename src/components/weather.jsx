import React from "react";
import './weather.css';
import { useState, useEffect } from "react";
import search from './images/search.png';
import clear from './images/clear.png';
import cloud from './images/cloud.png';
import drizzle from './images/drizzle.png';
import humidityIcon from './images/humidity.png';
import rain from './images/rain.png';
import snow from './images/snow.png';
import windIcon from './images/wind.png';
import pressure from './images/pressure.png';
import sealevel from './images/sealevel.png';
import country from './images/country.png';

function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('Kakkanad');
    const [searchInput, setSearchInput] = useState('');

    const fetchWeatherData = async (location) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`);
            const result = await response.json();

            if (result.cod === 200) {
                setWeatherData(result);
                console.log(result);
            } else {
                alert("Location not found. Please enter a valid location.");
                setWeatherData(null);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchWeatherData(location);
    }, [location]);

    const handleSearchClick = () => {
        if (searchInput) {
            setLocation(searchInput);
        }
    };

    const weatherIcons = {
        Clear: clear,
        Clouds: cloud,
        Drizzle: drizzle,
        Rain: rain,
        Snow: snow,
        Thunderstorm: rain,
        Mist: drizzle,
    };

    return (
        <div className="Container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder='Enter Location'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <img
                    src={search}
                    alt="Search"
                    onClick={handleSearchClick}
                />
            </div>
            {weatherData && (
                <>
                    <div className="centered-content">
                        <img src={weatherIcons[weatherData.weather[0].main] || clear} alt="Weather Icon" className="weathericon" />
                        <p className="temp">{weatherData.main.temp}°C</p>
                    </div>
                    <p className="location">{weatherData.name}</p>
                    <div className="row">
                        <div className="col">
                            <img src={humidityIcon} alt="Humidity Icon" />
                            <div>
                                <p>{weatherData.main.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={windIcon} alt="Wind Icon" />
                            <div>
                                <p>{weatherData.wind.speed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={pressure} alt="Pressure Icon" />
                            <div>
                                <p>{weatherData.main.pressure}Pa</p>
                                <span>Pressure</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={sealevel} alt="Sea Level Icon" />
                            <div>
                                <p>{weatherData.main.sea_level}M</p>
                                <span>Sea Level</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={country} alt="country" />
                            <div>
                                <p>{weatherData.sys.country}</p>
                                <span>Country</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Weather;
