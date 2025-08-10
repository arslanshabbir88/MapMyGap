import React, { useState } from 'react';
import Homepage from './Homepage';
import Analyzer from './Analyzer';

export default function App() {
  // 'page' state determines which component to show
  const [page, setPage] = useState('homepage');

  const navigateToAnalyzer = (e) => {
    e.preventDefault(); // Prevents the browser from reloading
    setPage('analyzer');
  };

  // Conditionally render the component based on the 'page' state
  if (page === 'analyzer') {
    return <Analyzer />;
  }

  // We need to pass the navigation function to the Homepage
  // so its buttons can trigger the page change.
  // This requires a small change in the Homepage component itself.
  // For now, let's just render the homepage.
  // We will update the Homepage component in the next step.
  return <Homepage onNavigate={navigateToAnalyzer} />;
}