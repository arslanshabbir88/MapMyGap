// Quick script to reset usage for a specific user
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function resetUserUsage(userId) {
  try {
    console.log(`🔄 Resetting usage for user: ${userId}`);
    
    // Reset usage to 0 and update reset dates
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        runs_used: 0,
        control_text_used: 0,
        runs_reset_date: new Date().toISOString(),
        control_text_reset_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select();
    
    if (error) {
      console.error('❌ Error resetting usage:', error);
      return;
    }
    
    if (data && data.length > 0) {
      console.log('✅ Usage reset successfully:', {
        userId: userId,
        runs_used: data[0].runs_used,
        control_text_used: data[0].control_text_used,
        plan_type: data[0].plan_type,
        reset_date: data[0].runs_reset_date
      });
    } else {
      console.log('⚠️ No subscription found for user:', userId);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Get user ID from command line argument
const userId = process.argv[2];
if (!userId) {
  console.error('Usage: node reset-usage.js <user_id>');
  console.error('Example: node reset-usage.js 6591e93c-2c74-4800-a492-0bb7dcfd1a3e');
  process.exit(1);
}

resetUserUsage(userId);
