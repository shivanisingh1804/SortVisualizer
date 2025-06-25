import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const algorithms = [
    { name: 'Bubble Sort', path: '/bubble-sort' },
    { name: 'Quick Sort', path: '/quick-sort' },
    { name: 'Merge Sort', path: '/merge-sort' },
    { name: 'Heap Sort', path: '/heap-sort' },
    { name: 'Insertion Sort', path: '/insertion-sort' },
    { name: 'Selection Sort', path: '/selection-sort' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SortVisualizer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                location.pathname === '/' ? 'text-blue-400' : 'text-gray-300'
              }`}
            >
              Home
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
                Algorithms
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-lg border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {algorithms.map((algo) => (
                  <Link
                    key={algo.path}
                    to={algo.path}
                    className="block px-4 py-3 text-sm text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {algo.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-blue-400 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md rounded-lg border border-gray-700 mt-4 mb-4">
            <Link
              to="/"
              className="block px-4 py-3 text-sm text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 rounded-t-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {algorithms.map((algo) => (
              <Link
                key={algo.path}
                to={algo.path}
                className="block px-4 py-3 text-sm text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {algo.name}
              </Link>
            ))}
            <Link
              to="/"
              className="block px-4 py-3 text-sm text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-b-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;