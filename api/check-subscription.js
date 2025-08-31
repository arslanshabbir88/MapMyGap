import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }

    // Find customer by user ID
    const customers = await stripe.customers.list({
      limit: 100,
    });

    const customer = customers.data.find(c => c.metadata?.userId === userId);

    if (!customer) {
      return res.status(200).json({ subscription: null });
    }

    // Get active subscriptions for the customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return res.status(200).json({ subscription: null });
    }

    const subscription = subscriptions.data[0];
    
    // Get the price to determine plan type
    const price = await stripe.prices.retrieve(subscription.items.data[0].price.id);
    
    // Determine plan type based on price ID
    let planType = 'Unknown';
    if (price.id === 'price_1S1q8O2LOmx0fW2YpttvoaCs') planType = 'Trial';
    else if (price.id === 'price_1S1gdB2LOmx0fW2YClgvwNTc') planType = 'Starter';
    else if (price.id === 'price_1S1ghh2LOmx0fW2YWE0mjvJ0') planType = 'Professional';
    else if (price.id === 'price_1S1gjU2LOmx0fW2YkA4x8uKK') planType = 'Enterprise';

    const subscriptionData = {
      id: subscription.id,
      status: subscription.status,
      plan: planType,
      currentPeriodEnd: subscription.current_period_end,
      customerId: customer.id,
    };

    res.status(200).json({ subscription: subscriptionData });
  } catch (error) {
    console.error('Error checking subscription:', error);
    res.status(500).json({ error: 'Failed to check subscription status' });
  }
}
