import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const trialPriceId = 'price_1S1q8O2LOmx0fW2YpttvoaCs';
    
    console.log('🔍 Debugging Trial price ID:', trialPriceId);
    
    // Retrieve the price to see its configuration
    const price = await stripe.prices.retrieve(trialPriceId);
    
    console.log('📊 Price details:', {
      id: price.id,
      type: price.type,
      recurring: price.recurring,
      unit_amount: price.unit_amount,
      currency: price.currency,
      active: price.active,
      product: price.product
    });
    
    // Test creating a checkout session with this price
    try {
      const testSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: trialPriceId,
            quantity: 1,
          },
        ],
        mode: 'payment', // Try payment mode first
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
        metadata: {
          plan: 'Trial',
          userId: 'test-user'
        }
      });
      
      console.log('✅ Test checkout session created successfully:', testSession.id);
      
      res.status(200).json({
        price: {
          id: price.id,
          type: price.type,
          recurring: price.recurring,
          unit_amount: price.unit_amount,
          currency: price.currency,
          active: price.active,
          product: price.product
        },
        testSession: {
          id: testSession.id,
          mode: testSession.mode,
          status: testSession.status
        },
        conclusion: 'Price configuration looks correct'
      });
      
    } catch (checkoutError) {
      console.error('❌ Test checkout session failed:', checkoutError.message);
      
      res.status(200).json({
        price: {
          id: price.id,
          type: price.type,
          recurring: price.recurring,
          unit_amount: price.unit_amount,
          currency: price.currency,
          active: price.active,
          product: price.product
        },
        checkoutError: {
          message: checkoutError.message,
          type: checkoutError.type,
          code: checkoutError.code
        },
        conclusion: 'Price exists but checkout session creation failed'
      });
    }
    
  } catch (error) {
    console.error('❌ Error retrieving price:', error.message);
    res.status(500).json({ 
      error: 'Failed to retrieve price',
      details: error.message,
      conclusion: 'Price ID might be invalid or not found'
    });
  }
}
