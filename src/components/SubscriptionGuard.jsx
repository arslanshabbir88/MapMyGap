import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const SubscriptionGuard = ({ children }) => {
  const { user, subscription, subscriptionLoading } = useAuth();
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Set a timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (subscriptionLoading) {
        console.warn('⚠️ Subscription loading timeout - redirecting to pricing');
        setLoadingTimeout(true);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timer);
  }, [subscriptionLoading]);

  // Show loading while checking subscription (but only if actively loading)
  if (subscriptionLoading && !loadingTimeout) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Checking subscription...</p>
          <p className="text-slate-500 text-sm mt-2">This should only take a moment...</p>
        </div>
      </div>
    );
  }

  // If loading timed out or user exists but no subscription after loading is complete, show onboarding message
  if (loadingTimeout || (user && !subscription && !subscriptionLoading)) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to MapMyGap!</h2>
            <p className="text-slate-300 mb-6 leading-relaxed">
              To start analyzing your compliance documents, you'll need to select a plan. 
              Start with our free 14-day trial to explore all features with no payment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
              >
                Start Free Trial →
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-300"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If subscription exists, render the protected content
  return children;
};

export default SubscriptionGuard;
