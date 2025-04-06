export default function InputCity({ handleSubmit, input, setUnits, units, handleChange }) {

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
            <label className="font-medium text-2xl block">
                Input a City
            </label>
            <input
                value={input}
                onChange={handleChange}
                type="text"
                placeholder="City"
                className="px-4 py-2 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            />
            <button
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                type="submit"
            >
                Get Weather!
            </button>
            <button
                onClick={() => setUnits(units === 'imperial' ? 'metric' : 'imperial')}
                type="button"
                className="w-full text-medium text-blue-600 hover:underline transition"
            >
                Switch to {units === 'imperial' ? 'Celsius' : 'Fahrenheit'}
            </button>
        </form>
    );
}
