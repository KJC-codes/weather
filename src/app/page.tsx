import weatherData from "./lib/weatherData";

export default function Home() {
  console.log(weatherData)
  return weatherData.current ? (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-amber-400 text-6xl">Tokyo</h1>
        <p className="text-9xl">
          {Math.round(weatherData.current.temperature2m)}&deg;
          {" "}
          <span className="text-4xl text-gray-400">
            Feels like {Math.round(weatherData.current.apparentTemperature)}&deg;
          </span>
        </p>
        <p className="text-amber-100">{weatherData.current.weatherCode}</p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>&copy; 2025 Blah Blah | <a className="text-amber-600" href="https://open-meteo.com/">Weather data by Open-Meteo.com</a></p>
      </footer>
    </div>
  ) : null;
}
