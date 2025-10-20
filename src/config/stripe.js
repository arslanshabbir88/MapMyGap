import { loadStripe } from '@stripe/stripe-js';

// Debug: Log the environment variable
console.log('VITE_STRIPE_PUBLISHABLE_KEY from env:', import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Load Stripe with your publishable key
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!publishableKey) {
  console.error('VITE_STRIPE_PUBLISHABLE_KEY is not set in environment variables');
}
export const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

// Stripe configuration
export const STRIPE_CONFIG = {
  // Your Stripe publishable key will be loaded from environment variables
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
  
  // Price IDs from your Stripe dashboard (Live Mode)
  prices: {
    trial: 'price_1SKBQKRxR84YWtKOnL7EH5CJ', // 14 day trial
    starter: 'price_1SKBQaRxR84YWtKO10Dgusyf', // Starter Plan
    professional: 'price_1SKBQYRxR84YWtKO57ZCxxxI', // Professional Plan
    enterprise: 'price_1SKBQWRxR84YWtKOWhoMAxGU' // Enterprise Plan
  }
};
