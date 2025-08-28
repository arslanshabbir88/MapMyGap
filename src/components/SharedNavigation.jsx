import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

// Icon component for better UI
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const UserIcon = () => <Icon path="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />;
const LogoutIcon = () => <Icon path="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />;
const MenuIcon = () => <Icon path="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />;
const XMarkIcon = () => <Icon path="M6 18L18 6M6 6l12 12" />;

const SharedNavigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigateToAnalyzer = () => {
    if (!user) {
      // Show login modal or redirect to login
      return;
    }
    navigate('/analyzer');
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-xl border-b border-slate-800">
      <nav className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
          {/* Logo and Title - Stack on mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
            <Link to="/" className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">MapMyGap</h1>
              <span className="text-xs sm:text-sm text-slate-400">AI-Powered Compliance Analysis</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/how-it-works" className="text-slate-300 hover:text-white transition-colors">How It Works</Link>
            <Link to="/frameworks" className="text-slate-300 hover:text-white transition-colors">Frameworks</Link>
            <Link to="/pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</Link>
            <Link to="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
            <Link to="/faq" className="text-slate-300 hover:text-white transition-colors">FAQ</Link>
          </div>
          
          {/* Navigation and User Actions - Stack on mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {user ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <UserIcon />
                    <span className="text-xs sm:text-sm font-medium">
                      {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                  >
                    <LogoutIcon />
                    <span className="text-xs sm:text-sm">Logout</span>
                  </button>
                </div>
                <button
                  onClick={navigateToAnalyzer}
                  className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
                >
                  Go to Analyzer
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={navigateToAnalyzer}
                  className="text-slate-300 hover:text-white transition-colors text-center sm:text-left"
                >
                  Sign In
                </button>
                <button
                  onClick={navigateToAnalyzer}
                  className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
                >
                  Get Started
                </button>
              </>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <XMarkIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-slate-800">
            <div className="flex flex-col space-y-3 pt-4">
              <Link to="/how-it-works" className="text-slate-300 hover:text-white transition-colors">How It Works</Link>
              <Link to="/frameworks" className="text-slate-300 hover:text-white transition-colors">Frameworks</Link>
              <Link to="/pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</Link>
              <Link to="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
              <Link to="/faq" className="text-slate-300 hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default SharedNavigation;
