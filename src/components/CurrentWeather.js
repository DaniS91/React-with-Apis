import React, { useState, useEffect } from 'react';

function CurrentWeather() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const zipCode = 97213;
    //get zipcode from user
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`)
    //api call url goes here
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      } else {
        return response.json()
      }
    })
    .then((jsonifiedResponse) => {
      setWeatherData(jsonifiedResponse)
      setIsLoaded(true)
    })
    .catch((error) => {
    setError(error.message)
    setIsLoaded(true)
    });
}, []);

const icon = weatherData.weather[0].icon;
const iconUrl = "http://openweathermap.org/img/w/" + icon + ".png"

if (error) {
  return <h1>Error: {error}</h1>;
} else if (!isLoaded) {
  return <h1>...Loading...</h1>;
} else {
  return (
    <React.Fragment>
        <h1>Your Current Weather in {weatherData.name}</h1>
        <h2><img src={iconUrl} />{weatherData.weather[0].main}</h2>
        <ul>
          <li>Temp: {weatherData.main.temp}&deg;F</li>
          <li>Humidity: {weatherData.main.humidity}%</li>
          <li>Wind: {weatherData.wind.speed} mph</li>
          <li>Cloud coverage: {weatherData.clouds.all} %</li>
        </ul>
        <></>
      </React.Fragment>
  );
}
}


export default CurrentWeather;