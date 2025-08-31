import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Log environment variables for debugging
    console.log('Environment check:', {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      supabaseUrl: process.env.SUPABASE_URL?.substring(0, 20) + '...',
    });

    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing Supabase environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Query Supabase for user's subscription
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error) {
      console.error('Supabase query error:', error);
      return res.status(200).json({ subscription: null });
    }

    if (!subscription) {
      console.log('No subscription found for user:', userId);
      return res.status(200).json({ subscription: null });
    }

    const subscriptionData = {
      id: subscription.stripe_subscription_id,
      status: subscription.status,
      plan: subscription.plan_type,
      currentPeriodEnd: subscription.current_period_end,
      customerId: subscription.stripe_customer_id,
    };

    console.log('Subscription found:', subscriptionData);
    res.status(200).json({ subscription: subscriptionData });
  } catch (error) {
    console.error('Error checking subscription:', error);
    res.status(500).json({ error: 'Failed to check subscription status', details: error.message });
  }
}
