import React, { useState, useEffect } from 'react';
import { ExternalLink, Calendar, Tag, Loader2, AlertCircle, RefreshCw, Newspaper, Globe } from 'lucide-react';
import { fetchKarnatakaAgricultureNews, formatNewsDate, getTimeAgo } from '../services/newsService';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchKarnatakaAgricultureNews();
      
      if (response.articles && response.articles.length > 0) {
        // Filter out articles with missing essential data
        const validArticles = response.articles.filter(article => 
          article.title && 
          article.description && 
          article.url &&
          !article.title.includes('[Removed]') &&
          !article.description.includes('[Removed]')
        );
        setArticles(validArticles);
      } else {
        setArticles([]);
      }
    } catch (err) {
      // Error handling is now done in the service layer with fallback data
      console.warn('News fetch warning:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const getSourceColor = (sourceName: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-red-500',
      'bg-indigo-500',
      'bg-yellow-500',
      'bg-pink-500'
    ];
    const index = sourceName.length % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#8FBC8B] mx-auto mb-4" />
          <p className="text-gray-600">Loading latest agriculture news...</p>
          <p className="text-gray-500 text-sm">ಇತ್ತೀಚಿನ ಕೃಷಿ ಸುದ್ದಿಗಳನ್ನು ಲೋಡ್ ಮಾಡುತ್ತಿದೆ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadNews}
            className="px-6 py-3 bg-[#8FBC8B] text-white rounded-xl hover:bg-[#7AA87A] transition-colors flex items-center mx-auto font-semibold shadow-md"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again | ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Karnataka Agriculture News</h1>
          <h2 className="text-2xl font-semibold text-[#8FBC8B] mb-4">ಕರ್ನಾಟಕ ಕೃಷಿ ಸುದ್ದಿ</h2>
          <p className="text-gray-600 text-lg">
            Latest agriculture news and updates from Karnataka | ಕರ್ನಾಟಕದಿಂದ ಇತ್ತೀಚಿನ ಕೃಷಿ ಸುದ್ದಿ ಮತ್ತು ನವೀಕರಣಗಳು
          </p>
        </div>
      </div>

      {/* News Source Info */}
      <div className="bg-[#8FBC8B] bg-opacity-10 border border-[#8FBC8B] border-opacity-30 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Globe className="w-5 h-5 text-[#8FBC8B] mr-2" />
            <span className="text-[#8FBC8B] font-semibold">
              Live News Feed | ನೇರ ಸುದ್ದಿ ಫೀಡ್
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {articles.length} articles found | {articles.length} ಲೇಖನಗಳು ಕಂಡುಬಂದಿವೆ
          </div>
        </div>
      </div>

      {/* Featured Article */}
      {articles.length > 0 && (
        <div className="bg-gradient-to-br from-[#8FBC8B] to-[#7AA87A] text-white rounded-2xl p-8 shadow-xl">
          <div className="flex items-center mb-4">
            <Newspaper className="w-6 h-6 mr-2" />
            <span className="text-lg font-semibold">Featured Story | ವಿಶೇಷ ಸುದ್ದಿ</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4 leading-tight">{articles[0].title}</h3>
              <p className="text-white text-opacity-90 mb-6 leading-relaxed text-lg">
                {articles[0].description}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full font-medium">
                    {articles[0].source.name}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {getTimeAgo(articles[0].publishedAt)}
                  </span>
                </div>
                
                <a
                  href={articles[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white text-[#8FBC8B] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-md"
                >
                  Read Full Article
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
            
            {articles[0].urlToImage && (
              <div className="lg:col-span-1">
                <img
                  src={articles[0].urlToImage}
                  alt={articles[0].title}
                  className="w-full h-48 lg:h-full object-cover rounded-xl shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.slice(1).map((article, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#8FBC8B] hover:scale-105">
            {article.urlToImage && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.parentElement!.style.display = 'none';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className={`${getSourceColor(article.source.name)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md`}>
                    {article.source.name}
                  </span>
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                {!article.urlToImage && (
                  <span className={`${getSourceColor(article.source.name)} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                    {article.source.name}
                  </span>
                )}
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {getTimeAgo(article.publishedAt)}
                </div>
              </div>
              
              <h4 className="text-lg font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
                {article.title}
              </h4>
              
              <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
                {article.description}
              </p>
              
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#8FBC8B] hover:text-[#7AA87A] font-semibold transition-colors group"
              >
                Read More
                <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {articles.length === 0 && !loading && (
        <div className="text-center py-12">
          <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No news articles found</h3>
          <p className="text-gray-600">
            No agriculture news found for Karnataka at the moment | ಸದ್ಯಕ್ಕೆ ಕರ್ನಾಟಕಕ್ಕೆ ಯಾವುದೇ ಕೃಷಿ ಸುದ್ದಿ ಸಿಗಲಿಲ್ಲ
          </p>
        </div>
      )}

      {/* Refresh Button */}
      <div className="text-center">
        <button
          onClick={loadNews}
          disabled={loading}
          className="px-8 py-3 bg-[#8FBC8B] text-white rounded-xl hover:bg-[#7AA87A] transition-colors flex items-center mx-auto disabled:opacity-50 font-semibold shadow-md hover:shadow-lg"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh News | ಸುದ್ದಿ ರಿಫ್ರೆಶ್ ಮಾಡಿ
        </button>
      </div>

      {/* Footer Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <p className="text-sm text-blue-800">
          <strong>Data Source:</strong> News articles are fetched from NewsAPI.org in real-time, focusing on Karnataka agriculture news.
        </p>
        <p className="text-sm text-blue-700 mt-1">
          <strong>ಮಾಹಿತಿ ಮೂಲ:</strong> ಸುದ್ದಿ ಲೇಖನಗಳನ್ನು NewsAPI.org ನಿಂದ ನೈಜ ಸಮಯದಲ್ಲಿ ಪಡೆಯಲಾಗುತ್ತದೆ, ಕರ್ನಾಟಕ ಕೃಷಿ ಸುದ್ದಿಗಳ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸಿ.
        </p>
      </div>

      {/* Additional CSS for line-clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default NewsPage;