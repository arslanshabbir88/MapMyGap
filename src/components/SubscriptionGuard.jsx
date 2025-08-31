import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const SubscriptionGuard = ({ children }) => {
  const { user, subscription, subscriptionLoading } = useAuth();

  // Show loading while checking subscription
  if (subscriptionLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Checking subscription...</p>
        </div>
      </div>
    );
  }

  // If no subscription, redirect to pricing
  if (!subscription) {
    return <Navigate to="/pricing" replace />;
  }

  // If subscription exists, render the protected content
  return children;
};

export default SubscriptionGuard;
