import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const algorithms = [
    { name: 'Bubble Sort', path: '/bubble-sort' },
    { name: 'Quick Sort', path: '/quick-sort' },
    { name: 'Merge Sort', path: '/merge-sort' },
    { name: 'Heap Sort', path: '/heap-sort' },
    { name: 'Insertion Sort', path: '/insertion-sort' },
    { name: 'Selection Sort', path: '/selection-sort' },
  ];

  return (
    <footer className="bg-gray-900/50 backdrop-blur-md border-t border-gray-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SortVisualizer
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Learn and visualize sorting algorithms through interactive animations. 
              Perfect for students, educators, and anyone curious about how computers sort data.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a> */}
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a> */}
            </div>
          </div>

          {/* Algorithms */}
          <div>
            <h3 className="text-white font-semibold mb-4">Algorithms</h3>
            <ul className="space-y-2">
              {algorithms.map((algo) => (
                <li key={algo.path}>
                  <Link
                    to={algo.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {algo.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Algorithm Guide
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Time Complexity
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Space Complexity
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 SortVisualizer. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;