import React, { useState } from 'react';
import { Thermometer, CloudRain } from 'lucide-react';

interface Prediction {
  temperature: number | null;
  precipitation: number | null;
}

export function TemperaturePrediction() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [prediction, setPrediction] = useState<Prediction>({
    temperature: null,
    precipitation: null
  });

  // Placeholder for the actual prediction model
  const getPrediction = async (year: number): Promise<Prediction> => {
    // This is where you'll add your model
    console.log('Prediction requested for year:', year);
    return {
      temperature: null,
      precipitation: null
    };
  };

  const handlePredict = async () => {
    const result = await getPrediction(year);
    setPrediction(result);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Climate Predictions
      </h2>

      <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
        <div className="flex-1">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Year
          </label>
          <input
            type="number"
            id="year"
            min={new Date().getFullYear()}
            max={2100}
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-colors"
          />
        </div>
        <button
          onClick={handlePredict}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex-shrink-0"
        >
          Get Predictions
        </button>
      </div>

      {(prediction.temperature !== null || prediction.precipitation !== null) && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <Thermometer className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Temperature Change</h3>
            </div>
            <p className="text-lg text-gray-900">
              By {year}:
              <span className="font-bold ml-2">
                {prediction.temperature !== null 
                  ? `${prediction.temperature > 0 ? '+' : ''}${prediction.temperature}°C`
                  : 'Calculating...'}
              </span>
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <CloudRain className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Precipitation Change</h3>
            </div>
            <p className="text-lg text-gray-900">
              By {year}:
              <span className="font-bold ml-2">
                {prediction.precipitation !== null
                  ? `${prediction.precipitation > 0 ? '+' : ''}${prediction.precipitation}%`
                  : 'Calculating...'}
              </span>
            </p>
          </div>

          <div className="md:col-span-2 mt-2">
            <p className="text-sm text-gray-600">
              These predictions are based on climate models and historical trends. Temperature change is measured in degrees Celsius, and precipitation change is shown as a percentage relative to current levels.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}