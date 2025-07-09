import React, { useState, useEffect } from 'react';
import { Filter, TrendingUp, TrendingDown, Search, Loader2, AlertCircle, RefreshCw, Database, Globe } from 'lucide-react';
import { 
  fetchCropPrices, 
  fetchCropPricesFromSheet,
  getUniqueDistricts, 
  getUniqueMarkets, 
  getUniqueCommodities,
  getUniqueMandiNames,
  getUniqueCropNames,
  formatPrice,
  formatDate,
  calculatePriceChange
} from '../services/cropPricesService';

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

const CropPricesPage: React.FC = () => {
  const [dataSource, setDataSource] = useState<'api' | 'sheet'>('sheet');
  const [cropPrices, setCropPrices] = useState<CropPriceRecord[]>([]);
  const [sheetPrices, setSheetPrices] = useState<SheetCropPriceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedMarket, setSelectedMarket] = useState<string>('all');
  const [selectedMandi, setSelectedMandi] = useState<string>('all');
  
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [availableMarkets, setAvailableMarkets] = useState<string[]>([]);
  const [availableCommodities, setAvailableCommodities] = useState<string[]>([]);
  const [availableMandis, setAvailableMandis] = useState<string[]>([]);

  const loadCropPrices = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (dataSource === 'api') {
        const filters = {
          district: selectedDistrict !== 'all' ? selectedDistrict : undefined,
          market: selectedMarket !== 'all' ? selectedMarket : undefined,
          commodity: searchTerm.trim() ? searchTerm.trim() : undefined
        };
        
        const response = await fetchCropPrices(filters);
        
        if (response.records && response.records.length > 0) {
          setCropPrices(response.records);
          setAvailableDistricts(getUniqueDistricts(response.records));
          setAvailableMarkets(getUniqueMarkets(response.records));
          setAvailableCommodities(getUniqueCommodities(response.records));
        } else {
          setCropPrices([]);
          setError('No crop price data found for the selected filters.');
        }
      } else {
        const filters = {
          mandi: selectedMandi !== 'all' ? selectedMandi : undefined,
          commodity: searchTerm.trim() ? searchTerm.trim() : undefined
        };
        
        const response = await fetchCropPricesFromSheet(filters);
        
        if (response.records && response.records.length > 0) {
          setSheetPrices(response.records);
          setAvailableMandis(getUniqueMandiNames(response.records));
        } else {
          setSheetPrices([]);
          setError('No crop price data found for the selected filters.');
        }
      }
    } catch (err) {
      setError('Failed to fetch crop prices. Please try again.');
      console.error('Crop prices fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCropPrices();
  }, [dataSource, selectedDistrict, selectedMarket, selectedMandi]);

  const handleSearch = () => {
    loadCropPrices();
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getPriceChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  // Generate mock price changes for demonstration
  const getMockPriceChange = (modalPrice: number) => {
    const changes = [-2.5, -1.2, 0, 1.8, 3.4, 5.2, -0.8, 2.1];
    return changes[Math.floor(modalPrice) % changes.length];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading crop prices...</p>
          <p className="text-gray-500 text-sm">ಬೆಳೆ ಬೆಲೆಗಳನ್ನು ಲೋಡ್ ಮಾಡುತ್ತಿದೆ...</p>
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
            onClick={loadCropPrices}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center mx-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again | ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ
          </button>
        </div>
      </div>
    );
  }

  const currentData = dataSource === 'api' ? cropPrices : sheetPrices;
  const dataCount = currentData.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Live Crop & Vegetable Prices</h1>
          <h2 className="text-2xl font-semibold text-[#8FBC8B] mb-4">ನೇರ ಬೆಳೆ ಮತ್ತು ತರಕಾರಿ ಬೆಲೆಗಳು</h2>
          <p className="text-gray-600 text-lg">
          Real-time market prices | ನೈಜ ಸಮಯದ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು
        </p>
        </div>
      </div>

      {/* Data Source Selector */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Data Source:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setDataSource('sheet')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                  dataSource === 'sheet'
                    ? 'bg-[#8FBC8B] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Database className="w-4 h-4 mr-2" />
                Live Sheet
              </button>
              <button
                onClick={() => setDataSource('api')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                  dataSource === 'api'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Globe className="w-4 h-4 mr-2" />
                Government API
              </button>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            {dataSource === 'sheet' ? (
              <span className="bg-[#8FBC8B] bg-opacity-10 text-[#8FBC8B] px-3 py-1 rounded-full text-sm font-medium">
                Data Source: Live from Sheet (API fallback)
              </span>
            ) : (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Data Source: Government of India API
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Crop | ಬೆಳೆ ಹುಡುಕಿ
            </label>
            <div className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter crop name (e.g., Rice, Wheat, Tomato)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-xl focus:ring-2 focus:ring-[#8FBC8B] focus:border-transparent transition-all"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-[#8FBC8B] text-white rounded-r-xl hover:bg-[#7AA87A] transition-colors flex items-center shadow-md"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conditional Filters based on data source */}
          {dataSource === 'api' ? (
            <>
              {/* District Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District | ಜಿಲ್ಲೆ
                </label>
                <div className="flex items-center">
                  <Filter className="w-4 h-4 text-gray-600 mr-2" />
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="flex-1 px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8FBC8B] focus:border-transparent transition-all"
                  >
                    <option value="all">All Districts</option>
                    {availableDistricts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Market Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Market | ಮಾರುಕಟ್ಟೆ
                </label>
                <div className="flex items-center">
                  <Filter className="w-4 h-4 text-gray-600 mr-2" />
                  <select
                    value={selectedMarket}
                    onChange={(e) => setSelectedMarket(e.target.value)}
                    className="flex-1 px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8FBC8B] focus:border-transparent transition-all"
                  >
                    <option value="all">All Markets</option>
                    {availableMarkets.map((market) => (
                      <option key={market} value={market}>
                        {market}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Mandi Filter for Sheet data */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mandi | ಮಂಡಿ
                </label>
                <div className="flex items-center">
                  <Filter className="w-4 h-4 text-gray-600 mr-2" />
                  <select
                    value={selectedMandi}
                    onChange={(e) => setSelectedMandi(e.target.value)}
                    className="flex-1 px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8FBC8B] focus:border-transparent transition-all"
                  >
                    <option value="all">All Mandis</option>
                    {availableMandis.map((mandi) => (
                      <option key={mandi} value={mandi}>
                        {mandi}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div></div> {/* Empty div for grid alignment */}
            </>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-6 text-sm text-gray-600 font-medium">
          Showing {dataCount} results | {dataCount} ಫಲಿತಾಂಶಗಳನ್ನು ತೋರಿಸುತ್ತಿದೆ
        </div>
      </div>

      {/* Sheet Data Display */}
      {dataSource === 'sheet' && (
        <>
          {/* Price Cards - Mobile */}
          <div className="block md:hidden space-y-4">
            {sheetPrices.map((price, index) => {
              const modalPrice = formatPrice(price.modalPrice);
              const minPrice = formatPrice(price.minPrice);
              const maxPrice = formatPrice(price.maxPrice);
              const priceChange = getMockPriceChange(modalPrice);
              
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-l-[#8FBC8B] hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{price.cropName}</h3>
                      <p className="text-md text-green-700 font-medium" style={{ fontFamily: 'Noto Sans Kannada, sans-serif' }}>
                        {price.kannadaName}
                      </p>
                      <p className="text-sm text-gray-600">{price.mandiName}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-[#8FBC8B]">₹{modalPrice.toLocaleString()}</div>
                      <div className={`flex items-center text-sm ${getPriceChangeColor(priceChange)}`}>
                        {getPriceChangeIcon(priceChange)}
                        <span className="ml-1">{priceChange >= 0 ? '+' : ''}{priceChange.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Min: </span>
                      <span className="font-medium">₹{minPrice.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Max: </span>
                      <span className="font-medium">₹{maxPrice.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Date: </span>
                      <span className="font-medium">{formatDate(price.date)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Price Table - Desktop */}
          <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#8FBC8B] bg-opacity-10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Crop Name
                      <div className="text-gray-500 normal-case font-normal">ಬೆಳೆ ಹೆಸರು</div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Kannada Name
                      <div className="text-gray-500 normal-case font-normal">ಕನ್ನಡ ಹೆಸರು</div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Mandi Name
                      <div className="text-gray-500 normal-case font-normal">ಮಂಡಿ ಹೆಸರು</div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Min Price
                      <div className="text-gray-500 normal-case font-normal">ಕನಿಷ್ಠ ಬೆಲೆ</div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Max Price
                      <div className="text-gray-500 normal-case font-normal">ಗರಿಷ್ಠ ಬೆಲೆ</div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Modal Price
                      <div className="text-gray-500 normal-case font-normal">ಮೋಡಲ್ ಬೆಲೆ</div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Change
                      <div className="text-gray-500 normal-case font-normal">ಬದಲಾವಣೆ</div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                      <div className="text-gray-500 normal-case font-normal">ದಿನಾಂಕ</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sheetPrices.map((price, index) => {
                    const modalPrice = formatPrice(price.modalPrice);
                    const minPrice = formatPrice(price.minPrice);
                    const maxPrice = formatPrice(price.maxPrice);
                    const priceChange = getMockPriceChange(modalPrice);
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">{price.cropName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#8FBC8B] font-semibold" style={{ fontFamily: 'Noto Sans Kannada, sans-serif' }}>
                          {price.kannadaName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {price.mandiName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{minPrice.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{maxPrice.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#8FBC8B]">
                          ₹{modalPrice.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className={`flex items-center ${getPriceChangeColor(priceChange)}`}>
                            {getPriceChangeIcon(priceChange)}
                            <span className="ml-1">{priceChange >= 0 ? '+' : ''}{priceChange.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(price.date)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* API Data Display */}
      {dataSource === 'api' && (
        <>
          {/* Price Cards - Mobile */}
          <div className="block md:hidden space-y-4">
            {cropPrices.map((price, index) => {
              const modalPrice = formatPrice(price.modal_price);
              const minPrice = formatPrice(price.min_price);
              const maxPrice = formatPrice(price.max_price);
              const priceChange = getMockPriceChange(modalPrice);
              
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-l-[#8FBC8B] hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{price.commodity}</h3>
                      {price.variety && (
                        <p className="text-sm text-gray-600">Variety: {price.variety}</p>
                      )}
                      <p className="text-sm text-gray-500">{price.market}</p>
                      <p className="text-xs text-gray-400">{price.district}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-[#8FBC8B]">₹{modalPrice.toLocaleString()}</div>
                      <div className={`flex items-center text-sm ${getPriceChangeColor(priceChange)}`}>
                        {getPriceChangeIcon(priceChange)}
                        <span className="ml-1">{priceChange >= 0 ? '+' : ''}{priceChange.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Min: </span>
                      <span className="font-medium">₹{minPrice.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Max: </span>
                      <span className="font-medium">₹{maxPrice.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Date: </span>
                      <span className="font-medium">{formatDate(price.arrival_date)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Price Table - Desktop */}
          <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commodity
                      <div className="text-gray-400 normal-case">ಬೆಳೆ</div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Variety
                      <div className="text-gray-400 normal-case">ಪ್ರಭೇದ</div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Market
                      <div className="text-gray-400 normal-case">ಮಾರುಕಟ್ಟೆ</div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      District
                      <div className="text-gray-400 normal-case">ಜಿಲ್ಲೆ</div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Min Price
                      <div className="text-gray-400 normal-case">ಕನಿಷ್ಠ ಬೆಲೆ</div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Max Price
                      <div className="text-gray-400 normal-case">ಗರಿಷ್ಠ ಬೆಲೆ</div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Modal Price
                      <div className="text-gray-400 normal-case">ಮೋಡಲ್ ಬೆಲೆ</div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change
                      <div className="text-gray-400 normal-case">ಬದಲಾವಣೆ</div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                      <div className="text-gray-400 normal-case">ದಿನಾಂಕ</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cropPrices.map((price, index) => {
                    const modalPrice = formatPrice(price.modal_price);
                    const minPrice = formatPrice(price.min_price);
                    const maxPrice = formatPrice(price.max_price);
                    const priceChange = getMockPriceChange(modalPrice);
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{price.commodity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {price.variety || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {price.market}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {price.district}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{minPrice.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{maxPrice.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#8FBC8B]">
                          ₹{modalPrice.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className={`flex items-center ${getPriceChangeColor(priceChange)}`}>
                            {getPriceChangeIcon(priceChange)}
                            <span className="ml-1">{priceChange >= 0 ? '+' : ''}{priceChange.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(price.arrival_date)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* No Results */}
      {dataCount === 0 && !loading && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters | ನಿಮ್ಮ ಹುಡುಕಾಟ ಪದಗಳು ಅಥವಾ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಸರಿಹೊಂದಿಸಲು ಪ್ರಯತ್ನಿಸಿ
          </p>
        </div>
      )}

      {/* Footer Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <p className="text-sm text-blue-800">
          <strong>Data Source:</strong> {dataSource === 'sheet' ? 'Live Google Sheet with real-time updates' : 'Government of India Open Data Platform - Updated regularly from various mandis across Karnataka.'}
        </p>
        <p className="text-sm text-blue-700 mt-1">
          <strong>ಮಾಹಿತಿ ಮೂಲ:</strong> {dataSource === 'sheet' ? 'ನೈಜ ಸಮಯದ ನವೀಕರಣಗಳೊಂದಿಗೆ ಲೈವ್ ಗೂಗಲ್ ಶೀಟ್' : 'ಭಾರತ ಸರ್ಕಾರದ ಮುಕ್ತ ಡೇಟಾ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ - ಕರ್ನಾಟಕದ ವಿವಿಧ ಮಂಡಿಗಳಿಂದ ನಿಯಮಿತವಾಗಿ ನವೀಕರಿಸಲಾಗುತ್ತದೆ.'}
        </p>
      </div>

      {/* Refresh Button */}
      <div className="text-center">
        <button
          onClick={loadCropPrices}
          disabled={loading}
          className="px-8 py-3 bg-[#8FBC8B] text-white rounded-xl hover:bg-[#7AA87A] transition-colors flex items-center mx-auto disabled:opacity-50 font-semibold shadow-md hover:shadow-lg"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data | ಡೇಟಾ ರಿಫ್ರೆಶ್ ಮಾಡಿ
        </button>
      </div>
    </div>
  );
};

export default CropPricesPage;