import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

const StripeCheckout = ({ plan, priceId, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!user) {
      setError('Please log in to subscribe');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId,
          plan: plan,
          userId: user.id,
          successUrl: `${window.location.origin}/subscription-success`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Redirect to Stripe Checkout
      const stripe = await import('../config/stripe').then(({ stripePromise }) => 
        stripePromise
      );

      if (!stripe) {
        throw new Error('Stripe failed to load. Please check your configuration.');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        {loading ? 'Processing...' : `Subscribe to ${plan}`}
      </button>
      
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
};

export default StripeCheckout;
