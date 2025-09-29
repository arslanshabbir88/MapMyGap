import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, subscription, signOut } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSupport = () => {
    // You can replace this with your actual support contact
    window.open('mailto:admin@mapmygap.com', '_blank');
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

  const getPlanDisplayName = () => {
    if (!subscription) return 'Trial';
    return subscription.plan_type || 'Trial';
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

            {/* User Menu */}
            <div className="relative">
              <div className="flex items-center space-x-2">
                {/* Clickable User Info */}
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2 text-white hover:bg-slate-700 rounded-lg px-3 py-2 transition-colors"
                >
                  {/* User Avatar */}
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    {getUserInitials()}
                  </div>
                  
                  {/* User Info */}
                  <div className="text-left">
                    <div className="text-sm font-medium">
                      {user?.user_metadata?.full_name || user?.email}
                    </div>
                    <div className="text-xs text-slate-400">
                      {getPlanDisplayName()} Plan
                    </div>
                  </div>
                </button>

                {/* Dropdown Menu Button */}
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="text-white hover:bg-slate-700 rounded-lg p-2 transition-colors"
                >
                  <svg
                    className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-700 rounded-lg shadow-lg py-1 z-50">
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-600 transition-colors"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;
