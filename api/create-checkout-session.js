import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, plan, userId, successUrl, cancelUrl } = req.body;

    console.log('🔍 Create checkout session request:', {
      priceId,
      plan,
      userId,
      successUrl,
      cancelUrl,
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY
    });

    if (!priceId || !plan || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Determine if this is a trial plan (free or one-time)
    const isTrialPlan = plan.toLowerCase() === 'trial';
    
    console.log('📊 Plan analysis:', {
      plan,
      isTrialPlan,
      mode: isTrialPlan ? 'payment' : 'subscription'
    });
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: isTrialPlan ? [] : ['card'], // No payment method for trial
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: isTrialPlan ? 'payment' : 'subscription', // Use 'payment' for trial, 'subscription' for others
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: userId,
      allow_promotion_codes: false,
      billing_address_collection: isTrialPlan ? 'none' : 'auto', // No billing for trial
      metadata: {
        plan: plan,
        userId: userId,
      },
      ...(isTrialPlan ? {
        // For trial (one-time payment), don't set payment_method_collection
        submit_type: 'auto', // Auto-submit for trial
      } : {
        // For subscriptions, set payment_method_collection
        payment_method_collection: 'always',
        subscription_data: {
          metadata: {
            plan: plan,
            userId: userId,
          },
        },
      }),
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
