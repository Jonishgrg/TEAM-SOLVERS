import { useState, useEffect } from 'react'

export default function WeatherForecast() {
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState('Kathmandu')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchWeather()
  }, [])

  const fetchWeather = async () => {
    if (!location) return
    try {
      setLoading(true)
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=57a4f1f57e2deb6c0e6a8e4d9d6c7b8a`
      )
      const data = await response.json()
      setWeather({
        temp: data.main.temp,
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        location: data.name,
      })
    } catch (error) {
      console.error('Error fetching weather:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="weather-page">
      <h1>Weather Forecast</h1>

      <div className="weather-search">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
          placeholder="Enter location..."
        />
        <button onClick={fetchWeather} className="btn-primary">Get Weather</button>
      </div>

      {loading ? (
        <div className="loading">Loading weather data...</div>
      ) : weather ? (
        <div className="weather-card">
          <h2>{weather.location}</h2>
          <p className="temperature">{weather.temp}°C</p>
          <p className="condition">{weather.condition}</p>
          <div className="weather-details">
            <p>💧 Humidity: {weather.humidity}%</p>
            <p>💨 Wind: {weather.wind} m/s</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
