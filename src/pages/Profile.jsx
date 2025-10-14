import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, subscription, signOut } = useAuth();
  const navigate = useNavigate();
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [accessUntilDate, setAccessUntilDate] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);



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
    // Redirect to pricing page so user can choose their plan
    navigate('/pricing');
  };

  const handleCancelSubscription = async () => {
    setShowCancelModal(false);
    setIsCancelling(true);

    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.access_until) {
          try {
            const accessUntil = new Date(data.access_until).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            });
            setAccessUntilDate(accessUntil);
          } catch (e) {
            console.error('Error formatting date:', e);
          }
        }
        setShowSuccessModal(true);
        // Reload after 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        const errorMessage = data.details 
          ? `${data.error}\n\nDetails: ${data.details}` 
          : data.error;
        setModalMessage(errorMessage);
        setShowErrorModal(true);
        setIsCancelling(false);
        console.error('Cancellation error:', data);
      }
    } catch (error) {
      console.error('❌ Error cancelling subscription:', error);
      setModalMessage(error.message);
      setShowErrorModal(true);
      setIsCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <span className="text-2xl font-bold">
              {user?.user_metadata?.full_name 
                ? user.user_metadata.full_name.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2)
                : user?.email?.slice(0, 2).toUpperCase() || 'U'
              }
            </span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
            Welcome back!
          </h1>
          <p className="text-slate-400 text-lg">
            {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Details Card */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Account Details</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 font-medium">Full Name</label>
                  <p className="text-white font-medium mt-1">
                    {user?.user_metadata?.full_name || 'Not provided'}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-400 font-medium">Email Address</label>
                  <p className="text-white font-medium mt-1 break-all">
                    {user?.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-400 font-medium">Account Created</label>
                  <p className="text-white font-medium mt-1">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription & Usage Card */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Subscription & Usage</h2>
              </div>
              
              {usage ? (
                <div className="space-y-6">
                  {/* Subscription Expiration Warning */}
                  {subscription?.currentPeriodEnd && (() => {
                    const expirationDate = new Date(subscription.currentPeriodEnd);
                    const now = new Date();
                    const daysUntilExpiration = Math.ceil((expirationDate - now) / (1000 * 60 * 60 * 24));
                    
                    if (daysUntilExpiration <= 7 && daysUntilExpiration > 0) {
                      return (
                        <div className="p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-orange-200">
                                {subscription.plan_type?.toLowerCase() === 'trial' ? 'Trial Expiring Soon' : 'Subscription Expiring Soon'}
                              </h4>
                              <p className="text-xs text-orange-300 mt-1">
                                {subscription.plan_type?.toLowerCase() === 'trial' 
                                  ? `Your trial expires in ${daysUntilExpiration} day${daysUntilExpiration !== 1 ? 's' : ''}. Upgrade to continue using MapMyGap.`
                                  : `Your subscription expires in ${daysUntilExpiration} day${daysUntilExpiration !== 1 ? 's' : ''}. Renew to avoid service interruption.`
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}


                  {/* Plan Status */}
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                    <div>
                      <h3 className="font-semibold text-white">
                        {subscription?.plan_type?.charAt(0).toUpperCase() + subscription?.plan_type?.slice(1) || 'Trial'} Plan
                      </h3>
                      <p className="text-sm text-slate-400">
                        Status: <span className={`font-medium capitalize ${
                          subscription?.cancelAtPeriodEnd ? 'text-orange-400' : 'text-emerald-400'
                        }`}>
                          {subscription?.cancelAtPeriodEnd ? 'Canceling' : subscription?.status || 'Active'}
                        </span>
                      </p>
                      {subscription?.currentPeriodEnd ? (
                        <div className="text-sm text-slate-400 mt-1">
                          <p>
                            {subscription?.cancelAtPeriodEnd ? (
                              <>
                                Cancels on{' '}
                                <span className="text-orange-400 font-medium">
                                  {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', { 
                                    year: 'numeric',
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                                </span>
                              </>
                            ) : subscription.plan_type?.toLowerCase() === 'trial' ? (
                              <>
                                Trial expires on{' '}
                                <span className="text-blue-400 font-medium">
                                  {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', { 
                                    year: 'numeric',
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                                </span>
                              </>
                            ) : (
                              <>
                                Renews on{' '}
                                <span className="text-blue-400 font-medium">
                                  {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', { 
                                    year: 'numeric',
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                                </span>
                              </>
                            )}
                          </p>
                        </div>
                      ) : (
                        <div className="text-sm text-slate-400 mt-1">
                          <p className="text-yellow-400">Expiration date not available</p>
                        </div>
                      )}
                      
                    </div>
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  </div>

                  {/* Billing Information */}
                  {subscription?.currentPeriodEnd && subscription.plan_type?.toLowerCase() !== 'trial' && (
                    <div className="p-4 bg-slate-700/30 rounded-xl">
                      <h4 className="font-medium text-white mb-3 flex items-center">
                        <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Billing Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Billing Cycle:</span>
                          <span className="text-white font-medium">
                            {subscription?.interval || 'Monthly'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Next Billing Date:</span>
                          <span className="text-blue-400 font-medium">
                            {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Plan Status:</span>
                          <span className={`font-medium ${
                            subscription.cancelAtPeriodEnd ? 'text-orange-400' :
                            subscription.status === 'active' ? 'text-emerald-400' : 
                            subscription.status === 'past_due' ? 'text-orange-400' : 
                            'text-red-400'
                          }`}>
                            {subscription.cancelAtPeriodEnd ? 'Canceling' : subscription.status?.charAt(0).toUpperCase() + subscription.status?.slice(1) || 'Active'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Usage Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-700/30 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400 font-medium">Analysis Runs</span>
                        <span className="text-xs text-slate-500">
                          {usage.runs_used} / {usage.runs_limit === -1 ? 'Unlimited' : usage.runs_limit}
                        </span>
                      </div>
                      {usage.runs_remaining !== -1 && usage.runs_limit > 0 && (
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-emerald-400 to-blue-400 h-2 rounded-full transition-all duration-300" 
                            style={{width: `${Math.max(0, (usage.runs_remaining / usage.runs_limit) * 100)}%`}}
                          ></div>
                        </div>
                      )}
                      {usage.runs_remaining === -1 && (
                        <p className="text-emerald-400 text-sm font-medium">Unlimited</p>
                      )}
                    </div>

                    <div className="p-4 bg-slate-700/30 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400 font-medium">Control Text</span>
                        <span className={`text-xs font-medium ${usage.control_text_enabled ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {usage.control_text_enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      {usage.control_text_enabled && (
                        <p className="text-slate-300 text-sm">
                          {usage.control_text_limit === -1 ? 'Unlimited characters' : `${usage.control_text_remaining} remaining`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-3 text-slate-400">Loading usage data...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {subscription?.plan_type?.toLowerCase() === 'trial' && (
            <button
              onClick={handleUpgrade}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
            >
              Upgrade Plan
            </button>
          )}
          
          {/* Show cancel button for paid subscriptions that aren't already cancelled */}
          {subscription?.plan_type?.toLowerCase() !== 'trial' && 
           subscription?.status !== 'cancelled' && 
           !subscription?.cancelAtPeriodEnd && (
            <button
              onClick={() => setShowCancelModal(true)}
              disabled={isCancelling}
              className="px-8 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 hover:border-red-500/50 text-red-400 font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Subscription'}
            </button>
          )}
          
          {/* Show status if subscription is canceling */}
          {subscription?.cancelAtPeriodEnd && (
            <div className="px-8 py-3 bg-orange-600/20 border border-orange-500/30 text-orange-400 font-semibold rounded-xl flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>Subscription Cancelling at Period End</span>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Cancellation Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in">
            <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white text-center mb-3">Cancel Subscription?</h3>
            <p className="text-slate-300 text-center mb-6">
              Are you sure you want to cancel your subscription? You will retain access until the end of your current billing period, but your subscription will not renew.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancelSubscription}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in">
            <div className="flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white text-center mb-3">Subscription Cancelled</h3>
            <p className="text-slate-300 text-center mb-4">
              Your subscription has been successfully cancelled.
            </p>
            {accessUntilDate && (
              <p className="text-blue-400 text-center font-medium mb-6">
                You'll retain access until {accessUntilDate}
              </p>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in">
            <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white text-center mb-3">Cancellation Failed</h3>
            <p className="text-slate-300 text-center mb-6">
              {modalMessage || 'An error occurred while cancelling your subscription. Please try again.'}
            </p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
