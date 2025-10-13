// Fix all subscriptions missing current_period_end by fetching from Stripe
// Run this with: node fix-all-subscription-dates.js

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixAllSubscriptionDates() {
  console.log('🔧 Starting subscription date fix...\n');

  // Get all subscriptions with null current_period_end
  const { data: subscriptions, error } = await supabase
    .from('subscriptions')
    .select('*')
    .is('current_period_end', null)
    .in('status', ['active', 'canceling']);

  if (error) {
    console.error('❌ Error fetching subscriptions:', error);
    return;
  }

  if (!subscriptions || subscriptions.length === 0) {
    console.log('✅ No subscriptions need fixing!');
    return;
  }

  console.log(`📋 Found ${subscriptions.length} subscription(s) to fix:\n`);

  for (const sub of subscriptions) {
    try {
      console.log(`\n🔍 Processing: ${sub.stripe_subscription_id}`);
      console.log(`   Plan: ${sub.plan_type}`);
      console.log(`   Status: ${sub.status}`);

      // Fetch subscription from Stripe
      const stripeSub = await stripe.subscriptions.retrieve(sub.stripe_subscription_id);

      console.log(`   Stripe current_period_end:`, stripeSub.current_period_end);
      
      if (!stripeSub.current_period_end) {
        console.log(`   ⚠️  No current_period_end in Stripe either!`);
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
      } else {
        console.log(`   ✅ Updated successfully!`);
      }

    } catch (error) {
      console.error(`   ❌ Error processing ${sub.stripe_subscription_id}:`, error.message);
    }
  }

  console.log('\n\n🎉 Done! All subscriptions processed.');
}

// Run the fix
fixAllSubscriptionDates().catch(console.error);

