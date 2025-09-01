import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const trialPriceId = 'price_1S1q8O2LOmx0fW2YpttvoaCs';
    
    console.log('Testing Trial price ID:', trialPriceId);
    
    // Retrieve the price to see its configuration
    const price = await stripe.prices.retrieve(trialPriceId);
    
    console.log('Price details:', {
      id: price.id,
      type: price.type,
      recurring: price.recurring,
      unit_amount: price.unit_amount,
      currency: price.currency,
      active: price.active
    });
    
    res.status(200).json({
      price: {
        id: price.id,
        type: price.type,
        recurring: price.recurring,
        unit_amount: price.unit_amount,
        currency: price.currency,
        active: price.active
      }
    });
  } catch (error) {
    console.error('Error testing trial price:', error);
    res.status(500).json({ 
      error: 'Failed to test trial price',
      details: error.message 
    });
  }
}
