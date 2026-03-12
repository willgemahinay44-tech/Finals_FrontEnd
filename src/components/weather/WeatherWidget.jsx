import { useState, useEffect } from "react";
import { weatherService } from "../../services/weatherApi";
import ForecastDisplay from "./ForecastDisplay";
import { LoadingSpinner } from "../common/LoadingSpinner";

export default function WeatherWidget() {
  const [city, setCity] = useState("Manila");
  const [inputCity, setInputCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const [w, f] = await Promise.all([
        weatherService.getCurrentWeather(cityName),
        weatherService.getForecast(cityName),
      ]);
      setWeather(w);
      setForecast(f);
    } catch (err) {
      setError("City not found. Try another city name.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = () => {
    if (inputCity.trim()) {
      setCity(inputCity.trim());
      setInputCity("");
    }
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) return setError("Geolocation not supported.");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      setLoading(true);
      setError(null);
      try {
        const [w, f] = await Promise.all([
          weatherService.getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
          weatherService.getForecastByCoords(pos.coords.latitude, pos.coords.longitude),
        ]);
        setWeather(w);
        setForecast(f);
        setCity(w.name);
      } catch {
        setError("Could not get location weather.");
      } finally {
        setLoading(false);
      }
    }, () => setError("Location access denied."));
  };

  const getWeatherBg = (main) => {
    const map = {
      Clear: "from-yellow-400 to-orange-400",
      Clouds: "from-gray-400 to-gray-600",
      Rain: "from-blue-500 to-blue-800",
      Drizzle: "from-blue-400 to-blue-600",
      Thunderstorm: "from-gray-700 to-gray-900",
      Snow: "from-blue-100 to-blue-300",
      Mist: "from-gray-300 to-gray-500",
      Fog: "from-gray-300 to-gray-500",
    };
    return map[main] || "from-blue-500 to-blue-700";
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${weather ? getWeatherBg(weather.weather[0].main) : "from-blue-500 to-blue-700"} p-6 text-white`}>
        <h2 className="text-lg font-semibold mb-4">Weather Forecast</h2>

        {/* Search bar */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search city..."
            className="flex-1 px-3 py-2 rounded-lg text-gray-800 text-sm focus:outline-none"
          />
          <button onClick={handleSearch} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition">
            Search
          </button>
          <button onClick={handleGeolocate} title="Use my location" className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition">
            📍
          </button>
        </div>

        {/* Current weather */}
        {loading ? (
          <div className="text-white/80 text-sm">Loading weather...</div>
        ) : error ? (
          <div className="text-red-200 text-sm">{error}</div>
        ) : weather ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</p>
              <p className="text-xl capitalize">{weather.weather[0].description}</p>
              <p className="text-white/80 mt-1">{weather.name}, {weather.sys.country}</p>
              <div className="flex gap-4 mt-2 text-sm text-white/80">
                <span>💧 {weather.main.humidity}%</span>
                <span>🌬️ {Math.round(weather.wind.speed)} m/s</span>
                <span>🌡️ Feels {Math.round(weather.main.feels_like)}°C</span>
              </div>
            </div>
            <img
              src={weatherService.getWeatherIcon(weather.weather[0].icon)}
              alt={weather.weather[0].description}
              className="w-20 h-20"
            />
          </div>
        ) : null}
      </div>

      {/* 5-day forecast */}
      {forecast && !loading && !error && (
        <ForecastDisplay forecast={forecast} />
      )}
    </div>
  );
}