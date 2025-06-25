import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BubbleSort from './pages/BubbleSort';
import QuickSort from './pages/QuickSort';
import MergeSort from './pages/MergeSort';
import HeapSort from './pages/HeapSort';
import InsertionSort from './pages/InsertionSort';
import SelectionSort from './pages/SelectionSort';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bubble-sort" element={<BubbleSort />} />
            <Route path="/quick-sort" element={<QuickSort />} />
            <Route path="/merge-sort" element={<MergeSort />} />
            <Route path="/heap-sort" element={<HeapSort />} />
            <Route path="/insertion-sort" element={<InsertionSort />} />
            <Route path="/selection-sort" element={<SelectionSort />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;