import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useMarketingConsent } from '../hooks/useMarketingConsent';
import MarketingConsentLabel from './MarketingConsentLabel';

export default function MarketingFooterBlock() {
  const { user } = useAuth();
  const { optedIn, loading, saving, save } = useMarketingConsent();
  const [email, setEmail] = useState('');
  const [guestChecked, setGuestChecked] = useState(true);
  const [guestSubmitting, setGuestSubmitting] = useState(false);
  const [guestMessage, setGuestMessage] = useState(null);

  const handleGuestSubmit = async (e) => {
    e.preventDefault();
    setGuestMessage(null);
    const trimmed = email.trim();
    if (!guestChecked || !trimmed) {
      setGuestMessage({ ok: false, text: 'Please enter your email and opt in.' });
      return;
    }
    setGuestSubmitting(true);
    try {
      const res = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent: 'marketing_newsletter',
          email: trimmed,
          opted_in: true,
          source: 'footer',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setGuestMessage({ ok: true, text: "You're subscribed. Thanks!" });
      setEmail('');
      setGuestChecked(true);
    } catch (err) {
      setGuestMessage({ ok: false, text: err.message || 'Could not subscribe.' });
    } finally {
      setGuestSubmitting(false);
    }
  };

  if (user) {
    return (
      <div className="space-y-3">
        <p className="text-slate-400 text-sm">
          Signed in as <span className="text-slate-300">{user.email}</span>
        </p>
        <div className="flex items-start gap-3">
          <input
            id="footer-marketing-consent"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500"
            checked={loading ? false : optedIn}
            disabled={loading || saving}
            onChange={(e) => save(e.target.checked, 'footer')}
          />
          <MarketingConsentLabel id="footer-marketing-consent" />
        </div>
        {saving && <p className="text-xs text-slate-500">Saving…</p>}
      </div>
    );
  }

  return (
    <form onSubmit={handleGuestSubmit} className="space-y-3 max-w-md">
      <div>
        <label htmlFor="footer-marketing-email" className="block text-sm font-medium text-slate-300 mb-1">
          Email
        </label>
        <input
          id="footer-marketing-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="you@company.com"
        />
      </div>
      <div className="flex items-start gap-3">
        <input
          id="footer-guest-marketing"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500"
          checked={guestChecked}
          onChange={(e) => setGuestChecked(e.target.checked)}
        />
        <MarketingConsentLabel id="footer-guest-marketing" />
      </div>
      <button
        type="submit"
        disabled={guestSubmitting || !guestChecked || !email.trim()}
        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {guestSubmitting ? 'Submitting…' : 'Subscribe'}
      </button>
      {guestMessage && (
        <p className={`text-sm ${guestMessage.ok ? 'text-emerald-400' : 'text-red-400'}`}>
          {guestMessage.text}
        </p>
      )}
    </form>
  );
}
