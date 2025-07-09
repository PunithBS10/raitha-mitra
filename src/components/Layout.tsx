import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Newspaper, Cloud, Bell, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Home', nameKn: 'ಮನೆ', href: '/', icon: Home },
    { name: 'Prices', nameKn: 'ಬೆಲೆಗಳು', href: '/prices', icon: TrendingUp },
    { name: 'News', nameKn: 'ಸುದ್ದಿ', href: '/news', icon: Newspaper },
    { name: 'Weather', nameKn: 'ಹವಾಮಾನ', href: '/weather', icon: Cloud },
    { name: 'Alerts', nameKn: 'ಎಚ್ಚರಿಕೆಗಳು', href: '/alerts', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Raitha Mitra
                <span className="text-sm block text-gray-600">ರೈತ ಮಿತ್ರ</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'bg-[#8FBC8B] text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'bg-[#8FBC8B] text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <span className="block">{item.name}</span>
                      <span className="text-xs text-gray-500">{item.nameKn}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Raitha Mitra | ರೈತ ಮಿತ್ರ</h3>
            <p className="text-gray-300">
              Empowering Karnataka Farmers | ಕರ್ನಾಟಕ ರೈತರನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Created by the Punith Borehalli Somashekaraiah
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;