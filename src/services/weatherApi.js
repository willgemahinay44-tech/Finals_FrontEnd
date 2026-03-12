const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const weatherService = {
  getCurrentWeather: async (city) => {
    const res = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("City not found or API error");
    return res.json();
  },

  getForecast: async (city) => {
    const res = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("City not found or API error");
    return res.json();
  },

  getWeatherByCoords: async (lat, lon) => {
    const res = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("Location error");
    return res.json();
  },

  getForecastByCoords: async (lat, lon) => {
    const res = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("Location error");
    return res.json();
  },

  getWeatherIcon: (code) => `https://openweathermap.org/img/wn/${code}@2x.png`,
};