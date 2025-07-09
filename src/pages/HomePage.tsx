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
      color: 'bg-gradient-to-br from-[#8FBC8B] to-[#7AA87A] hover:from-[#7AA87A] hover:to-[#6B9A6B]',
    },
    {
      title: 'Government News & Schemes',
      titleKn: 'ಸರ್ಕಾರಿ ಸುದ್ದಿ ಮತ್ತು ಯೋಜನೆಗಳು',
      description: 'Stay updated with latest schemes and announcements',
      descriptionKn: 'ಇತ್ತೀಚಿನ ಯೋಜನೆಗಳು ಮತ್ತು ಘೋಷಣೆಗಳೊಂದಿಗೆ ನವೀಕರಿಸಿರಿ',
      icon: Newspaper,
      href: '/news',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    },
    {
      title: 'Weather Forecast',
      titleKn: 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ',
      description: 'Check weather conditions for your district',
      descriptionKn: 'ನಿಮ್ಮ ಜಿಲ್ಲೆಯ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
      icon: Cloud,
      href: '/weather',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
    },
    {
      title: 'Alerts & Notifications',
      titleKn: 'ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಸೂಚನೆಗಳು',
      description: 'Important alerts and notifications',
      descriptionKn: 'ಪ್ರಮುಖ ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಸೂಚನೆಗಳು',
      icon: Bell,
      href: '/alerts',
      color: 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
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
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Raitha Mitra
        </h1>
        <h2 className="text-3xl font-semibold text-[#8FBC8B] mb-6">
          ರೈತ ಮಿತ್ರಕ್ಕೆ ಸ್ವಾಗತ
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your comprehensive digital companion for modern farming in Karnataka
        </p>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Quick Updates | ತ್ವರಿತ ನವೀಕರಣಗಳು
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link 
            to="/prices" 
            className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-[#8FBC8B] hover:shadow-md"
          >
            <div className="text-4xl font-bold text-[#8FBC8B] group-hover:text-[#7AA87A] mb-2">₹2,450</div>
            <div className="text-gray-700 font-medium mb-1">Avg. Rice Price</div>
            <div className="text-sm text-gray-500">ಅಕ್ಕಿಯ ಸರಾಸರಿ ಬೆಲೆ</div>
          </Link>
          
          <Link 
            to="/weather" 
            className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-blue-400 hover:shadow-md"
          >
            {locationLoading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
                <div className="text-sm text-gray-500">Loading...</div>
              </div>
            ) : (
              <>
                <div className="text-4xl font-bold text-blue-500 group-hover:text-blue-600 mb-2">
                  {currentLocationWeather ? `${Math.round(currentLocationWeather.current.temp_c)}°C` : '28°C'}
                </div>
                <div className="text-gray-700 font-medium mb-1">
                  {isUsingCurrentLocation ? 'Current Location' : 'Temperature'}
                </div>
                <div className="text-sm text-gray-500 flex items-center justify-center">
                  {isUsingCurrentLocation && <MapPin className="w-3 h-3 mr-1" />}
                  {currentLocationWeather?.location.name || 'ಪ್ರಸ್ತುತ ತಾಪಮಾನ'}
                </div>
                {isUsingCurrentLocation && (
                  <div className="text-xs text-blue-500 mt-1">
                    Showing weather for your current location
                  </div>
                )}
              </>
            )}
          </Link>
          
          <Link 
            to="/alerts" 
            className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-red-400 hover:shadow-md"
          >
            <div className="text-4xl font-bold text-red-500 group-hover:text-red-600 mb-2">3</div>
            <div className="text-gray-700 font-medium mb-1">New Alerts</div>
            <div className="text-sm text-gray-500">ಹೊಸ ಎಚ್ಚರಿಕೆಗಳು</div>
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Link
              key={index}
              to={feature.href}
              className={`${feature.color} text-white p-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex items-start space-x-6">
                <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                  <Icon className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <h4 className="text-lg font-medium text-white text-opacity-90 mb-3">{feature.titleKn}</h4>
                  <p className="text-white text-opacity-90 leading-relaxed">{feature.description}</p>
                  <p className="text-white text-opacity-80 text-sm mt-2 leading-relaxed">{feature.descriptionKn}</p>
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