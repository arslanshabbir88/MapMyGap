import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    console.log('🚫 Cancellation request for user:', userId);

    // Get user's subscription from database
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (subError || !subscription) {
      console.error('❌ No subscription found:', subError);
      return res.status(404).json({ error: 'No active subscription found' });
    }

    console.log('📋 Subscription details:', {
      id: subscription.id,
      plan_type: subscription.plan_type,
      status: subscription.status,
      stripe_subscription_id: subscription.stripe_subscription_id,
      current_period_end: subscription.current_period_end
    });

    // Don't cancel trial subscriptions (they're already time-limited)
    if (subscription.plan_type?.toLowerCase() === 'trial') {
      return res.status(400).json({ 
        error: 'Trial subscriptions cannot be cancelled. Your trial will expire automatically.' 
      });
    }

    if (!subscription.stripe_subscription_id) {
      console.error('❌ No Stripe subscription ID found in database');
      return res.status(400).json({ error: 'No Stripe subscription ID found' });
    }

    // Check if this is a trial subscription (starts with 'trial_')
    if (subscription.stripe_subscription_id.startsWith('trial_')) {
      console.log('⚠️ This is a trial subscription created through checkout.session.completed');
      return res.status(400).json({ 
        error: 'Trial subscriptions expire automatically after 14 days. No cancellation needed.' 
      });
    }

    console.log('🔄 Cancelling Stripe subscription:', subscription.stripe_subscription_id);

    // Cancel the subscription at period end (user keeps access until paid period expires)
    let canceledSubscription;
    try {
      canceledSubscription = await stripe.subscriptions.update(
        subscription.stripe_subscription_id,
        {
          cancel_at_period_end: true
        }
      );
      console.log('✅ Stripe subscription cancelled at period end');
      console.log('📋 Stripe response:', {
        id: canceledSubscription.id,
        status: canceledSubscription.status,
        cancel_at_period_end: canceledSubscription.cancel_at_period_end,
        current_period_end: canceledSubscription.current_period_end
      });
    } catch (stripeError) {
      console.error('❌ Stripe API error:', stripeError);
      console.error('Error type:', stripeError.type);
      console.error('Error code:', stripeError.code);
      return res.status(500).json({ 
        error: 'Failed to cancel subscription in Stripe',
        details: stripeError.message,
        stripeCode: stripeError.code,
        subscriptionId: subscription.stripe_subscription_id
      });
    }

    // Update subscription status in database
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({
        status: 'canceling', // Special status to indicate it will cancel at period end
        cancel_at_period_end: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', subscription.id);

    if (updateError) {
      console.error('❌ Error updating subscription in database:', updateError);
      // Don't fail the request - Stripe cancellation succeeded
    }

    // Calculate access_until date
    const accessUntil = canceledSubscription.current_period_end 
      ? new Date(canceledSubscription.current_period_end * 1000).toISOString()
      : subscription.current_period_end; // Fallback to database value

    console.log('✅ Cancellation successful. Access until:', accessUntil);

    return res.status(200).json({ 
      success: true, 
      message: 'Subscription will be cancelled at the end of your billing period',
      access_until: accessUntil
    });

  } catch (error) {
    console.error('❌ Error cancelling subscription:', error);
    return res.status(500).json({ 
      error: 'Failed to cancel subscription',
      details: error.message 
    });
  }
}

