import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContactForm } from '../contexts/ContactFormContext';

const Header = () => {
  const { user, subscription, signOut } = useAuth();
  const navigate = useNavigate();
  const { openContactForm } = useContactForm();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSupport = () => {
    openContactForm('support');
  };

  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.slice(0, 2).toUpperCase() || 'U';
  };

  return (
    <header className="lg:sticky top-0 z-50 bg-slate-900/70 backdrop-blur-xl border-b border-slate-800">
      <nav className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-2 sm:py-3 lg:py-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
          {/* Logo and Title - More compact on mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-0.5 sm:space-y-0 sm:space-x-4">
            <div 
              className="flex flex-col sm:flex-row sm:items-center space-y-0.5 sm:space-y-0 sm:space-x-4 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                MapMyGap
              </h1>
              <span className="text-xs text-slate-400 hidden sm:block">AI-Powered Compliance Analysis</span>
            </div>
          </div>

          {/* Navigation and User Actions - More compact on mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Help/Support Link */}
            <button
              onClick={handleSupport}
              className="text-slate-300 hover:text-white transition-colors text-sm"
            >
              Help & Support
            </button>

            {/* User Actions - Simplified like homepage */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1.5 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  {getUserInitials()}
                </div>
                <span className="text-xs font-medium">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                </span>
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <span className="text-xs">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
