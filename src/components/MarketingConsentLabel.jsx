import React from 'react';
import { Link } from 'react-router-dom';

/** Shared copy for marketing email opt-in (signup, profile, footer). */
export default function MarketingConsentLabel({ id, className = 'text-slate-400' }) {
  return (
    <label htmlFor={id} className={`text-sm leading-snug ${className}`}>
      Email me product updates and occasional marketing from MapMyGap. Read our{' '}
      <Link to="/privacy" className="text-blue-400 hover:text-blue-300 underline-offset-2 hover:underline">
        Privacy Policy
      </Link>
      .
    </label>
  );
}
