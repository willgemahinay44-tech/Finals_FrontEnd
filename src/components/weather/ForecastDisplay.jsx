import { weatherService } from "../../services/weatherApi";

export default function ForecastDisplay({ forecast }) {
  // Get one entry per day (at noon if possible)
  const daily = forecast.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-4">
      <p className="text-sm font-medium text-gray-500 mb-3">5-Day Forecast</p>
      <div className="grid grid-cols-5 gap-2">
        {daily.map((item, i) => {
          const date = new Date(item.dt * 1000);
          return (
            <div key={i} className="flex flex-col items-center text-center bg-gray-50 rounded-lg p-3">
              <span className="text-xs text-gray-500 font-medium">{days[date.getDay()]}</span>
              <img
                src={weatherService.getWeatherIcon(item.weather[0].icon)}
                alt={item.weather[0].description}
                className="w-10 h-10"
              />
              <span className="text-sm font-semibold text-gray-800">{Math.round(item.main.temp)}°C</span>
              <span className="text-xs text-gray-400 capitalize leading-tight">{item.weather[0].description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}