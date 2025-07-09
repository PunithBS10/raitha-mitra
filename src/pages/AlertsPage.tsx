import React from 'react';
import { AlertTriangle, Info, CheckCircle, Clock, MapPin } from 'lucide-react';

interface Alert {
  id: number;
  type: 'warning' | 'info' | 'success' | 'critical';
  title: string;
  titleKn: string;
  message: string;
  messageKn: string;
  timestamp: string;
  district: string;
  districtKn: string;
  isRead: boolean;
}

const AlertsPage: React.FC = () => {
  const alerts: Alert[] = [
    {
      id: 1,
      type: 'critical',
      title: 'Heavy Rainfall Warning',
      titleKn: 'ಭಾರೀ ಮಳೆ ಎಚ್ಚರಿಕೆ',
      message: 'Heavy to very heavy rainfall expected in coastal and malnad regions for the next 48 hours. Farmers are advised to take necessary precautions.',
      messageKn: 'ಮುಂದಿನ 48 ಗಂಟೆಗಳಲ್ಲಿ ಕರಾವಳಿ ಮತ್ತು ಮಲೆನಾಡು ಪ್ರದೇಶಗಳಲ್ಲಿ ಭಾರೀ ಮಳೆ ನಿರೀಕ್ಷೆ. ರೈತರು ಅಗತ್ಯ ಎಚ್ಚರಿಕೆಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ಸಲಹೆ ನೀಡಲಾಗಿದೆ.',
      timestamp: '2024-01-15T08:30:00Z',
      district: 'Statewide',
      districtKn: 'ರಾಜ್ಯಾದ್ಯಂತ',
      isRead: false,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Tomato Price Surge Alert',
      titleKn: 'ಟೊಮೆಟೊ ಬೆಲೆ ಏರಿಕೆ ಎಚ್ಚರಿಕೆ',
      message: 'Tomato prices have increased by 45% in major markets. Consider selling stored produce or adjusting planting schedules.',
      messageKn: 'ಪ್ರಮುಖ ಮಾರುಕಟ್ಟೆಗಳಲ್ಲಿ ಟೊಮೆಟೊ ಬೆಲೆ 45% ಏರಿಕೆಯಾಗಿದೆ. ಸಂಗ್ರಹಿಸಿದ ಉತ್ಪನ್ನಗಳನ್ನು ಮಾರಾಟ ಮಾಡಲು ಅಥವಾ ನೆಟ್ಟಿಗೆ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಸರಿಹೊಂದಿಸಲು ಪರಿಗಣಿಸಿ.',
      timestamp: '2024-01-15T06:15:00Z',
      district: 'Bangalore',
      districtKn: 'ಬೆಂಗಳೂರು',
      isRead: false,
    },
    {
      id: 3,
      type: 'info',
      title: 'New Subsidy Scheme Launch',
      titleKn: 'ಹೊಸ ಸಬ್ಸಿಡಿ ಯೋಜನೆ ಪ್ರಾರಂಭ',
      message: 'Karnataka government has launched a new subsidy scheme for drip irrigation systems. Applications open from tomorrow.',
      messageKn: 'ಕೆ್ಬಿಸೆಚ್ಚರಣಾ ವ್ಯವಸ್ಥೆಗಳಿಗಾಗಿ ಕರ್ನಾಟಕ ಸರ್ಕಾರ ಹೊಸ ಸಬ್ಸಿಡಿ ಯೋಜನೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿದೆ. ನಾಳೆಯಿಂದ ಅರ್ಜಿಗಳು ಪ್ರಾರಂಭ.',
      timestamp: '2024-01-14T16:45:00Z',
      district: 'Statewide',
      districtKn: 'ರಾಜ್ಯಾದ್ಯಂತ',
      isRead: true,
    },
    {
      id: 4,
      type: 'success',
      title: 'Monsoon Forecast Update',
      titleKn: 'ಮಾನ್ಸೂನ್ ಮುನ್ಸೂಚನೆ ನವೀಕರಣ',
      message: 'IMD confirms normal monsoon for Karnataka this year. Good news for Kharif crop planning.',
      messageKn: 'ಈ ವರ್ಷ ಕರ್ನಾಟಕಕ್ಕೆ ಸಾಮಾನ್ಯ ಮಾನ್ಸೂನ್ ಎಂದು IMD ಖಚಿತಪಡಿಸಿದೆ. ಖರೀಫ್ ಬೆಳೆ ಯೋಜನೆಗೆ ಒಳ್ಳೆಯ ಸುದ್ದಿ.',
      timestamp: '2024-01-14T10:20:00Z',
      district: 'Statewide',
      districtKn: 'ರಾಜ್ಯಾದ್ಯಂತ',
      isRead: true,
    },
    {
      id: 5,
      type: 'warning',
      title: 'Pest Attack Alert - Mandya',
      titleKn: 'ಕೀಟ ದಾಳಿ ಎಚ್ಚರಿಕೆ - ಮಂಡ್ಯ',
      message: 'Brown plant hopper infestation reported in rice fields. Immediate action recommended.',
      messageKn: 'ಅಕ್ಕಿ ಹೊಲಗಳಲ್ಲಿ ಕಂದು ಸಸ್ಯ ಚಿಗುರೆ ಹರಡುವಿಕೆ ವರದಿಯಾಗಿದೆ. ತಕ್ಷಣ ಕ್ರಮ ಸಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.',
      timestamp: '2024-01-13T14:10:00Z',
      district: 'Mandya',
      districtKn: 'ಮಂಡ್ಯ',
      isRead: true,
    },
    {
      id: 6,
      type: 'info',
      title: 'Training Program Registration',
      titleKn: 'ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮ ನೋಂದಣಿ',
      message: 'Free training program on organic farming techniques. Registration deadline: January 20th.',
      messageKn: 'ಸಾವಯವ ಕೃಷಿ ತಂತ್ರಗಳ ಬಗ್ಗೆ ಉಚಿತ ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮ. ನೋಂದಣಿ ಅಂತಿಮ ದಿನಾಂಕ: ಜನವರಿ 20.',
      timestamp: '2024-01-12T09:30:00Z',
      district: 'Hassan',
      districtKn: 'ಹಾಸನ',
      isRead: true,
    },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'info':
        return <Info className="w-6 h-6 text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      default:
        return <Info className="w-6 h-6 text-gray-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const unreadAlerts = alerts.filter(alert => !alert.isRead);
  const readAlerts = alerts.filter(alert => alert.isRead);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Alerts & Notifications</h1>
          <h2 className="text-2xl font-semibold text-[#8FBC8B] mb-4">ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಸೂಚನೆಗಳು</h2>
          <p className="text-gray-600 text-lg">
          Stay updated with important alerts and notifications | ಪ್ರಮುಖ ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಸೂಚನೆಗಳೊಂದಿಗೆ ನವೀಕರಿಸಿರಿ
        </p>
        </div>
      </div>

      {/* Unread Alerts */}
      {unreadAlerts.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            New Alerts ({unreadAlerts.length}) | ಹೊಸ ಎಚ್ಚರಿಕೆಗಳು ({unreadAlerts.length})
          </h3>
          <div className="space-y-6">
            {unreadAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`${getAlertColor(alert.type)} border-l-4 border-l-current rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="text-xl font-bold text-gray-900">{alert.title}</h4>
                        <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">NEW</span>
                      </div>
                      <h5 className="text-lg font-semibold text-gray-700 mb-3">{alert.titleKn}</h5>
                      <p className="text-gray-700 mb-3 leading-relaxed">{alert.message}</p>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{alert.messageKn}</p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{formatTimestamp(alert.timestamp)}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{alert.district} | {alert.districtKn}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Read Alerts */}
      {readAlerts.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Previous Alerts | ಹಿಂದಿನ ಎಚ್ಚರಿಕೆಗಳು
          </h3>
          <div className="space-y-6">
            {readAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`${getAlertColor(alert.type)} border rounded-2xl p-8 opacity-75 hover:opacity-100 transition-all hover:shadow-lg`}
              >
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{alert.title}</h4>
                    <h5 className="text-lg font-semibold text-gray-700 mb-3">{alert.titleKn}</h5>
                    <p className="text-gray-700 mb-3 leading-relaxed">{alert.message}</p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{alert.messageKn}</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{formatTimestamp(alert.timestamp)}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{alert.district} | {alert.districtKn}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Note */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> These alerts are automatically generated based on weather conditions, 
          market prices, and government announcements. For emergency situations, please contact local authorities.
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <strong>ಗಮನಿಸಿ:</strong> ಈ ಎಚ್ಚರಿಕೆಗಳು ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳು, ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಮತ್ತು ಸರ್ಕಾರಿ ಘೋಷಣೆಗಳ ಆಧಾರದ ಮೇಲೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಉತ್ಪನ್ನವಾಗುತ್ತವೆ. 
          ತುರ್ತು ಪರಿಸ್ಥಿತಿಗಳಿಗಾಗಿ, ದಯವಿಟ್ಟು ಸ್ಥಳೀಯ ಅಧಿಕಾರಿಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ.
        </p>
      </div>
    </div>
  );
};

export default AlertsPage;