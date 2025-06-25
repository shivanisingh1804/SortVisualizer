import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Settings, Clock, BarChart3, Triangle } from 'lucide-react';

const HeapSort = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [heapifying, setHeapifying] = useState<number[]>([]);
  const [extracting, setExtracting] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [speed, setSpeed] = useState(200);
  const [arraySize, setArraySize] = useState(15);
  const [steps, setSteps] = useState<any[]>([]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 300) + 10);
    setArray(newArray);
    setCurrentStep(0);
    setHeapifying([]);
    setExtracting([]);
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

    const heapify = (array: number[], n: number, i: number) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      steps.push({
        type: 'heapify_start',
        indices: [i],
        array: [...array],
        comparisons: totalComparisons,
        swaps: totalSwaps,
      });

      if (left < n) {
        totalComparisons++;
        steps.push({
          type: 'compare',
          indices: [left, largest],
          array: [...array],
          comparisons: totalComparisons,
          swaps: totalSwaps,
        });
        if (array[left] > array[largest]) {
          largest = left;
        }
      }

      if (right < n) {
        totalComparisons++;
        steps.push({
          type: 'compare',
          indices: [right, largest],
          array: [...array],
          comparisons: totalComparisons,
          swaps: totalSwaps,
        });
        if (array[right] > array[largest]) {
          largest = right;
        }
      }

      if (largest !== i) {
        totalSwaps++;
        [array[i], array[largest]] = [array[largest], array[i]];
        steps.push({
          type: 'swap',
          indices: [i, largest],
          array: [...array],
          comparisons: totalComparisons,
          swaps: totalSwaps,
        });
        heapify(array, n, largest);
      }
    };

    // Build max heap
    for (let i = Math.floor(tempArray.length / 2) - 1; i >= 0; i--) {
      heapify(tempArray, tempArray.length, i);
    }

    steps.push({
      type: 'heap_built',
      array: [...tempArray],
      comparisons: totalComparisons,
      swaps: totalSwaps,
    });

    // Extract elements from heap one by one
    for (let i = tempArray.length - 1; i > 0; i--) {
      totalSwaps++;
      [tempArray[0], tempArray[i]] = [tempArray[i], tempArray[0]];
      steps.push({
        type: 'extract',
        indices: [0, i],
        array: [...tempArray],
        comparisons: totalComparisons,
        swaps: totalSwaps,
      });

      steps.push({
        type: 'sorted',
        indices: [i],
        array: [...tempArray],
        comparisons: totalComparisons,
        swaps: totalSwaps,
      });

      heapify(tempArray, i, 0);
    }

    steps.push({
      type: 'complete',
      array: [...tempArray],
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

      if (step.type === 'heapify_start') {
        setHeapifying(step.indices);
        setExtracting([]);
      } else if (step.type === 'compare') {
        setHeapifying(step.indices);
      } else if (step.type === 'swap') {
        setHeapifying(step.indices);
      } else if (step.type === 'extract') {
        setExtracting(step.indices);
        setHeapifying([]);
      } else if (step.type === 'sorted') {
        setSorted(prev => [...prev, ...step.indices]);
        setExtracting([]);
      } else if (step.type === 'heap_built') {
        setHeapifying([]);
      } else if (step.type === 'complete') {
        setSorted(Array.from({ length: step.array.length }, (_, i) => i));
        setHeapifying([]);
        setExtracting([]);
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
    if (extracting.includes(index)) return 'bg-red-500';
    if (heapifying.includes(index)) return 'bg-purple-500';
    return 'bg-blue-500';
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Heap Sort Visualizer
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how Heap Sort uses a binary heap data structure to efficiently sort arrays. 
            It builds a max heap and repeatedly extracts the maximum element.
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
                  max="31"
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
                {heapifying.includes(index) && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <Triangle className="h-4 w-4 text-purple-400" />
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
              <span className="text-gray-300">Heap</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-gray-300">Heapifying</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-300">Extracting</span>
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
            <h3 className="text-2xl font-bold text-white mb-4">How Heap Sort Works</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                1. Build a max heap from the input array
              </p>
              <p>
                2. The largest element is now at the root of the heap
              </p>
              <p>
                3. Swap the root with the last element and reduce heap size
              </p>
              <p>
                4. Heapify the root to maintain the max heap property
              </p>
              <p>
                5. Repeat until the heap is empty and array is sorted
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Complexity Analysis</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Time Complexity</p>
                <p className="text-lg text-white font-semibold">O(n log n) - All Cases</p>
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

export default HeapSort;