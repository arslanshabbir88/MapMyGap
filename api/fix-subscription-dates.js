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

    console.log('🔍 Found subscription in database:', subscription.stripe_subscription_id);
    console.log('🔍 Customer ID:', subscription.stripe_customer_id);

    // Fetch ALL subscriptions for this customer from Stripe
    const stripeSubscriptions = await stripe.subscriptions.list({
      customer: subscription.stripe_customer_id,
      status: 'all', // Get all subscriptions, not just active ones
      limit: 10
    });

    console.log('🔍 All Stripe subscriptions for customer:', stripeSubscriptions.data.length);
    stripeSubscriptions.data.forEach((sub, index) => {
      console.log(`  ${index + 1}. ID: ${sub.id}, Status: ${sub.status}, Created: ${new Date(sub.created * 1000).toISOString()}`);
    });

    // Find the active subscription
    const activeStripeSubscription = stripeSubscriptions.data.find(sub => sub.status === 'active');
    
    if (!activeStripeSubscription) {
      console.log('❌ No active subscription found in Stripe');
      return res.status(404).json({ error: 'No active subscription found in Stripe' });
    }

    console.log('✅ Found active Stripe subscription:', activeStripeSubscription.id);
    
    // Use the active subscription from Stripe
    const stripeSubscription = activeStripeSubscription;
    
    console.log('🔍 Stripe subscription data:', {
      id: stripeSubscription.id,
      current_period_end: stripeSubscription.current_period_end,
      current_period_start: stripeSubscription.current_period_start,
      billing_cycle_anchor: stripeSubscription.billing_cycle_anchor,
      created: stripeSubscription.created,
      status: stripeSubscription.status,
      interval: stripeSubscription.items?.data?.[0]?.price?.recurring?.interval
    });

    // Additional debugging for date analysis
    console.log('🔍 Date Analysis:');
    console.log('  - Current time:', new Date().toISOString());
    console.log('  - Current period end timestamp:', stripeSubscription.current_period_end);
    console.log('  - Type of current_period_end:', typeof stripeSubscription.current_period_end);
    
    // Safe date conversion with error handling
    let currentPeriodEndDate;
    try {
      if (stripeSubscription.current_period_end) {
        currentPeriodEndDate = new Date(stripeSubscription.current_period_end * 1000);
        console.log('  - Current period end date:', currentPeriodEndDate.toISOString());
        console.log('  - Is current_period_end in the past?', currentPeriodEndDate < new Date());
        console.log('  - Days until expiration:', Math.ceil((currentPeriodEndDate - new Date()) / (1000 * 60 * 60 * 24)));
      } else {
        console.log('  - No current_period_end available');
      }
    } catch (error) {
      console.error('❌ Error in date analysis:', error);
      console.log('  - Raw current_period_end value:', stripeSubscription.current_period_end);
    }

    // Check if subscription appears expired but is still active
    let isExpired = false;
    if (currentPeriodEndDate && !isNaN(currentPeriodEndDate.getTime())) {
      isExpired = currentPeriodEndDate < new Date();
    }
    
    if (isExpired && stripeSubscription.status === 'active') {
      console.log('⚠️ WARNING: Subscription appears expired but is still active in Stripe!');
      console.log('  - Expiration date:', currentPeriodEndDate.toISOString());
      console.log('  - Current date:', new Date().toISOString());
      console.log('  - Stripe status:', stripeSubscription.status);
      console.log('  - This may indicate a billing issue or Stripe webhook problem');
    }

    // Determine the correct renewal date
    let finalPeriodEndDate;
    
    if (!stripeSubscription.current_period_end) {
      console.log('⚠️ Stripe subscription has no current_period_end, checking for alternative fields');
      
      // Check if we have billing_cycle_anchor or other date fields
      if (stripeSubscription.billing_cycle_anchor) {
        console.log('🔍 Found billing_cycle_anchor:', stripeSubscription.billing_cycle_anchor);
        finalPeriodEndDate = new Date(stripeSubscription.billing_cycle_anchor * 1000);
        
        // For monthly subscriptions, add 1 month to get the next billing date
        if (stripeSubscription.items?.data?.[0]?.price?.recurring?.interval === 'month') {
          finalPeriodEndDate.setMonth(finalPeriodEndDate.getMonth() + 1);
          console.log('🔧 Monthly subscription - adding 1 month to billing_cycle_anchor');
        }
        
        console.log('🔧 Using billing_cycle_anchor:', finalPeriodEndDate.toISOString());
      } else if (stripeSubscription.created) {
        console.log('🔍 Using created date + 1 month as fallback');
        finalPeriodEndDate = new Date(stripeSubscription.created * 1000);
        finalPeriodEndDate.setMonth(finalPeriodEndDate.getMonth() + 1);
        console.log('🔧 Using created + 1 month:', finalPeriodEndDate.toISOString());
      } else {
        console.error('❌ Cannot determine expiration date - no date fields available');
        return res.status(400).json({ error: 'Cannot determine subscription expiration date' });
      }
    } else {
      // Convert Unix timestamp to ISO string with error handling
      try {
        finalPeriodEndDate = new Date(stripeSubscription.current_period_end * 1000);
        
        // Validate the date
        if (isNaN(finalPeriodEndDate.getTime())) {
          console.error('❌ Invalid date conversion:', stripeSubscription.current_period_end);
          console.error('❌ Type of current_period_end:', typeof stripeSubscription.current_period_end);
          return res.status(400).json({ error: 'Invalid date from Stripe subscription' });
        }

        console.log('🔍 Converted date:', finalPeriodEndDate.toISOString());
      } catch (error) {
        console.error('❌ Error converting date:', error);
        console.error('❌ Raw current_period_end:', stripeSubscription.current_period_end);
        return res.status(400).json({ error: 'Failed to convert Stripe date', details: error.message });
      }
    }

    // Update the database with the correct current_period_end and subscription ID
    const updateData = {
      current_period_end: finalPeriodEndDate.toISOString(),
      status: stripeSubscription.status,
      updated_at: new Date().toISOString()
    };

    // If the Stripe subscription ID is different, update it too
    if (stripeSubscription.id !== subscription.stripe_subscription_id) {
      console.log('🔄 Updating subscription ID from', subscription.stripe_subscription_id, 'to', stripeSubscription.id);
      updateData.stripe_subscription_id = stripeSubscription.id;
    }

    const { error: updateError } = await supabase
      .from('subscriptions')
      .update(updateData)
      .eq('id', subscription.id);

    if (updateError) {
      console.error('❌ Error updating subscription:', updateError);
      return res.status(500).json({ error: 'Failed to update subscription' });
    }

    console.log('✅ Successfully updated subscription dates');

    res.status(200).json({ 
      success: true, 
      message: 'Subscription dates updated successfully',
      current_period_end: finalPeriodEndDate.toISOString()
    });

  } catch (error) {
    console.error('Error fixing subscription dates:', error);
    res.status(500).json({ error: 'Failed to fix subscription dates', details: error.message });
  }
}
