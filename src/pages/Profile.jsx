import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, subscription, signOut } = useAuth();
  const navigate = useNavigate();
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      if (!user) return;
      
      try {
        const response = await fetch(`/api/check-usage?user_id=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setUsage(data.usage);
        }
      } catch (error) {
        console.error('Error fetching usage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleUpgrade = () => {
    // Redirect to Stripe checkout for plan upgrade
    window.location.href = '/api/create-checkout-session?plan=professional';
  };

  const handleBilling = () => {
    // Redirect to Stripe customer portal
    window.location.href = '/api/create-portal-session';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold">Profile</h1>
            <button
              onClick={() => navigate('/analyzer')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Back to Analyzer
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Details */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-slate-400">Name</label>
                <p className="text-white">{user?.user_metadata?.full_name || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm text-slate-400">Email</label>
                <p className="text-white">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm text-slate-400">Account Created</label>
                <p className="text-white">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
            </div>
          </div>

          {/* Subscription Status */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-slate-400">Current Plan</label>
                <p className="text-white capitalize">
                  {subscription?.plan_type || 'Trial'}
                </p>
              </div>
              <div>
                <label className="text-sm text-slate-400">Status</label>
                <p className="text-white capitalize">
                  {subscription?.status || 'Active'}
                </p>
              </div>
              <div>
                <label className="text-sm text-slate-400">Renewal Date</label>
                <p className="text-white">
                  {subscription?.currentPeriodEnd 
                    ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
                    : 'N/A'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Usage Summary */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Usage Summary</h2>
            {usage ? (
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-slate-400">Analysis Runs</label>
                  <p className="text-white">
                    {usage.runs_used} / {usage.runs_limit === -1 ? '∞' : usage.runs_limit} used
                  </p>
                  {usage.runs_remaining !== -1 && (
                    <p className="text-sm text-slate-400">
                      {usage.runs_remaining} remaining
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-slate-400">Control Text</label>
                  <p className="text-white">
                    {usage.control_text_enabled ? 'Enabled' : 'Disabled'}
                  </p>
                  {usage.control_text_enabled && (
                    <p className="text-sm text-slate-400">
                      {usage.control_text_used} / {usage.control_text_limit === -1 ? '∞' : usage.control_text_limit} characters used
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-slate-400">Loading usage data...</p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {subscription?.plan_type?.toLowerCase() === 'trial' && (
                <button
                  onClick={handleUpgrade}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  Upgrade Plan
                </button>
              )}
              <button
                onClick={handleBilling}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                View Billing
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
