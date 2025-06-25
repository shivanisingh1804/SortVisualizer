import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Clock, TrendingUp, Users, Award } from 'lucide-react';

const Home = () => {
  const algorithms = [
    {
      name: 'Bubble Sort',
      path: '/bubble-sort',
      description: 'Simple comparison-based algorithm with O(n²) complexity',
      difficulty: 'Beginner',
      timeComplexity: 'O(n²)',
      color: 'from-red-400 to-red-600',
    },
    {
      name: 'Quick Sort',
      path: '/quick-sort',
      description: 'Efficient divide-and-conquer algorithm with O(n log n) average case',
      difficulty: 'Advanced',
      timeComplexity: 'O(n log n)',
      color: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Merge Sort',
      path: '/merge-sort',
      description: 'Stable divide-and-conquer algorithm with consistent O(n log n)',
      difficulty: 'Intermediate',
      timeComplexity: 'O(n log n)',
      color: 'from-green-400 to-green-600',
    },
    {
      name: 'Heap Sort',
      path: '/heap-sort',
      description: 'Binary heap-based sorting with O(n log n) complexity',
      difficulty: 'Advanced',
      timeComplexity: 'O(n log n)',
      color: 'from-purple-400 to-purple-600',
    },
    {
      name: 'Insertion Sort',
      path: '/insertion-sort',
      description: 'Simple and efficient for small datasets with O(n²) complexity',
      difficulty: 'Beginner',
      timeComplexity: 'O(n²)',
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      name: 'Selection Sort',
      path: '/selection-sort',
      description: 'Simple selection-based algorithm with O(n²) complexity',
      difficulty: 'Beginner',
      timeComplexity: 'O(n²)',
      color: 'from-pink-400 to-pink-600',
    },
  ];

  const features = [
    {
      icon: Play,
      title: 'Interactive Visualizations',
      description: 'Watch algorithms come to life with smooth, real-time animations',
    },
    {
      icon: Clock,
      title: 'Speed Controls',
      description: 'Adjust animation speed to match your learning pace',
    },
    {
      icon: TrendingUp,
      title: 'Performance Metrics',
      description: 'See time and space complexity comparisons in real-time',
    },
    {
      icon: Users,
      title: 'Educational Focus',
      description: 'Perfect for students, teachers, and programming enthusiasts',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/160107/circuit-circuit-board-resistor-computer-160107.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Visualize
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Sorting Algorithms
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Learn how computers sort data through beautiful, interactive visualizations. 
            Perfect for students, educators, and anyone curious about algorithms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/bubble-sort"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Start Visualizing</span>
            </Link>
            <Link
              to="#algorithms"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Explore Algorithms</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose SortVisualizer?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the power of visual learning with our comprehensive sorting algorithm platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-200">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithms Section */}
      <section id="algorithms" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Sorting Algorithms</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore and compare different sorting algorithms through interactive visualizations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {algorithms.map((algorithm, index) => (
              <Link
                key={index}
                to={algorithm.path}
                className="group bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-200 hover:scale-105"
              >
                <div className={`h-2 w-full bg-gradient-to-r ${algorithm.color} rounded-full mb-4`}></div>
                <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {algorithm.name}
                </h3>
                <p className="text-gray-300 mb-4">{algorithm.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      algorithm.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      algorithm.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {algorithm.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                      {algorithm.timeComplexity}
                    </span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Students Worldwide</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of learners who have mastered sorting algorithms with our platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">50,000+</h3>
              <p className="text-gray-300">Active Learners</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Play className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">1M+</h3>
              <p className="text-gray-300">Visualizations Run</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">95%</h3>
              <p className="text-gray-300">Success Rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;