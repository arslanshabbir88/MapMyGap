import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

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
      return res.status(400).json({ error: 'User ID required' });
    }

    console.log('🔧 Fixing subscription dates for user:', userId);

    // Get user's subscription from database
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (subError || !subscription) {
      return res.status(404).json({ error: 'No active subscription found' });
    }

    console.log('🔍 Found subscription:', subscription.stripe_subscription_id);

    // Fetch current subscription data from Stripe
    const stripeSubscription = await stripe.subscriptions.retrieve(subscription.stripe_subscription_id);
    
    console.log('🔍 Stripe subscription data:', {
      id: stripeSubscription.id,
      current_period_end: stripeSubscription.current_period_end,
      current_period_start: stripeSubscription.current_period_start,
      status: stripeSubscription.status,
      type: typeof stripeSubscription.current_period_end
    });

    // Handle case where subscription has no current_period_end (one-time payments, etc.)
    let currentPeriodEndDate;
    
    if (!stripeSubscription.current_period_end) {
      console.log('⚠️ Stripe subscription has no current_period_end, using fallback');
      
      // For Enterprise plans without recurring billing, set expiration to 1 year from now
      if (subscription.plan_type === 'Enterprise') {
        currentPeriodEndDate = new Date();
        currentPeriodEndDate.setFullYear(currentPeriodEndDate.getFullYear() + 1);
        console.log('🔧 Using 1-year fallback for Enterprise plan:', currentPeriodEndDate.toISOString());
      } else {
        console.error('❌ Cannot determine expiration date for non-Enterprise plan');
        return res.status(400).json({ error: 'Cannot determine subscription expiration date' });
      }
    } else {
      // Convert Unix timestamp to ISO string
      currentPeriodEndDate = new Date(stripeSubscription.current_period_end * 1000);
      
      // Validate the date
      if (isNaN(currentPeriodEndDate.getTime())) {
        console.error('❌ Invalid date conversion:', stripeSubscription.current_period_end);
        return res.status(400).json({ error: 'Invalid date from Stripe subscription' });
      }
      
      console.log('🔍 Converted date:', currentPeriodEndDate.toISOString());
    }

    // Update the database with the correct current_period_end
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({
        current_period_end: currentPeriodEndDate.toISOString(),
        status: stripeSubscription.status,
        updated_at: new Date().toISOString()
      })
      .eq('id', subscription.id);

    if (updateError) {
      console.error('❌ Error updating subscription:', updateError);
      return res.status(500).json({ error: 'Failed to update subscription' });
    }

    console.log('✅ Successfully updated subscription dates');

    res.status(200).json({ 
      success: true, 
      message: 'Subscription dates updated successfully',
      current_period_end: currentPeriodEndDate.toISOString()
    });

  } catch (error) {
    console.error('Error fixing subscription dates:', error);
    res.status(500).json({ error: 'Failed to fix subscription dates', details: error.message });
  }
}
