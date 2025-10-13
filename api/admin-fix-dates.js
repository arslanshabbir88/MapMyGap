import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // Allow both GET and POST for easy browser access
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔧 Starting subscription date fix...');

    // Get all subscriptions with null current_period_end
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*')
      .is('current_period_end', null)
      .in('status', ['active', 'canceling']);

    if (error) {
      console.error('❌ Error fetching subscriptions:', error);
      return res.status(500).json({ error: 'Failed to fetch subscriptions' });
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log('✅ No subscriptions need fixing!');
      return res.status(200).json({ message: 'No subscriptions need fixing', fixed: 0 });
    }

    console.log(`📋 Found ${subscriptions.length} subscription(s) to fix`);

    const results = [];

    for (const sub of subscriptions) {
      try {
        console.log(`🔍 Processing: ${sub.stripe_subscription_id}`);

        // Fetch subscription from Stripe
        const stripeSub = await stripe.subscriptions.retrieve(sub.stripe_subscription_id);

        console.log(`   Stripe current_period_end:`, stripeSub.current_period_end);
        
        if (!stripeSub.current_period_end) {
          console.log(`   ⚠️ No current_period_end in Stripe either!`);
          results.push({
            subscription_id: sub.stripe_subscription_id,
            status: 'skipped',
            reason: 'No current_period_end in Stripe'
          });
          continue;
        }

        // Convert Unix timestamp to ISO string
        const currentPeriodEnd = new Date(stripeSub.current_period_end * 1000).toISOString();
        console.log(`   Converted date:`, currentPeriodEnd);

        // Update in Supabase
        const { error: updateError } = await supabase
          .from('subscriptions')
          .update({
            current_period_end: currentPeriodEnd,
            status: stripeSub.status, // Also sync status in case it changed
            updated_at: new Date().toISOString()
          })
          .eq('id', sub.id);

        if (updateError) {
          console.error(`   ❌ Error updating:`, updateError);
          results.push({
            subscription_id: sub.stripe_subscription_id,
            status: 'error',
            error: updateError.message
          });
        } else {
          console.log(`   ✅ Updated successfully to:`, currentPeriodEnd);
          results.push({
            subscription_id: sub.stripe_subscription_id,
            status: 'success',
            current_period_end: currentPeriodEnd
          });
        }

      } catch (error) {
        console.error(`   ❌ Error processing ${sub.stripe_subscription_id}:`, error.message);
        results.push({
          subscription_id: sub.stripe_subscription_id,
          status: 'error',
          error: error.message
        });
      }
    }

    console.log('🎉 Done! All subscriptions processed.');

    const successCount = results.filter(r => r.status === 'success').length;
    return res.status(200).json({ 
      message: 'Subscription dates fixed', 
      fixed: successCount,
      total: subscriptions.length,
      results: results
    });

  } catch (error) {
    console.error('❌ Error in admin-fix-dates:', error);
    return res.status(500).json({ 
      error: 'Failed to fix subscription dates',
      details: error.message 
    });
  }
}

