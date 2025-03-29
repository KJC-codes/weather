import { fetchWeatherApi } from 'openmeteo';
import getWeatherDescription from './weatherCode';
	
const params = {
	"latitude": 35.6895,
	"longitude": 139.6917,
	"current": [
    "is_day",
    "temperature_2m",
    "wind_speed_10m",
    "wind_direction_10m",
    "precipitation",
    "cloud_cover",
    "apparent_temperature",
    "relative_humidity_2m",
    "weather_code"
  ]
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Helper function to form time ranges
// const range = (start: number, stop: number, step: number) =>
// 	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();
// const timezone = response.timezone();
// const timezoneAbbreviation = response.timezoneAbbreviation();
// const latitude = response.latitude();
// const longitude = response.longitude();

const current = response.current()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
  current: {
		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		isDay: current.variables(0)!.value(),
		temperature2m: current.variables(1)!.value(),
		windSpeed10m: current.variables(2)!.value(),
		windDirection10m: current.variables(3)!.value(),
		precipitation: current.variables(4)!.value(),
		cloudCover: current.variables(5)!.value(),
		apparentTemperature: current.variables(6)!.value(),
		relativeHumidity2m: current.variables(7)!.value(),
    weatherCode: current.variables(8)!.value(),
    weatherDescription: getWeatherDescription(current.variables(8)!.value()),
	},
};

export default weatherData;