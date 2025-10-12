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

  // If loading timed out or user exists but no subscription after loading is complete, redirect to pricing
  if (loadingTimeout || (user && !subscription && !subscriptionLoading)) {
    return <Navigate to="/pricing" replace />;
  }

  // If subscription exists, render the protected content
  return children;
};

export default SubscriptionGuard;
