import weatherData from "./lib/weatherData";
// import CloudIcon from '@mui/icons-material/Cloud';

export default function Home() {
  return weatherData.current ? (
    <div className="grid items-center justify-items-center min-h-screen p-8  gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="bg-zinc-800  rounded-2xl backdrop-blur-3xl p-8 flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-amber-400 text-6xl">Tokyo </h1>
        <p className="flex">
          <span className="text-sm">
            <span className="text-8xl">{Math.round(weatherData.current.temperature2m)}&deg;</span><br></br>
            <span className="text-xl text-amber-100">{weatherData.current.weatherDescription}</span><br></br>
            <span className="text-gray-400">Feels like {Math.round(weatherData.current.apparentTemperature)}&deg;</span>
          </span>
          {/* <img style={{ height: '110px' }} className="ml-6" src={`/weather_${weatherData.current.weatherCode}.svg`} alt="Partly Cloudy Icon" width="110" height="110" /> */}
          <img style={{ height: '110px' }} className="ml-6" src={`/temp.svg`} alt="Partly Cloudy Icon" width="110" height="110" />
          
        </p>
        
      </main>
      <footer className="text-xs row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>&copy; 2025 Blah Blah | <a className="text-amber-600" href="https://open-meteo.com/">Weather data by Open-Meteo.com</a></p>
      </footer>
    </div>
  ) : null;
}
