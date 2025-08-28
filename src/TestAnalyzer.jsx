import React from 'react';
import Analyzer from './Analyzer';

const TestAnalyzer = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-white mb-4">Testing Analyzer Component</h1>
        <Analyzer />
      </div>
    </div>
  );
};

export default TestAnalyzer;
