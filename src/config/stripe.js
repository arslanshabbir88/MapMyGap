import { loadStripe } from '@stripe/stripe-js';

// Load Stripe with your publishable key
export const stripePromise = loadStripe(import.meta.env.STRIPE_PUBLISHABLE_KEY);

// Stripe configuration
export const STRIPE_CONFIG = {
  // Your Stripe publishable key will be loaded from environment variables
  publishableKey: import.meta.env.STRIPE_PUBLISHABLE_KEY,
  
  // Price IDs from your Stripe dashboard (NOT Product IDs!)
  prices: {
    trial: 'price_1S1q8O2LOmx0fW2YpttvoaCs', // Replace with actual PRICE ID (starts with price_)
    starter: 'price_1S1gdB2LOmx0fW2YClgvwNTc', // Replace with actual PRICE ID (starts with price_)
    professional: 'price_1S1ghh2LOmx0fW2YWE0mjvJ0', // Replace with actual PRICE ID (starts with price_)
    enterprise: 'price_1S1gjU2LOmx0fW2YkA4x8uKK' // Replace with actual PRICE ID (starts with price_)
  }
};
