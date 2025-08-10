import React, { useState } from 'react';
import Homepage from './Homepage.jsx';
import Analyzer from './Analyzer.jsx';

export default function App() {
  const [page, setPage] = useState('homepage');

  const navigateToAnalyzer = (e) => {
    e.preventDefault();
    setPage('analyzer');
  };

  const navigateToHome = (e) => {
    e.preventDefault();
    setPage('homepage');
  };

  if (page === 'analyzer') {
    return <Analyzer onNavigateHome={navigateToHome} />;
  }

  return <Homepage onNavigate={navigateToAnalyzer} />;
}
