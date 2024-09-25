import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';
import ManagerPanel from '../Manager/ManagerPanel';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const API_KEY = 'dfa16cddfa333cebf70a4a40e8d81942';
  const CITY_NAME = 'Islamabad';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const fetchForecastData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}`
        );
        setForecastData(response.data.list);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };

    fetchWeatherData();
    fetchForecastData();
  }, []); 

  if (!weatherData || forecastData.length === 0) {
    return <div>Loading...</div>;
  }

  // Group forecast data by date
  const groupedForecastData = forecastData.reduce((acc, forecast) => {
    const date = forecast.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(forecast);
    return acc;
  }, {});

  // Convert temperature from Kelvin to Celsius
  const temperatureCelsius = (weatherData.main.temp - 273.15).toFixed(2);

  // Get keys (dates) of grouped forecast data
  const forecastDates = Object.keys(groupedForecastData);

  const handlePageChange = (index) => {
    setCurrentPage(index);
  };

  return (
    <div>
    <ManagerPanel />
    <div
    className="container-fluid weather-container d-flex justify-content-center align-items-center"
    style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/clouds.jpeg)`, backgroundSize: 'cover', minHeight: '100vh' }}
  >
      <div className="row">
        <div className="col-md-4">
          <div className="current-weather text-center">
            <img
              src="weather.jpeg"
              alt="Weather Logo"
              className="weather-logo img-fluid mb-3"
              style={{ maxWidth: '100px' }}
            />
            <h2>Current Weather</h2>
            <p>{weatherData.name}</p>
            <p>{temperatureCelsius} °C</p>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt="Weather icon"
              className="weather-icon"
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="forecast">
            <h2>5-Day Forecast</h2>
            <div className="forecast-navigation">
              {forecastDates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index)}
                  className="btn btn-outline-primary mr-2"
                >
                  {date}
                </button>
              ))}
            </div>
            <div className="forecast-list">
              {groupedForecastData[forecastDates[currentPage]].map((forecast, index) => (
                <div key={index} className="forecast-item">
                  <p>{forecast.dt_txt.split(' ')[1]}</p>
                  <img
                    src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                    alt="Weather icon"
                    className="weather-icon"
                  />
                  <p>{(forecast.main.temp - 273.15).toFixed(2)} °C</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Weather;
