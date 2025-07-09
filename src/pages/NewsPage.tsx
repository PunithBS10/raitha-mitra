import React from 'react';
import { ExternalLink, Calendar, Tag } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  titleKn: string;
  summary: string;
  summaryKn: string;
  date: string;
  category: string;
  categoryKn: string;
  readMoreUrl: string;
  isScheme: boolean;
}

const NewsPage: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'New Subsidy Scheme for Organic Farming',
      titleKn: 'ಸಾವಯವ ಕೃಷಿಗಾಗಿ ಹೊಸ ಸಬ್ಸಿಡಿ ಯೋಜನೆ',
      summary: 'Karnataka government announces 50% subsidy for farmers switching to organic farming methods.',
      summaryKn: 'ಸಾವಯವ ಕೃಷಿ ವಿಧಾನಗಳಿಗೆ ಬದಲಾಯಿಸುವ ರೈತರಿಗೆ ಕರ್ನಾಟಕ ಸರ್ಕಾರ 50% ಸಬ್ಸಿಡಿ ಘೋಷಿಸಿದೆ.',
      date: '2024-01-15',
      category: 'Government Scheme',
      categoryKn: 'ಸರ್ಕಾರಿ ಯೋಜನೆ',
      readMoreUrl: '#',
      isScheme: true,
    },
    {
      id: 2,
      title: 'Monsoon Forecast: Normal Rainfall Expected',
      titleKn: 'ಮುಂಗಾರು ಮುನ್ಸೂಚನೆ: ಸಾಮಾನ್ಯ ಮಳೆ ನಿರೀಕ್ಷೆ',
      summary: 'IMD predicts normal to above-normal rainfall for Karnataka during the upcoming monsoon season.',
      summaryKn: 'ಮುಂಬರುವ ಮಾನ್ಸೂನ್ ಋತುವಿನಲ್ಲಿ ಕರ್ನಾಟಕಕ್ಕೆ ಸಾಮಾನ್ಯದಿಂದ ಸಾಮಾನ್ಯಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಮಳೆ ಇರುತ್ತದೆ ಎಂದು IMD ಭವಿಷ್ಯವಾಣಿ ಮಾಡಿದೆ.',
      date: '2024-01-14',
      category: 'Weather',
      categoryKn: 'ಹವಾಮಾನ',
      readMoreUrl: '#',
      isScheme: false,
    },
    {
      id: 3,
      title: 'PM-KISAN Scheme: Next Installment Release',
      titleKn: 'ಪಿಎಂ-ಕಿಸಾನ್ ಯೋಜನೆ: ಮುಂದಿನ ಕಂತು ಬಿಡುಗಡೆ',
      summary: 'The next installment of PM-KISAN scheme will be released on 25th January 2024.',
      summaryKn: 'ಪಿಎಂ-ಕಿಸಾನ್ ಯೋಜನೆಯ ಮುಂದಿನ ಕಂತನ್ನು 25 ಜನವರಿ 2024 ರಂದು ಬಿಡುಗಡೆ ಮಾಡಲಾಗುವುದು.',
      date: '2024-01-13',
      category: 'Government Scheme',
      categoryKn: 'ಸರ್ಕಾರಿ ಯೋಜನೆ',
      readMoreUrl: '#',
      isScheme: true,
    },
    {
      id: 4,
      title: 'New Agricultural Equipment Subsidy',
      titleKn: 'ಹೊಸ ಕೃಷಿ ಉಪಕರಣ ಸಬ್ಸಿಡಿ',
      summary: 'State government announces subsidies for modern agricultural equipment and machinery.',
      summaryKn: 'ಆಧುನಿಕ ಕೃಷಿ ಉಪಕರಣಗಳು ಮತ್ತು ಯಂತ್ರೋಪಕರಣಗಳಿಗೆ ರಾಜ್ಯ ಸರ್ಕಾರ ಸಬ್ಸಿಡಿ ಘೋಷಿಸಿದೆ.',
      date: '2024-01-12',
      category: 'Government Scheme',
      categoryKn: 'ಸರ್ಕಾರಿ ಯೋಜನೆ',
      readMoreUrl: '#',
      isScheme: true,
    },
    {
      id: 5,
      title: 'Crop Insurance Claim Process Simplified',
      titleKn: 'ಬೆಳೆ ವಿಮೆ ಹಕ್ಕು ಪ್ರಕ್ರಿಯೆ ಸರಳೀಕರಿಸಲಾಗಿದೆ',
      summary: 'New digital platform launched to simplify crop insurance claim procedures for farmers.',
      summaryKn: 'ರೈತರಿಗೆ ಬೆಳೆ ವಿಮೆ ಹಕ್ಕು ಪ್ರಕ್ರಿಯೆಗಳನ್ನು ಸರಳಗೊಳಿಸಲು ಹೊಸ ಡಿಜಿಟಲ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಆರಂಭಿಸಲಾಗಿದೆ.',
      date: '2024-01-11',
      category: 'Insurance',
      categoryKn: 'ವಿಮೆ',
      readMoreUrl: '#',
      isScheme: false,
    },
    {
      id: 6,
      title: 'Karnataka Farmers Training Program',
      titleKn: 'ಕರ್ನಾಟಕ ರೈತರ ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮ',
      summary: 'Free training program on modern farming techniques starts next month.',
      summaryKn: 'ಆಧುನಿಕ ಕೃಷಿ ತಂತ್ರಗಳ ಬಗ್ಗೆ ಉಚಿತ ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮ ಮುಂದಿನ ತಿಂಗಳು ಪ್ರಾರಂಭವಾಗುತ್ತದೆ.',
      date: '2024-01-10',
      category: 'Training',
      categoryKn: 'ತರಬೇತಿ',
      readMoreUrl: '#',
      isScheme: true,
    },
  ];

  const schemes = newsItems.filter(item => item.isScheme);
  const news = newsItems.filter(item => !item.isScheme);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Government News & Schemes</h1>
          <h2 className="text-2xl font-semibold text-[#8FBC8B]">ಸರ್ಕಾರಿ ಸುದ್ದಿ ಮತ್ತು ಯೋಜನೆಗಳು</h2>
        </div>
      </div>

      {/* Government Schemes Section */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Government Schemes | ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="bg-[#8FBC8B] bg-opacity-10 border border-[#8FBC8B] border-opacity-30 rounded-2xl p-8 hover:shadow-lg transition-all hover:border-[#8FBC8B]">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#8FBC8B] text-white">
                  <Tag className="w-3 h-3 mr-1" />
                  {scheme.category}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {scheme.date}
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 mb-2">{scheme.title}</h4>
              <h5 className="text-lg font-semibold text-[#8FBC8B] mb-4">{scheme.titleKn}</h5>
              
              <p className="text-gray-700 mb-3 leading-relaxed">{scheme.summary}</p>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">{scheme.summaryKn}</p>
              
              <a
                href={scheme.readMoreUrl}
                className="inline-flex items-center text-[#8FBC8B] hover:text-[#7AA87A] font-semibold transition-colors"
              >
                Read More | ಹೆಚ್ಚು ಓದಿ
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Latest News Section */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Latest News | ಇತ್ತೀಚಿನ ಸುದ್ದಿ
        </h3>
        <div className="space-y-6">
          {news.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all hover:border-gray-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white w-fit">
                  <Tag className="w-3 h-3 mr-1" />
                  {item.category} | {item.categoryKn}
                </span>
                <div className="flex items-center text-sm text-gray-500 mt-2 md:mt-0">
                  <Calendar className="w-4 h-4 mr-1" />
                  {item.date}
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
              <h5 className="text-lg font-semibold text-blue-600 mb-4">{item.titleKn}</h5>
              
              <p className="text-gray-700 mb-3 leading-relaxed">{item.summary}</p>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">{item.summaryKn}</p>
              
              <a
                href={item.readMoreUrl}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Read More | ಹೆಚ್ಚು ಓದಿ
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> For official verification of any scheme or news, please visit the official government websites or contact your local agricultural officer.
        </p>
        <p className="text-sm text-yellow-700 mt-1">
          <strong>ಗಮನಿಸಿ:</strong> ಯಾವುದೇ ಯೋಜನೆ ಅಥವಾ ಸುದ್ದಿಯ ಅಧಿಕೃತ ಪರಿಶೀಲನೆಗಾಗಿ, ದಯವಿಟ್ಟು ಅಧಿಕೃತ ಸರ್ಕಾರಿ ವೆಬ್‌ಸೈಟ್‌ಗಳನ್ನು ಭೇಟಿ ಮಾಡಿ ಅಥವಾ ನಿಮ್ಮ ಸ್ಥಳೀಯ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.
        </p>
      </div>
    </div>
  );
};

export default NewsPage;