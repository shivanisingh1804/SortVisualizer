import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Settings, Clock, BarChart3, GitMerge } from 'lucide-react';

const MergeSort = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [dividing, setDividing] = useState<number[]>([]);
  const [merging, setMerging] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [speed, setSpeed] = useState(200);
  const [arraySize, setArraySize] = useState(16);
  const [steps, setSteps] = useState<any[]>([]);
  const [comparisons, setComparisons] = useState(0);

  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 300) + 10);
    setArray(newArray);
    setCurrentStep(0);
    setDividing([]);
    setMerging([]);
    setSorted([]);
    setIsPlaying(false);
    setComparisons(0);
    generateSteps(newArray);
  }, [arraySize]);

  const generateSteps = (arr: number[]) => {
    const steps: any[] = [];
    const tempArray = [...arr];
    let totalComparisons = 0;

    const mergeSort = (array: number[], left: number, right: number) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        steps.push({
          type: 'divide',
          indices: [left, mid, right],
          array: [...array],
          comparisons: totalComparisons,
        });

        mergeSort(array, left, mid);
        mergeSort(array, mid + 1, right);
        merge(array, left, mid, right);
      }
    };

    const merge = (array: number[], left: number, mid: number, right: number) => {
      const leftArray = array.slice(left, mid + 1);
      const rightArray = array.slice(mid + 1, right + 1);
      
      let i = 0, j = 0, k = left;

      steps.push({
        type: 'merge_start',
        indices: [left, mid, right],
        array: [...array],
        comparisons: totalComparisons,
      });

      while (i < leftArray.length && j < rightArray.length) {
        totalComparisons++;
        
        steps.push({
          type: 'compare',
          indices: [left + i, mid + 1 + j],
          array: [...array],
          comparisons: totalComparisons,
        });

        if (leftArray[i] <= rightArray[j]) {
          array[k] = leftArray[i];
          i++;
        } else {
          array[k] = rightArray[j];
          j++;
        }
        
        steps.push({
          type: 'merge',
          indices: [k],
          array: [...array],
          comparisons: totalComparisons,
        });
        
        k++;
      }

      while (i < leftArray.length) {
        array[k] = leftArray[i];
        steps.push({
          type: 'merge',
          indices: [k],
          array: [...array],
          comparisons: totalComparisons,
        });
        i++;
        k++;
      }

      while (j < rightArray.length) {
        array[k] = rightArray[j];
        steps.push({
          type: 'merge',
          indices: [k],
          array: [...array],
          comparisons: totalComparisons,
        });
        j++;
        k++;
      }

      steps.push({
        type: 'merge_complete',
        indices: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
        array: [...array],
        comparisons: totalComparisons,
      });
    };

    mergeSort(tempArray, 0, tempArray.length - 1);

    steps.push({
      type: 'complete',
      array: [...tempArray],
      comparisons: totalComparisons,
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

      if (step.type === 'divide') {
        setDividing(step.indices);
        setMerging([]);
      } else if (step.type === 'merge_start') {
        setDividing([]);
        setMerging(step.indices);
      } else if (step.type === 'compare') {
        setMerging(step.indices);
      } else if (step.type === 'merge') {
        setMerging(step.indices);
      } else if (step.type === 'merge_complete') {
        setSorted(prev => [...new Set([...prev, ...step.indices])]);
        setMerging([]);
        setDividing([]);
      } else if (step.type === 'complete') {
        setSorted(Array.from({ length: step.array.length }, (_, i) => i));
        setMerging([]);
        setDividing([]);
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
    if (merging.includes(index)) return 'bg-purple-500';
    if (dividing.includes(index)) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Merge Sort Visualizer
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the divide-and-conquer approach of Merge Sort. It consistently delivers 
            O(n log n) performance by dividing the array and merging sorted subarrays.
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
                  min="4"
                  max="32"
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
              <div className="bg-purple-500 p-2 rounded-lg">
                <GitMerge className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Merges</p>
                <p className="text-2xl font-bold text-white">{Math.floor(comparisons / 2)}</p>
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
                {merging.includes(index) && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <GitMerge className="h-4 w-4 text-purple-400" />
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
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-gray-300">Dividing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-gray-300">Merging</span>
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
            <h3 className="text-2xl font-bold text-white mb-4">How Merge Sort Works</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                1. Divide the array into two halves recursively until each subarray has one element
              </p>
              <p>
                2. Start merging the subarrays back together in sorted order
              </p>
              <p>
                3. Compare elements from both subarrays and pick the smaller one
              </p>
              <p>
                4. Continue until all elements are merged into a single sorted array
              </p>
              <p>
                5. The process guarantees O(n log n) time complexity in all cases
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
                <p className="text-lg text-white font-semibold">O(n) - Additional Space</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Stability</p>
                <p className="text-lg text-white font-semibold">Stable</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergeSort;