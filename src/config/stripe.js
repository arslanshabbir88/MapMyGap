import { loadStripe } from '@stripe/stripe-js';

// Load Stripe with your publishable key
export const stripePromise = loadStripe(import.meta.env.STRIPE_PUBLISHABLE_KEY);

// Stripe configuration
export const STRIPE_CONFIG = {
  // Your Stripe publishable key will be loaded from environment variables
  publishableKey: import.meta.env.STRIPE_PUBLISHABLE_KEY,
  
  // Price IDs from your Stripe dashboard (NOT Product IDs!)
  prices: {
    trial: 'price_trial_id_here', // Replace with actual PRICE ID (starts with price_)
    starter: 'price_starter_id_here', // Replace with actual PRICE ID (starts with price_)
    professional: 'price_professional_id_here', // Replace with actual PRICE ID (starts with price_)
    enterprise: 'price_enterprise_id_here' // Replace with actual PRICE ID (starts with price_)
  }
};
