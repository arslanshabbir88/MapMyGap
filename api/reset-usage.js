import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

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
      return res.status(500).json({ error: 'Failed to reset usage', details: error.message });
    }
    
    if (data && data.length > 0) {
      console.log('✅ Usage reset successfully:', {
        userId: userId,
        runs_used: data[0].runs_used,
        control_text_used: data[0].control_text_used,
        plan_type: data[0].plan_type,
        reset_date: data[0].runs_reset_date
      });
      
      return res.status(200).json({ 
        success: true, 
        message: 'Usage reset successfully',
        data: {
          userId: userId,
          runs_used: data[0].runs_used,
          control_text_used: data[0].control_text_used,
          plan_type: data[0].plan_type,
          reset_date: data[0].runs_reset_date
        }
      });
    } else {
      console.log('⚠️ No subscription found for user:', userId);
      return res.status(404).json({ error: 'No subscription found for user' });
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
