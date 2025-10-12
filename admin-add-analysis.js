/**
 * ADMIN SCRIPT: Add Analysis Credits to User Account
 * 
 * Usage: node admin-add-analysis.js <user_email> <number_to_add>
 * Example: node admin-add-analysis.js user@example.com 1
 * 
 * This will REDUCE the runs_used count, effectively giving them more analyses.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Make sure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addAnalysisCredits(userEmail, creditsToAdd) {
  try {
    console.log(`\n🔍 Looking up user: ${userEmail}`);
    
    // Find user by email
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      console.error('❌ Error fetching users:', userError);
      return;
    }

    const user = users.users.find(u => u.email === userEmail);
    
    if (!user) {
      console.error(`❌ User not found: ${userEmail}`);
      console.log('\n💡 Available users:');
      users.users.forEach(u => console.log(`   - ${u.email} (${u.id})`));
      return;
    }

    console.log(`✅ User found: ${user.email} (ID: ${user.id})`);

    // Get user's subscription
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (subError || !subscription) {
      console.error('❌ No subscription found for user');
      return;
    }

    console.log(`\n📊 Current subscription:
   Plan: ${subscription.plan_type}
   Status: ${subscription.status}
   Runs Used: ${subscription.runs_used}
   Runs Reset Date: ${subscription.runs_reset_date}`);

    // Calculate tier limits
    const tierLimits = {
      trial: 3,
      starter: 5,
      professional: 25,
      enterprise: -1 // unlimited
    };

    const currentLimit = tierLimits[subscription.plan_type?.toLowerCase()] || 3;
    const currentUsed = subscription.runs_used || 0;
    const newUsed = Math.max(0, currentUsed - creditsToAdd);

    if (currentLimit === -1) {
      console.log('\n⚠️  User has UNLIMITED analyses (Enterprise plan)');
      console.log('No need to add credits - they already have unlimited access!');
      return;
    }

    console.log(`\n🔄 Adjusting analysis credits:
   Credits to Add: ${creditsToAdd}
   Current Used: ${currentUsed} / ${currentLimit}
   New Used: ${newUsed} / ${currentLimit}
   Available After: ${currentLimit - newUsed} analyses`);

    // Confirm the change
    console.log('\n⚠️  This will modify the user\'s subscription in the database.');
    
    // Update the subscription
    const { data: updatedSub, error: updateError } = await supabase
      .from('subscriptions')
      .update({
        runs_used: newUsed,
        updated_at: new Date().toISOString()
      })
      .eq('id', subscription.id)
      .select()
      .single();

    if (updateError) {
      console.error('❌ Error updating subscription:', updateError);
      return;
    }

    console.log(`\n✅ Successfully added ${creditsToAdd} analysis credit(s)!`);
    console.log(`\n📊 Updated subscription:
   Plan: ${updatedSub.plan_type}
   Runs Used: ${updatedSub.runs_used} / ${currentLimit}
   Available: ${currentLimit - updatedSub.runs_used} analyses remaining
   Next Reset: ${new Date(updatedSub.runs_reset_date).toLocaleDateString()}`);

    // Log the action
    const { error: logError } = await supabase
      .from('usage_logs')
      .insert({
        user_id: user.id,
        subscription_id: subscription.id,
        action: 'admin_credit_adjustment',
        analysis_type: 'admin_action',
        framework: 'N/A',
        document_length: 0,
        document_size: 0,
        control_text_length: creditsToAdd,
        created_at: new Date().toISOString()
      });

    if (!logError) {
      console.log('✅ Action logged in usage_logs table');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Parse command line arguments
const userEmail = process.argv[2];
const creditsToAdd = parseInt(process.argv[3]);

if (!userEmail || !creditsToAdd || isNaN(creditsToAdd) || creditsToAdd <= 0) {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║          ADMIN SCRIPT: Add Analysis Credits to User            ║
╚════════════════════════════════════════════════════════════════╝

Usage: node admin-add-analysis.js <user_email> <number_to_add>

Examples:
  node admin-add-analysis.js user@example.com 1
  node admin-add-analysis.js john@company.com 5

This script will:
  ✓ Find the user by email
  ✓ Check their current subscription and usage
  ✓ Reduce their runs_used count (giving them more analyses)
  ✓ Log the admin action for auditing

Notes:
  - Credits are added by reducing runs_used count
  - Cannot add credits to Enterprise (they have unlimited)
  - Action is logged in usage_logs table for tracking
  `);
  process.exit(1);
}

console.log(`
╔════════════════════════════════════════════════════════════════╗
║          ADMIN SCRIPT: Add Analysis Credits                    ║
╚════════════════════════════════════════════════════════════════╝
`);

addAnalysisCredits(userEmail, creditsToAdd)
  .then(() => {
    console.log('\n✅ Script completed successfully\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });

