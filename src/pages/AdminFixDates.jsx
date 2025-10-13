import React, { useState } from 'react';

const AdminFixDates = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFix = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/admin-fix-dates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to fix dates');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin: Fix Subscription Dates</h1>
        
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-6">
          <p className="text-slate-300 mb-6">
            This will fetch the correct <code className="bg-slate-700 px-2 py-1 rounded">current_period_end</code> dates 
            from Stripe for all subscriptions that are missing this data in the database.
          </p>

          <button
            onClick={handleFix}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300"
          >
            {loading ? 'Fixing...' : 'Fix Subscription Dates'}
          </button>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-red-400 mb-2">Error</h3>
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">✅ Success!</h3>
            <div className="space-y-2 text-slate-300">
              <p><strong>Fixed:</strong> {result.fixed} of {result.total} subscriptions</p>
              <p className="text-sm text-slate-400">{result.message}</p>
            </div>

            {result.results && result.results.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-white mb-3">Details:</h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {result.results.map((r, i) => (
                    <div 
                      key={i} 
                      className={`p-3 rounded-lg ${
                        r.status === 'success' ? 'bg-emerald-900/20' : 
                        r.status === 'error' ? 'bg-red-900/20' : 
                        'bg-yellow-900/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <code className="text-sm text-slate-300">{r.subscription_id}</code>
                        <span className={`text-xs font-semibold ${
                          r.status === 'success' ? 'text-emerald-400' : 
                          r.status === 'error' ? 'text-red-400' : 
                          'text-yellow-400'
                        }`}>
                          {r.status}
                        </span>
                      </div>
                      {r.current_period_end && (
                        <p className="text-xs text-slate-400 mt-1">
                          Expires: {new Date(r.current_period_end).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      )}
                      {r.error && (
                        <p className="text-xs text-red-300 mt-1">{r.error}</p>
                      )}
                      {r.reason && (
                        <p className="text-xs text-yellow-300 mt-1">{r.reason}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFixDates;

