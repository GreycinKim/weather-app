import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion';

import './App.css'
import Header from './components/Header.jsx'
import WeatherCard from './components/WeatherCard.jsx'
import InputCity from './components/InputCity.jsx'

function App() {
    // input: The current value typed by the user.
  const [input, setInput] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);
  const [units, setUnits] = useState('imperial');

    // handleChange: The function that updates the value when the user types.
    function handleChange(event) {
      setInput(event.target.value);
  }

  // handleSubmit: The function that triggers when the user submits the form.
    async function handleSubmit(event) {
        event.preventDefault()

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=d8989fb1b2f89b771d94813f7c6f8ca2&units=${units}`);
            if (!response.ok) {
                throw new Error("City not found"); // This will jump to catch block
            }
            const data = await response.json();
            setWeatherData(data);
            setInput('');
            setError(null);
        } catch (error) {
            setError("City not found. Please try again.");
        }
    }

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [0, window.innerHeight], [40, -40]);
    const rotateY = useTransform(x, [0, window.innerWidth], [-40, 40]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);


    return (

            <div className="min-h-screen flex items-center justify-center px-4 bg-slate-400">
                <motion.div
                    style={{
                        rotateX: rotateX,
                        rotateY: rotateY,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <div className="w-full max-w-2xl bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-xl border border-white/60 text-center">
                        <Header />

                        {error && (
                            <div className="bg-red-600 text-white font-semibold rounded-md px-4 py-2 shadow-md w-full">
                                {error}
                            </div>
                        )}

                        <InputCity
                            input={input}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            units={units}
                            setUnits={setUnits}
                        />

                        {weatherData.main && (
                            <WeatherCard weatherData={weatherData} units={units} />
                        )}
                    </div>
                </motion.div>
            </div>
    );

}

export default App
