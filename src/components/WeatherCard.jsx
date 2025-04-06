export default function WeatherCard({ weatherData, units }) {
    let currentState = weatherData.weather?.[0]?.main;

    let bgColor = "bg-gray-200";
    if (currentState === "Clear") bgColor = "bg-yellow-200";
    else if (currentState === "Rain") bgColor = "bg-blue-300";
    else if (currentState === "Clouds") bgColor = "bg-gray-300";

    return (
        <div className={`${bgColor} rounded-xl shadow-xl p-6 w-full`}>
            <h2 className="bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-8 font-bold text-2xl">Weather in {weatherData.name}
                <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather?.[0]?.icon}@2x.png`}
                    alt={weatherData.weather?.[0]?.description}
                    className="w-60 mx-auto"
                />
                <h1 className="text-2xl font-bold">{weatherData.name}, {weatherData.sys?.country}</h1>
                <h2 className="text-4xl font-extrabold text-slate-800">
                    {Math.round(weatherData.main?.temp)}°{units === 'imperial' ? 'F' : 'C'}
                </h2>
                <p className="capitalize text-gray-700 italic">
                    {weatherData.weather?.[0]?.description}
                </p>
            </h2>

        </div>
    );
}
