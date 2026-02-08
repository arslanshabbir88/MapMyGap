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

    // Trial is a recurring $0 price with trial period — must use subscription mode
    const isTrialPlan = plan.toLowerCase() === 'trial';

    console.log('📊 Plan analysis:', {
      plan,
      isTrialPlan,
      mode: 'subscription', // Trial uses subscription mode (recurring $0 price)
    });

    // Create Stripe checkout session (subscription mode for all plans including trial)
    const session = await stripe.checkout.sessions.create({
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
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      metadata: {
        plan: plan,
        userId: userId,
      },
      // No card required for $0 trial; card required for paid plans
      payment_method_collection: isTrialPlan ? 'if_required' : 'always',
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
