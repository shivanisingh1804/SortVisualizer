import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Settings, Clock, BarChart3, Target } from 'lucide-react';

const SelectionSort = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentMin, setCurrentMin] = useState<number>(-1);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [speed, setSpeed] = useState(150);
  const [arraySize, setArraySize] = useState(15);
  const [steps, setSteps] = useState<any[]>([]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 300) + 10);
    setArray(newArray);
    setCurrentStep(0);
    setCurrentMin(-1);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setIsPlaying(false);
    setComparisons(0);
    setSwaps(0);
    generateSteps(newArray);
  }, [arraySize]);

  const generateSteps = (arr: number[]) => {
    const steps: any[] = [];
    const tempArray = [...arr];
    let totalComparisons = 0;
    let totalSwaps = 0;

    for (let i = 0; i < tempArray.length - 1; i++) {
      let minIndex = i;
      
      steps.push({
        type: 'start_pass',
        currentMin: i,
        array: [...tempArray],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        comparisons: totalComparisons,
        swaps: totalSwaps,
      });

      for (let j = i + 1; j < tempArray.length; j++) {
        totalComparisons++;
        
        steps.push({
          type: 'compare',
          comparing: [minIndex, j],
          currentMin: minIndex,
          array: [...tempArray],
          sorted: Array.from({ length: i }, (_, idx) => idx),
          comparisons: totalComparisons,
          swaps: totalSwaps,
        });

        if (tempArray[j] < tempArray[minIndex]) {
          minIndex = j;
          steps.push({
            type: 'new_min',
            currentMin: minIndex,
            array: [...tempArray],
            sorted: Array.from({ length: i }, (_, idx) => idx),
            comparisons: totalComparisons,
            swaps: totalSwaps,
          });
        }
      }

      if (minIndex !== i) {
        totalSwaps++;
        [tempArray[i], tempArray[minIndex]] = [tempArray[minIndex], tempArray[i]];
        
        steps.push({
          type: 'swap',
          swapping: [i, minIndex],
          array: [...tempArray],
          sorted: Array.from({ length: i }, (_, idx) => idx),
          comparisons: totalComparisons,
          swaps: totalSwaps,
        });
      }

      steps.push({
        type: 'sorted',
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
        array: [...tempArray],
        comparisons: totalComparisons,
        swaps: totalSwaps,
      });
    }

    steps.push({
      type: 'complete',
      array: [...tempArray],
      sorted: Array.from({ length: tempArray.length }, (_, idx) => idx),
      comparisons: totalComparisons,
      swaps: totalSwaps,
    });

    setSteps(steps);
  };

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length) return;

    const timer = setTimeout(() => {
      const step = steps[currentStep];
      setArray(step.array);
      setComparisons(step.comparisons);
      setSwaps(step.swaps);
      setSorted(step.sorted || []);

      if (step.type === 'start_pass') {
        setCurrentMin(step.currentMin);
        setComparing([]);
        setSwapping([]);
      } else if (step.type === 'compare') {
        setComparing(step.comparing);
        setCurrentMin(step.currentMin);
        setSwapping([]);
      } else if (step.type === 'new_min') {
        setCurrentMin(step.currentMin);
        setComparing([]);
        setSwapping([]);
      } else if (step.type === 'swap') {
        setSwapping(step.swapping);
        setCurrentMin(-1);
        setComparing([]);
      } else if (step.type === 'sorted') {
        setCurrentMin(-1);
        setComparing([]);
        setSwapping([]);
      } else if (step.type === 'complete') {
        setCurrentMin(-1);
        setComparing([]);
        setSwapping([]);
      }

      setCurrentStep(prev => prev + 1);
    }, 1100 - speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps, speed]);

  const togglePlay = () => {
    if (currentStep >= steps.length) {
      generateArray();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const reset = () => {
    generateArray();
  };

  const getBarColor = (index: number) => {
    if (sorted.includes(index)) return 'bg-green-500';
    if (swapping.includes(index)) return 'bg-red-500';
    if (comparing.includes(index)) return 'bg-yellow-500';
    if (index === currentMin) return 'bg-purple-500';
    return 'bg-blue-500';
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Selection Sort Visualizer
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch how Selection Sort finds the minimum element in each pass and places it 
            at the beginning. Simple algorithm with O(n²) time complexity.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              <button
                onClick={reset}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4 text-gray-400" />
                <label className="text-sm text-gray-300">Speed:</label>
                <input
                  type="range"
                  min="1"
                  max="1000"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-24"
                />
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-gray-400" />
                <label className="text-sm text-gray-300">Size:</label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={arraySize}
                  onChange={(e) => setArraySize(Number(e.target.value))}
                  className="w-24"
                  disabled={isPlaying}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Comparisons</p>
                <p className="text-2xl font-bold text-white">{comparisons}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="bg-red-500 p-2 rounded-lg">
                <RotateCcw className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Swaps</p>
                <p className="text-2xl font-bold text-white">{swaps}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Progress</p>
                <p className="text-2xl font-bold text-white">{Math.round((currentStep / steps.length) * 100) || 0}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
          <div className="flex items-end justify-center space-x-1 h-80">
            {array.map((value, index) => (
              <div
                key={index}
                className={`${getBarColor(index)} transition-all duration-300 rounded-t-lg min-w-[4px] flex items-end justify-center relative`}
                style={{
                  height: `${(value / 310) * 100}%`,
                  width: `${Math.max(20, 400 / array.length)}px`,
                }}
              >
                {index === currentMin && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <Target className="h-4 w-4 text-purple-400" />
                  </div>
                )}
                <span className="text-xs text-white mb-1 font-semibold">
                  {array.length <= 20 ? value : ''}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-300">Unsorted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-gray-300">Current Min</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-gray-300">Comparing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-300">Swapping</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-300">Sorted</span>
            </div>
          </div>
        </div>

        {/* Algorithm Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">How Selection Sort Works</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                1. Find the minimum element in the unsorted portion of the array
              </p>
              <p>
                2. Swap it with the first element of the unsorted portion
              </p>
              <p>
                3. Move the boundary between sorted and unsorted portions
              </p>
              <p>
                4. Repeat until the entire array is sorted
              </p>
              <p>
                5. Each pass places one element in its final position
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Complexity Analysis</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Time Complexity</p>
                <p className="text-lg text-white font-semibold">O(n²) - All Cases</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Space Complexity</p>
                <p className="text-lg text-white font-semibold">O(1) - Constant</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Stability</p>
                <p className="text-lg text-white font-semibold">Unstable</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionSort;