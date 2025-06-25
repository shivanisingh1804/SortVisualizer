import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Settings, Clock, BarChart3, ArrowUp } from 'lucide-react';

const InsertionSort = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [current, setCurrent] = useState<number>(-1);
  const [comparing, setComparing] = useState<number[]>([]);
  const [inserting, setInserting] = useState<number>(-1);
  const [sorted, setSorted] = useState<number[]>([]);
  const [speed, setSpeed] = useState(150);
  const [arraySize, setArraySize] = useState(15);
  const [steps, setSteps] = useState<any[]>([]);
  const [comparisons, setComparisons] = useState(0);
  const [shifts, setShifts] = useState(0);

  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 300) + 10);
    setArray(newArray);
    setCurrentStep(0);
    setCurrent(-1);
    setComparing([]);
    setInserting(-1);
    setSorted([0]); // First element is always sorted
    setIsPlaying(false);
    setComparisons(0);
    setShifts(0);
    generateSteps(newArray);
  }, [arraySize]);

  const generateSteps = (arr: number[]) => {
    const steps: any[] = [];
    const tempArray = [...arr];
    let totalComparisons = 0;
    let totalShifts = 0;

    // First element is already sorted
    steps.push({
      type: 'start',
      array: [...tempArray],
      sorted: [0],
      comparisons: totalComparisons,
      shifts: totalShifts,
    });

    for (let i = 1; i < tempArray.length; i++) {
      const key = tempArray[i];
      let j = i - 1;

      steps.push({
        type: 'pick',
        current: i,
        array: [...tempArray],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        comparisons: totalComparisons,
        shifts: totalShifts,
      });

      while (j >= 0) {
        totalComparisons++;
        
        steps.push({
          type: 'compare',
          current: i,
          comparing: [j, i],
          array: [...tempArray],
          sorted: Array.from({ length: i }, (_, idx) => idx),
          comparisons: totalComparisons,
          shifts: totalShifts,
        });

        if (tempArray[j] > key) {
          totalShifts++;
          tempArray[j + 1] = tempArray[j];
          
          steps.push({
            type: 'shift',
            shifting: j,
            array: [...tempArray],
            sorted: Array.from({ length: i }, (_, idx) => idx),
            comparisons: totalComparisons,
            shifts: totalShifts,
          });
          
          j--;
        } else {
          break;
        }
      }

      tempArray[j + 1] = key;
      
      steps.push({
        type: 'insert',
        inserting: j + 1,
        array: [...tempArray],
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
        comparisons: totalComparisons,
        shifts: totalShifts,
      });
    }

    steps.push({
      type: 'complete',
      array: [...tempArray],
      sorted: Array.from({ length: tempArray.length }, (_, idx) => idx),
      comparisons: totalComparisons,
      shifts: totalShifts,
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
      setShifts(step.shifts);
      setSorted(step.sorted || []);

      if (step.type === 'start') {
        setCurrent(-1);
        setComparing([]);
        setInserting(-1);
      } else if (step.type === 'pick') {
        setCurrent(step.current);
        setComparing([]);
        setInserting(-1);
      } else if (step.type === 'compare') {
        setCurrent(step.current);
        setComparing(step.comparing);
        setInserting(-1);
      } else if (step.type === 'shift') {
        setComparing([]);
        setInserting(-1);
      } else if (step.type === 'insert') {
        setCurrent(-1);
        setComparing([]);
        setInserting(step.inserting);
      } else if (step.type === 'complete') {
        setCurrent(-1);
        setComparing([]);
        setInserting(-1);
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
    if (index === inserting) return 'bg-green-500';
    if (index === current) return 'bg-red-500';
    if (comparing.includes(index)) return 'bg-yellow-500';
    if (sorted.includes(index)) return 'bg-blue-500';
    return 'bg-gray-500';
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Insertion Sort Visualizer
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how Insertion Sort builds the final sorted array one element at a time. 
            Efficient for small datasets with O(n²) worst-case complexity.
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
              <div className="bg-purple-500 p-2 rounded-lg">
                <ArrowUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Shifts</p>
                <p className="text-2xl font-bold text-white">{shifts}</p>
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
                {index === current && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <ArrowUp className="h-4 w-4 text-red-400" />
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
              <div className="w-4 h-4 bg-gray-500 rounded"></div>
              <span className="text-gray-300">Unsorted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-300">Sorted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-300">Current</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-gray-300">Comparing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-300">Inserting</span>
            </div>
          </div>
        </div>

        {/* Algorithm Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">How Insertion Sort Works</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                1. Start with the second element (first is considered sorted)
              </p>
              <p>
                2. Compare the current element with elements in the sorted portion
              </p>
              <p>
                3. Shift larger elements to the right to make space
              </p>
              <p>
                4. Insert the current element in its correct position
              </p>
              <p>
                5. Repeat until all elements are processed
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Complexity Analysis</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Time Complexity</p>
                <p className="text-lg text-white font-semibold">O(n²) - Worst & Average Case</p>
                <p className="text-lg text-white font-semibold">O(n) - Best Case</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Space Complexity</p>
                <p className="text-lg text-white font-semibold">O(1) - Constant</p>
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

export default InsertionSort;