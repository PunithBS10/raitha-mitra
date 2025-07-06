interface CropPriceResponse {
  records: CropPriceRecord[];
  total: number;
  count: number;
}

interface CropPriceRecord {
  commodity: string;
  variety: string;
  market: string;
  district: string;
  min_price: string;
  max_price: string;
  modal_price: string;
  arrival_date: string;
  state: string;
}

interface SheetCropPriceRecord {
  cropName: string;
  kannadaName: string;
  mandiName: string;
  modalPrice: string;
  minPrice: string;
  maxPrice: string;
  date: string;
}

const API_KEY = '579b464db66ec23bdd000001800a40d7cbcc4ce94d298c7c64458d88';
const BASE_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a3d0070';

// Google Sheet CSV URL (replace with your sheet's CSV export URL)
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1YK31PnuEpoeWJHL06-3fdHhpH5jd3enxEdXDGzoSFIY/export?format=csv';

export const fetchCropPrices = async (filters?: {
  district?: string;
  market?: string;
  commodity?: string;
}): Promise<CropPriceResponse> => {
  try {
    let url = `${BASE_URL}?api-key=${API_KEY}&format=json&limit=100&filters[state]=Karnataka`;
    
    if (filters?.district && filters.district !== 'all') {
      url += `&filters[district]=${encodeURIComponent(filters.district)}`;
    }
    
    if (filters?.market && filters.market !== 'all') {
      url += `&filters[market]=${encodeURIComponent(filters.market)}`;
    }
    
    if (filters?.commodity) {
      url += `&filters[commodity]=${encodeURIComponent(filters.commodity)}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching crop prices:', error);
    throw error;
  }
};

export const fetchCropPricesFromSheet = async (filters?: {
  mandi?: string;
  commodity?: string;
}): Promise<{ records: SheetCropPriceRecord[]; total: number; count: number }> => {
  try {
    const response = await fetch(SHEET_CSV_URL);
    
    if (!response.ok) {
      throw new Error(`Sheet fetch error: ${response.status}`);
    }
    
    const csvText = await response.text();
    const records = parseCSVToRecords(csvText);
    
    // Apply filters
    let filteredRecords = records;
    
    if (filters?.mandi && filters.mandi !== 'all') {
      filteredRecords = filteredRecords.filter(record => 
        record.mandiName.toLowerCase().includes(filters.mandi!.toLowerCase())
      );
    }
    
    if (filters?.commodity) {
      filteredRecords = filteredRecords.filter(record => 
        record.cropName.toLowerCase().includes(filters.commodity!.toLowerCase()) ||
        record.kannadaName.toLowerCase().includes(filters.commodity!.toLowerCase())
      );
    }
    
    return {
      records: filteredRecords,
      total: filteredRecords.length,
      count: filteredRecords.length
    };
  } catch (error) {
    console.error('Error fetching crop prices from sheet:', error);
    throw error;
  }
};

const parseCSVToRecords = (csvText: string): SheetCropPriceRecord[] => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  
  const records: SheetCropPriceRecord[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values = parseCSVLine(line);
    if (values.length >= 7) {
      records.push({
        cropName: values[0] || '',
        kannadaName: values[1] || '',
        mandiName: values[2] || '',
        modalPrice: values[3] || '',
        minPrice: values[4] || '',
        maxPrice: values[5] || '',
        date: values[6] || ''
      });
    }
  }
  
  return records;
};

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result.map(val => val.replace(/"/g, ''));
};

export const getUniqueDistricts = (records: CropPriceRecord[]): string[] => {
  const districts = records.map(record => record.district).filter(Boolean);
  return [...new Set(districts)].sort();
};

export const getUniqueMarkets = (records: CropPriceRecord[]): string[] => {
  const markets = records.map(record => record.market).filter(Boolean);
  return [...new Set(markets)].sort();
};

export const getUniqueCommodities = (records: CropPriceRecord[]): string[] => {
  const commodities = records.map(record => record.commodity).filter(Boolean);
  return [...new Set(commodities)].sort();
};

export const getUniqueMandiNames = (records: SheetCropPriceRecord[]): string[] => {
  const mandis = records.map(record => record.mandiName).filter(Boolean);
  return [...new Set(mandis)].sort();
};

export const getUniqueCropNames = (records: SheetCropPriceRecord[]): string[] => {
  const crops = records.map(record => record.cropName).filter(Boolean);
  return [...new Set(crops)].sort();
};

export const calculatePriceChange = (currentPrice: number, previousPrice?: number): number => {
  if (!previousPrice) return 0;
  return ((currentPrice - previousPrice) / previousPrice) * 100;
};

export const formatPrice = (price: string | number): number => {
  if (typeof price === 'string') {
    return parseFloat(price.replace(/[^\d.-]/g, '')) || 0;
  }
  return price || 0;
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};