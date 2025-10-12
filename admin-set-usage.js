/**
 * ADMIN SCRIPT: Set User's Analysis Usage Count
 * 
 * Usage: node admin-set-usage.js <user_email> <runs_used_count>
 * Example: node admin-set-usage.js user@example.com 0
 * 
 * This will SET the runs_used count to a specific number.
 * Use 0 to give them a "fresh start" with all their analyses available.
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

async function setUserUsage(userEmail, newRunsUsed) {
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

    if (currentLimit === -1) {
      console.log('\n⚠️  User has UNLIMITED analyses (Enterprise plan)');
      console.log('No need to modify usage - they already have unlimited access!');
      return;
    }

    console.log(`\n🔄 Setting usage count:
   Current Used: ${subscription.runs_used} / ${currentLimit}
   New Used: ${newRunsUsed} / ${currentLimit}
   Available After: ${currentLimit - newRunsUsed} analyses`);

    // Update the subscription
    const { data: updatedSub, error: updateError } = await supabase
      .from('subscriptions')
      .update({
        runs_used: newRunsUsed,
        updated_at: new Date().toISOString()
      })
      .eq('id', subscription.id)
      .select()
      .single();

    if (updateError) {
      console.error('❌ Error updating subscription:', updateError);
      return;
    }

    console.log(`\n✅ Successfully set usage to ${newRunsUsed}!`);
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
        action: 'admin_usage_reset',
        analysis_type: 'admin_action',
        framework: 'N/A',
        document_length: 0,
        document_size: 0,
        control_text_length: newRunsUsed,
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
const newRunsUsed = parseInt(process.argv[3]);

if (!userEmail || isNaN(newRunsUsed) || newRunsUsed < 0) {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║          ADMIN SCRIPT: Set User's Analysis Usage Count         ║
╚════════════════════════════════════════════════════════════════╝

Usage: node admin-set-usage.js <user_email> <runs_used_count>

Examples:
  node admin-set-usage.js user@example.com 0
    → Resets user to 0 used (gives them all their analyses back)
  
  node admin-set-usage.js user@example.com 2
    → Sets used count to 2 (Trial user would have 1 left out of 3)

Common Use Cases:
  ✓ User accidentally used an analysis: Set to (current - 1)
  ✓ Give user a "fresh start": Set to 0
  ✓ Manually adjust for billing issues: Set to specific number

Notes:
  - Sets runs_used to exact number you specify
  - Cannot modify Enterprise (they have unlimited)
  - Action is logged in usage_logs table for auditing
  - For Trial: 3 analyses total
  - For Starter: 5 analyses total
  - For Professional: 25 analyses total
  `);
  process.exit(1);
}

console.log(`
╔════════════════════════════════════════════════════════════════╗
║          ADMIN SCRIPT: Set Analysis Usage Count                ║
╚════════════════════════════════════════════════════════════════╝
`);

setUserUsage(userEmail, newRunsUsed)
  .then(() => {
    console.log('\n✅ Script completed successfully\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });

