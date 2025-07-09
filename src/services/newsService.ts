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

const API_KEY = '29e765a8cea64d0e8206f773f7b890f0';
const BASE_URL = 'https://newsapi.org/v2/everything';

export const fetchKarnatakaAgricultureNews = async (): Promise<NewsResponse> => {
  try {
    const params = new URLSearchParams({
      q: 'karnataka agriculture',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: '20',
      apiKey: API_KEY
    });

    const response = await fetch(`${BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
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