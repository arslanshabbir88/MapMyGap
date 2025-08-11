import React, { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import Homepage from './Homepage.jsx';
import Analyzer from './Analyzer.jsx';
import LoginModal from './LoginModal.jsx';

function AppContent() {
  const [page, setPage] = useState('homepage');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, loading } = useAuth();

  const navigateToAnalyzer = (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setPage('analyzer');
  };

  const navigateToHome = (e) => {
    e.preventDefault();
    setPage('homepage');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (page === 'analyzer') {
    return <Analyzer onNavigateHome={navigateToHome} />;
  }

  return (
    <>
      <Homepage onNavigate={navigateToAnalyzer} />
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={() => setShowLoginModal(false)}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
