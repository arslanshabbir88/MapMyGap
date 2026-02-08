import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Homepage from './Homepage.jsx';
import Analyzer from './Analyzer.jsx';
import LoginModal from './LoginModal.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import FAQ from './pages/FAQ.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import Frameworks from './pages/Frameworks.jsx';
import Security from './pages/Security.jsx';
import Pricing from './pages/Pricing.jsx';
import About from './pages/About.jsx';
import SubscriptionSuccess from './pages/SubscriptionSuccess.jsx';
import SubscriptionGuard from './components/SubscriptionGuard.jsx';
import Profile from './pages/Profile.jsx';
import AppLayout from './components/AppLayout.jsx';
import CookieConsentBanner from './components/CookieConsentBanner.jsx';

// Component to track page views for Google Analytics
function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-613K4Q3WKK', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

function AppContent() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authModalSignUp, setAuthModalSignUp] = useState(false);
  const { user, loading } = useAuth();

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

  return (
    <Router>
      <CookieConsentBanner />
      <PageViewTracker />
      <Routes>
        <Route path="/" element={<Homepage onShowLogin={() => { setShowLoginModal(true); setAuthModalSignUp(false); }} onShowSignup={() => { setShowLoginModal(true); setAuthModalSignUp(true); }} />} />
        <Route path="/analyzer" element={
          user ? (
            <AppLayout>
              <SubscriptionGuard>
                <Analyzer />
              </SubscriptionGuard>
            </AppLayout>
          ) : (
            <Navigate to="/" replace />
          )
        } />
        <Route path="/profile" element={
          user ? (
            <AppLayout>
              <Profile />
            </AppLayout>
          ) : (
            <Navigate to="/" replace />
          )
        } />
        <Route path="/terms" element={<TermsOfService onShowLogin={() => { setShowLoginModal(true); setAuthModalSignUp(false); }} onShowSignup={() => { setShowLoginModal(true); setAuthModalSignUp(true); }} />} />
        <Route path="/privacy" element={<PrivacyPolicy onShowLogin={() => { setShowLoginModal(true); setAuthModalSignUp(false); }} onShowSignup={() => { setShowLoginModal(true); setAuthModalSignUp(true); }} />} />
        <Route path="/faq" element={<FAQ onShowLogin={() => { setShowLoginModal(true); setAuthModalSignUp(false); }} onShowSignup={() => { setShowLoginModal(true); setAuthModalSignUp(true); }} />} />
        <Route path="/how-it-works" element={<HowItWorks onShowLogin={() => { setShowLoginModal(true); setAuthModalSignUp(false); }} onShowSignup={() => { setShowLoginModal(true); setAuthModalSignUp(true); }} />} />
        <Route path="/frameworks" element={<Frameworks onShowLogin={() => { setShowLoginModal(true); setAuthModalSignUp(false); }} onShowSignup={() => { setShowLoginModal(true); setAuthModalSignUp(true); }} />} />
        <Route path="/security" element={<Security onShowLogin={() => { setShowLoginModal(true); setAuthModalSignUp(false); }} onShowSignup={() => { setShowLoginModal(true); setAuthModalSignUp(true); }} />} />
        <Route path="/pricing" element={<Pricing onShowLogin={() => { setShowLoginModal(true); setAuthModalSignUp(false); }} onShowSignup={() => { setShowLoginModal(true); setAuthModalSignUp(true); }} />} />
        <Route path="/about" element={<About onShowLogin={() => { setShowLoginModal(true); setAuthModalSignUp(false); }} onShowSignup={() => { setShowLoginModal(true); setAuthModalSignUp(true); }} />} />
        <Route path="/subscription-success" element={<SubscriptionSuccess onShowLogin={() => { setShowLoginModal(true); setAuthModalSignUp(false); }} onShowSignup={() => { setShowLoginModal(true); setAuthModalSignUp(true); }} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={() => setShowLoginModal(false)}
        initialIsSignup={authModalSignUp}
      />
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
