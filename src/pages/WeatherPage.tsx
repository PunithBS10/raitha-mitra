import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Thermometer, Wind, Sun, CloudRain, Loader2, AlertCircle, MapPin } from 'lucide-react';
import { fetchWeatherData, fetchWeatherByCoordinates, getCurrentLocation } from '../services/weatherService';

interface WeatherData {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    cloud: number;
  };
}

const WeatherPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('current');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState<boolean>(false);

  const cities = [
    { value: 'current', label: 'Current Location', labelKn: 'ಪ್ರಸ್ತುತ ಸ್ಥಳ' },
    { value: 'Bangalore', label: 'Bangalore', labelKn: 'ಬೆಂಗಳೂರು' },
    { value: 'Mysore', label: 'Mysore', labelKn: 'ಮೈಸೂರು' },
    { value: 'Hassan', label: 'Hassan', labelKn: 'ಹಾಸನ' },
    { value: 'Mandya', label: 'Mandya', labelKn: 'ಮಂಡ್ಯ' },
    { value: 'Tumkur', label: 'Tumkur', labelKn: 'ತುಮಕೂರು' },
    { value: 'Shimoga', label: 'Shimoga', labelKn: 'ಶಿವಮೊಗ್ಗ' },
    { value: 'Davangere', label: 'Davangere', labelKn: 'ದಾವಣಗೆರೆ' },
    { value: 'Hubli', label: 'Hubli', labelKn: 'ಹುಬ್ಬಳ್ಳಿ' },
  ];

  const loadWeatherData = async (cityOrLocation: string) => {
    setLoading(true);
    setError(null);
    
    try {
      if (cityOrLocation === 'current') {
        // Get current location weather
        const position = await getCurrentLocation();
        const { latitude, longitude } = position.coords;
        const data = await fetchWeatherByCoordinates(latitude, longitude);
        setWeatherData(data);
        setIsUsingCurrentLocation(true);
      } else {
        // Get weather for selected city
        const data = await fetchWeatherData(cityOrLocation);
        setWeatherData(data);
        setIsUsingCurrentLocation(false);
      }
    } catch (err) {
      if (cityOrLocation === 'current') {
        setError('Unable to get your current location. Please select a city manually.');
        // Fallback to Bangalore if current location fails
        setSelectedCity('Bangalore');
        try {
          const data = await fetchWeatherData('Bangalore');
          setWeatherData(data);
          setIsUsingCurrentLocation(false);
        } catch (fallbackErr) {
          setError('Failed to fetch weather data. Please try again.');
        }
      } else {
        setError('Failed to fetch weather data. Please try again.');
      }
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData(selectedCity);
  }, [selectedCity]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return <Sun className="w-12 h-12 text-yellow-500" />;
    } else if (conditionLower.includes('cloud')) {
      return <Cloud className="w-12 h-12 text-gray-500" />;
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudRain className="w-12 h-12 text-blue-500" />;
    } else {
      return <Cloud className="w-12 h-12 text-gray-500" />;
    }
  };

  const getConditionInKannada = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return 'ಬಿಸಿಲು';
    } else if (conditionLower.includes('partly cloudy')) {
      return 'ಭಾಗಶಃ ಮೋಡ';
    } else if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) {
      return 'ಮೋಡ';
    } else if (conditionLower.includes('rain')) {
      return 'ಮಳೆ';
    } else if (conditionLower.includes('drizzle')) {
      return 'ಸಿಂಪಣೆ';
    } else {
      return 'ಮೋಡ';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">
            {selectedCity === 'current' ? 'Getting your location...' : 'Loading weather data...'}
          </p>
          <p className="text-gray-500 text-sm">
            {selectedCity === 'current' ? 'ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪಡೆಯುತ್ತಿದೆ...' : 'ಹವಾಮಾನ ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-2">{error}</p>
          <button
            onClick={() => loadWeatherData(selectedCity)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again | ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ
          </button>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Weather Forecast</h1>
          <h2 className="text-2xl font-semibold text-green-600">ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ</h2>
        </div>
        
        {/* City Selector */}
        <div className="flex items-center space-x-2">
          <Cloud className="w-5 h-5 text-gray-600" />
          <select
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {cities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label} ({city.labelKn})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Current Location Indicator */}
      {isUsingCurrentLocation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center text-blue-800">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="font-medium">
              Showing weather for your current location | ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳದ ಹವಾಮಾನವನ್ನು ತೋರಿಸುತ್ತಿದೆ
            </span>
          </div>
        </div>
      )}

      {/* Current Weather */}
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold">{weatherData.location.name}</h3>
            <p className="text-lg text-blue-100">
              {isUsingCurrentLocation ? 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳ' : 
               cities.find(city => city.value === selectedCity)?.labelKn}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{Math.round(weatherData.current.temp_c)}°C</div>
            <div className="text-lg">{weatherData.current.condition.text}</div>
            <div className="text-sm text-blue-100">{getConditionInKannada(weatherData.current.condition.text)}</div>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          {getWeatherIcon(weatherData.current.condition.text)}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <Droplets className="w-8 h-8 mx-auto mb-2" />
            <div className="text-xl font-semibold">{weatherData.current.humidity}%</div>
            <div className="text-sm">Humidity</div>
            <div className="text-xs">ಆರ್ದ್ರತೆ</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <Wind className="w-8 h-8 mx-auto mb-2" />
            <div className="text-xl font-semibold">{Math.round(weatherData.current.wind_kph)} km/h</div>
            <div className="text-sm">Wind Speed</div>
            <div className="text-xs">ಗಾಳಿ ವೇಗ</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <Cloud className="w-8 h-8 mx-auto mb-2" />
            <div className="text-xl font-semibold">{weatherData.current.cloud}%</div>
            <div className="text-sm">Cloud Cover</div>
            <div className="text-xs">ಮೋಡ ಆವರಣ</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
            <Thermometer className="w-8 h-8 mx-auto mb-2" />
            <div className="text-xl font-semibold">{Math.round(weatherData.current.temp_c)}°C</div>
            <div className="text-sm">Temperature</div>
            <div className="text-xs">ತಾಪಮಾನ</div>
          </div>
        </div>
      </div>

      {/* Weather Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Thermometer className="w-8 h-8 text-red-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Temperature</h3>
              <p className="text-sm text-gray-600">ತಾಪಮಾನ</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-red-500 mb-2">
            {Math.round(weatherData.current.temp_c)}°C
          </div>
          <p className="text-gray-600">Current temperature in {weatherData.location.name}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Droplets className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Humidity</h3>
              <p className="text-sm text-gray-600">ಆರ್ದ್ರತೆ</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-500 mb-2">
            {weatherData.current.humidity}%
          </div>
          <p className="text-gray-600">Relative humidity level</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Wind className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Wind Speed</h3>
              <p className="text-sm text-gray-600">ಗಾಳಿ ವೇಗ</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-green-500 mb-2">
            {Math.round(weatherData.current.wind_kph)} km/h
          </div>
          <p className="text-gray-600">Current wind speed</p>
        </div>
      </div>

      {/* Farming Advisory */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-green-800 mb-4">
          Farming Advisory | ಕೃಷಿ ಸಲಹೆ
        </h3>
        
        <div className="space-y-3">
          {weatherData.current.temp_c > 30 && (
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="text-green-800">
                  <strong>High Temperature:</strong> Ensure adequate irrigation and provide shade for crops.
                </p>
                <p className="text-green-700 text-sm">
                  <strong>ಹೆಚ್ಚಿನ ತಾಪಮಾನ:</strong> ಸಾಕಷ್ಟು ನೀರಾವರಿ ಮತ್ತು ಬೆಳೆಗಳಿಗೆ ನೆರಳು ಒದಗಿಸಿ.
                </p>
              </div>
            </div>
          )}
          
          {weatherData.current.humidity > 80 && (
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-green-800">
                  <strong>High Humidity:</strong> Monitor crops for fungal diseases and ensure good ventilation.
                </p>
                <p className="text-green-700 text-sm">
                  <strong>ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆ:</strong> ಶಿಲೀಂಧ್ರ ರೋಗಗಳಿಗಾಗಿ ಬೆಳೆಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ ಮತ್ತು ಉತ್ತಮ ಗಾಳಿ ಪ್ರವಾಹವನ್ನು ಖಚಿತಪಡಿಸಿ.
                </p>
              </div>
            </div>
          )}
          
          {weatherData.current.wind_kph > 20 && (
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-green-800">
                  <strong>Strong Winds:</strong> Secure tall crops and avoid spraying pesticides.
                </p>
                <p className="text-green-700 text-sm">
                  <strong>ಬಲವಾದ ಗಾಳಿ:</strong> ಎತ್ತರದ ಬೆಳೆಗಳನ್ನು ಭದ್ರಪಡಿಸಿ ಮತ್ತು ಕೀಟನಾಶಕ ಸಿಂಪಣೆಯನ್ನು ತಪ್ಪಿಸಿ.
                </p>
              </div>
            </div>
          )}
          
          {weatherData.current.temp_c <= 30 && weatherData.current.humidity <= 80 && weatherData.current.wind_kph <= 20 && (
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-green-800">
                  <strong>Good Conditions:</strong> Favorable weather for most farming activities.
                </p>
                <p className="text-green-700 text-sm">
                  <strong>ಉತ್ತಮ ಪರಿಸ್ಥಿತಿಗಳು:</strong> ಹೆಚ್ಚಿನ ಕೃಷಿ ಚಟುವಟಿಕೆಗಳಿಗೆ ಅನುಕೂಲಕರ ಹವಾಮಾನ.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Data Source */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Data Source:</strong> Weather data provided by WeatherAPI.com - Updated in real-time
        </p>
        <p className="text-sm text-blue-700 mt-1">
          <strong>ಮಾಹಿತಿ ಮೂಲ:</strong> WeatherAPI.com ನಿಂದ ಒದಗಿಸಲಾದ ಹವಾಮಾನ ಮಾಹಿತಿ - ನೈಜ ಸಮಯದಲ್ಲಿ ನವೀಕರಿಸಲಾಗುತ್ತದೆ
        </p>
      </div>
    </div>
  );
};

export default WeatherPage;