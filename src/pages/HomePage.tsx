import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Newspaper, Cloud, Bell, MapPin, Loader2 } from 'lucide-react';
import { getCurrentLocation, fetchWeatherByCoordinates } from '../services/weatherService';

interface WeatherData {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
  };
}

const HomePage: React.FC = () => {
  const [currentLocationWeather, setCurrentLocationWeather] = useState<WeatherData | null>(null);
  const [locationLoading, setLocationLoading] = useState<boolean>(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState<boolean>(false);

  const features = [
    {
      title: 'Crop & Vegetable Prices',
      titleKn: 'ಬೆಳೆ ಮತ್ತು ತರಕಾರಿ ಬೆಲೆಗಳು',
      description: 'Get latest market prices from different mandis',
      descriptionKn: 'ವಿವಿಧ ಮಾರುಕಟ್ಟೆಗಳಿಂದ ಇತ್ತೀಚಿನ ಬೆಲೆಗಳನ್ನು ಪಡೆಯಿರಿ',
      icon: TrendingUp,
      href: '/prices',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'Government News & Schemes',
      titleKn: 'ಸರ್ಕಾರಿ ಸುದ್ದಿ ಮತ್ತು ಯೋಜನೆಗಳು',
      description: 'Stay updated with latest schemes and announcements',
      descriptionKn: 'ಇತ್ತೀಚಿನ ಯೋಜನೆಗಳು ಮತ್ತು ಘೋಷಣೆಗಳೊಂದಿಗೆ ನವೀಕರಿಸಿರಿ',
      icon: Newspaper,
      href: '/news',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Weather Forecast',
      titleKn: 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ',
      description: 'Check weather conditions for your district',
      descriptionKn: 'ನಿಮ್ಮ ಜಿಲ್ಲೆಯ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
      icon: Cloud,
      href: '/weather',
      color: 'bg-indigo-500 hover:bg-indigo-600',
    },
    {
      title: 'Alerts & Notifications',
      titleKn: 'ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಸೂಚನೆಗಳು',
      description: 'Important alerts and notifications',
      descriptionKn: 'ಪ್ರಮುಖ ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಸೂಚನೆಗಳು',
      icon: Bell,
      href: '/alerts',
      color: 'bg-red-500 hover:bg-red-600',
    },
  ];

  useEffect(() => {
    const loadCurrentLocationWeather = async () => {
      try {
        setLocationLoading(true);
        setLocationError(null);
        
        const position = await getCurrentLocation();
        const { latitude, longitude } = position.coords;
        
        const weatherData = await fetchWeatherByCoordinates(latitude, longitude);
        setCurrentLocationWeather(weatherData);
        setIsUsingCurrentLocation(true);
      } catch (error) {
        console.error('Error getting current location weather:', error);
        setLocationError('Unable to get current location');
        setIsUsingCurrentLocation(false);
        // Fallback to default weather data
        setCurrentLocationWeather({
          location: { name: 'Bangalore' },
          current: { temp_c: 28, condition: { text: 'Partly Cloudy' } }
        });
      } finally {
        setLocationLoading(false);
      }
    };

    loadCurrentLocationWeather();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Raitha Mitra
        </h1>
        <h2 className="text-3xl font-semibold text-green-600 mb-6">
          ರೈತ ಮಿತ್ರಕ್ಕೆ ಸ್ವಾಗತ
        </h2>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Quick Updates | ತ್ವರಿತ ನವೀಕರಣಗಳು
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/prices" 
            className="text-center p-4 rounded-lg hover:bg-green-50 transition-colors cursor-pointer group"
          >
            <div className="text-3xl font-bold text-green-600 group-hover:text-green-700">₹2,450</div>
            <div className="text-gray-600 group-hover:text-gray-700">Avg. Rice Price</div>
            <div className="text-sm text-gray-500 group-hover:text-gray-600">ಅಕ್ಕಿಯ ಸರಾಸರಿ ಬೆಲೆ</div>
          </Link>
          
          <Link 
            to="/weather" 
            className="text-center p-4 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group"
          >
            {locationLoading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
                <div className="text-sm text-gray-500">Loading...</div>
              </div>
            ) : (
              <>
                <div className="text-3xl font-bold text-blue-600 group-hover:text-blue-700">
                  {currentLocationWeather ? `${Math.round(currentLocationWeather.current.temp_c)}°C` : '28°C'}
                </div>
                <div className="text-gray-600 group-hover:text-gray-700">
                  {isUsingCurrentLocation ? 'Current Location' : 'Temperature'}
                </div>
                <div className="text-sm text-gray-500 group-hover:text-gray-600 flex items-center justify-center">
                  {isUsingCurrentLocation && <MapPin className="w-3 h-3 mr-1" />}
                  {currentLocationWeather?.location.name || 'ಪ್ರಸ್ತುತ ತಾಪಮಾನ'}
                </div>
                {isUsingCurrentLocation && (
                  <div className="text-xs text-blue-600 mt-1">
                    Showing weather for your current location
                  </div>
                )}
              </>
            )}
          </Link>
          
          <Link 
            to="/alerts" 
            className="text-center p-4 rounded-lg hover:bg-red-50 transition-colors cursor-pointer group"
          >
            <div className="text-3xl font-bold text-red-600 group-hover:text-red-700">3</div>
            <div className="text-gray-600 group-hover:text-gray-700">New Alerts</div>
            <div className="text-sm text-gray-500 group-hover:text-gray-600">ಹೊಸ ಎಚ್ಚರಿಕೆಗಳು</div>
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Link
              key={index}
              to={feature.href}
              className={`${feature.color} text-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                  <h4 className="text-lg font-medium text-opacity-90 mb-2">{feature.titleKn}</h4>
                  <p className="text-white text-opacity-80">{feature.description}</p>
                  <p className="text-white text-opacity-70 text-sm mt-1">{feature.descriptionKn}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;