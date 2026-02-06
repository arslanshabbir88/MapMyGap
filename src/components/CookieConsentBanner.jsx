import React, { useEffect, useState } from 'react';
import { loadAnalytics, hasConsentedToAnalytics, setAnalyticsConsent } from '../analytics';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if no prior choice
    if (!hasConsentedToAnalytics() && typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('cookieConsent');
      if (!stored) {
        setVisible(true);
      }
    } else if (hasConsentedToAnalytics()) {
      // If already accepted on a previous visit, ensure analytics is loaded
      loadAnalytics();
    }
  }, []);

  const handleAccept = () => {
    setAnalyticsConsent(true);
    loadAnalytics();
    setVisible(false);
  };

  const handleReject = () => {
    setAnalyticsConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="max-w-4xl w-full rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl shadow-black/50 backdrop-blur-md p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-slate-100">
              Cookies and analytics
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              We use cookies and similar technologies to understand how MapMyGap is used and to improve the product.
              You can accept or reject non-essential analytics and advertising cookies. Essential cookies are always on.
              For more details, see our{' '}
              <a href="/privacy" className="underline text-blue-400 hover:text-blue-300">
                Privacy Policy
              </a>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
            <button
              type="button"
              onClick={handleReject}
              className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-600 text-xs sm:text-sm font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700 transition-colors"
            >
              Reject non-essential
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-500 text-xs sm:text-sm font-semibold text-white hover:bg-blue-400 shadow-sm shadow-blue-500/40 transition-colors"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

