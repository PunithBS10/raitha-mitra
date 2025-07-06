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
      <header className="bg-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">
                Raitha Mitra
                <span className="text-sm block text-green-100">ರೈತ ಮಿತ್ರ</span>
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
                        ? 'bg-green-700 text-white'
                        : 'text-green-100 hover:bg-green-500 hover:text-white'
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
                className="inline-flex items-center justify-center p-2 rounded-md text-green-100 hover:text-white hover:bg-green-500"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-700">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'bg-green-800 text-white'
                        : 'text-green-100 hover:bg-green-600 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <span className="block">{item.name}</span>
                      <span className="text-xs text-green-200">{item.nameKn}</span>
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
      <footer className="bg-green-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Raitha Mitra | ರೈತ ಮಿತ್ರ</h3>
            <p className="text-green-200">
              Empowering Karnataka Farmers | ಕರ್ನಾಟಕ ರೈತರನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;