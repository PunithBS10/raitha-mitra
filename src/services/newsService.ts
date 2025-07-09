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

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

// Use internal API route instead of direct NewsAPI calls
const INTERNAL_API_URL = '/api/news';

// Mock data for fallback when API fails
const mockNewsData: NewsResponse = {
  status: 'ok',
  totalResults: 8,
  articles: [
    {
      title: "Karnataka Government Announces New Agricultural Subsidies for Farmers",
      description: "The Karnataka state government has announced a comprehensive package of agricultural subsidies aimed at supporting farmers during the upcoming monsoon season. The package includes seed subsidies, fertilizer support, and irrigation assistance.",
      url: "https://example.com/karnataka-agriculture-subsidies",
      urlToImage: "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      source: {
        name: "Karnataka Agriculture Today"
      }
    },
    {
      title: "Record Monsoon Expected to Boost Karnataka's Agricultural Output",
      description: "Meteorological experts predict a record monsoon season for Karnataka, which is expected to significantly boost agricultural productivity across the state. Farmers are preparing for increased cultivation activities.",
      url: "https://example.com/karnataka-monsoon-agriculture",
      urlToImage: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      source: {
        name: "Weather & Agriculture News"
      }
    },
    {
      title: "Digital Agriculture Initiative Launched in Rural Karnataka",
      description: "A new digital agriculture initiative has been launched to help farmers in rural Karnataka access modern farming techniques, weather forecasts, and market prices through mobile applications.",
      url: "https://example.com/digital-agriculture-karnataka",
      urlToImage: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      source: {
        name: "Tech Agriculture Weekly"
      }
    },
    {
      title: "Karnataka Farmers Adopt Sustainable Farming Practices",
      description: "Farmers across Karnataka are increasingly adopting sustainable and organic farming practices, leading to improved soil health and better crop yields while reducing environmental impact.",
      url: "https://example.com/sustainable-farming-karnataka",
      urlToImage: "https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      source: {
        name: "Sustainable Agriculture Journal"
      }
    },
    {
      title: "New Irrigation Projects to Benefit Karnataka Farmers",
      description: "The state government has approved several new irrigation projects that will provide water access to thousands of acres of farmland across Karnataka, particularly in drought-prone regions.",
      url: "https://example.com/irrigation-projects-karnataka",
      urlToImage: "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
      source: {
        name: "Karnataka Infrastructure News"
      }
    },
    {
      title: "Coffee Production in Karnataka Reaches New Heights",
      description: "Karnataka's coffee production has reached record levels this year, with improved cultivation techniques and favorable weather conditions contributing to the bumper harvest.",
      url: "https://example.com/coffee-production-karnataka",
      urlToImage: "https://images.pexels.com/photos/4021521/pexels-photo-4021521.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      source: {
        name: "Coffee Industry Today"
      }
    },
    {
      title: "Agricultural Research Centers in Karnataka Develop New Crop Varieties",
      description: "Research centers across Karnataka have successfully developed new high-yield, disease-resistant crop varieties that are expected to revolutionize farming in the region.",
      url: "https://example.com/crop-research-karnataka",
      urlToImage: "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(), // 30 hours ago
      source: {
        name: "Agricultural Research Quarterly"
      }
    },
    {
      title: "Karnataka Agricultural Market Prices Show Positive Trends",
      description: "Agricultural commodity prices in Karnataka markets have shown positive trends over the past month, providing better returns for farmers and encouraging increased production.",
      url: "https://example.com/market-prices-karnataka",
      urlToImage: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 36 hours ago
      source: {
        name: "Market Analysis Weekly"
      }
    }
  ]
};

export const fetchKarnatakaAgricultureNews = async (): Promise<NewsResponse> => {
  try {
    // Call our internal API route instead of NewsAPI directly
    const response = await fetch(INTERNAL_API_URL);
    
    if (!response.ok) {
      console.warn(`Internal API returned status ${response.status}. Using fallback mock data.`);
      // Return mock data when API fails
      return mockNewsData;
    }
    
    const data = await response.json();
    
    // If API returns no articles or invalid data, use mock data
    if (!data.articles || data.articles.length === 0) {
      console.warn('Internal API returned no articles. Using fallback mock data.');
      return mockNewsData;
    }
    
    return data;
  } catch (error) {
    console.warn('Error fetching news from internal API, using fallback mock data:', error);
    // Return mock data when there's a network error or other issues
    return mockNewsData;
  }
};

export const formatNewsDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateString;
  }
};

export const getTimeAgo = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  } catch {
    return 'Recently';
  }
};