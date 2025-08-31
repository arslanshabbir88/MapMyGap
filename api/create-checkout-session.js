import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, plan, userId, successUrl, cancelUrl } = req.body;

    if (!priceId || !plan || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: userId,
      // Force checkout session mode
      payment_method_collection: 'always',
      allow_promotion_codes: false,
      billing_address_collection: 'auto',
      metadata: {
        plan: plan,
        userId: userId,
      },
      subscription_data: {
        metadata: {
          plan: plan,
          userId: userId,
        },
      },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    console.error('Request body:', req.body);
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      param: error.param
    });
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error.message 
    });
  }
}
