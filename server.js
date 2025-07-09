import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// News API endpoint
app.get('/api/news', async (req, res) => {
  const NEWS_API_KEY = '29e765a8cea64d0e8206f773f7b890f0';
  const NEWS_API_URL = 'https://newsapi.org/v2/everything';

  try {
    console.log('Fetching news from NewsAPI...');
    
    const params = new URLSearchParams({
      q: 'karnataka agriculture',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: '6',
      apiKey: NEWS_API_KEY
    });

    const response = await fetch(`${NEWS_API_URL}?${params}`, {
      headers: {
        'User-Agent': 'RaithaMitra/1.0'
      }
    });

    if (!response.ok) {
      console.error(`NewsAPI error: ${response.status} ${response.statusText}`);
      throw new Error(`NewsAPI error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`NewsAPI returned ${data.articles?.length || 0} articles`);

    // Filter and process articles
    const processedArticles = (data.articles || [])
      .filter(article => 
        article.title && 
        article.description && 
        article.url &&
        !article.title.includes('[Removed]') &&
        !article.description.includes('[Removed]')
      )
      .map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: article.publishedAt,
        urlToImage: article.urlToImage || null,
        source: {
          name: article.source?.name || 'Unknown Source'
        }
      }));

    console.log(`Returning ${processedArticles.length} processed articles`);

    res.json({
      status: 'ok',
      totalResults: processedArticles.length,
      articles: processedArticles
    });

  } catch (error) {
    console.error('News API error:', error.message);
    
    // Return fallback mock data when API fails
    const mockData = {
      status: 'ok',
      totalResults: 6,
      articles: [
        {
          title: "Karnataka Government Announces New Agricultural Subsidies for Farmers",
          description: "The Karnataka state government has announced a comprehensive package of agricultural subsidies aimed at supporting farmers during the upcoming monsoon season. The package includes seed subsidies, fertilizer support, and irrigation assistance.",
          url: "https://example.com/karnataka-agriculture-subsidies",
          urlToImage: "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          source: { name: "Karnataka Agriculture Today" }
        },
        {
          title: "Record Monsoon Expected to Boost Karnataka's Agricultural Output",
          description: "Meteorological experts predict a record monsoon season for Karnataka, which is expected to significantly boost agricultural productivity across the state. Farmers are preparing for increased cultivation activities.",
          url: "https://example.com/karnataka-monsoon-agriculture",
          urlToImage: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          source: { name: "Weather & Agriculture News" }
        },
        {
          title: "Digital Agriculture Initiative Launched in Rural Karnataka",
          description: "A new digital agriculture initiative has been launched to help farmers in rural Karnataka access modern farming techniques, weather forecasts, and market prices through mobile applications.",
          url: "https://example.com/digital-agriculture-karnataka",
          urlToImage: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          source: { name: "Tech Agriculture Weekly" }
        },
        {
          title: "Karnataka Farmers Adopt Sustainable Farming Practices",
          description: "Farmers across Karnataka are increasingly adopting sustainable and organic farming practices, leading to improved soil health and better crop yields while reducing environmental impact.",
          url: "https://example.com/sustainable-farming-karnataka",
          urlToImage: "https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          source: { name: "Sustainable Agriculture Journal" }
        },
        {
          title: "New Irrigation Projects to Benefit Karnataka Farmers",
          description: "The state government has approved several new irrigation projects that will provide water access to thousands of acres of farmland across Karnataka, particularly in drought-prone regions.",
          url: "https://example.com/irrigation-projects-karnataka",
          urlToImage: "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
          source: { name: "Karnataka Infrastructure News" }
        },
        {
          title: "Coffee Production in Karnataka Reaches New Heights",
          description: "Karnataka's coffee production has reached record levels this year, with improved cultivation techniques and favorable weather conditions contributing to the bumper harvest.",
          url: "https://example.com/coffee-production-karnataka",
          urlToImage: "https://images.pexels.com/photos/4021521/pexels-photo-4021521.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          source: { name: "Coffee Industry Today" }
        }
      ]
    };

    console.log('Returning fallback mock data');
    res.json(mockData);
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📰 News API available at http://localhost:${PORT}/api/news`);
});