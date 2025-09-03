import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user_id } = req.query;
    
    if (!user_id) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Get user's subscription
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (subError || !subscription) {
      return res.status(404).json({ error: 'No active subscription found' });
    }

    // Check if runs need to be reset (monthly for paid plans, 14 days for trial)
    const now = new Date();
    const resetDate = new Date(subscription.runs_reset_date);
    
    if (now > resetDate) {
      // Reset runs for new period
      const isTrial = subscription.plan === 'trial';
      const newResetDate = isTrial 
        ? new Date(now.getTime() + (14 * 24 * 60 * 60 * 1000)) // 14 days from now
        : new Date(now.getFullYear(), now.getMonth() + 1, 1); // First day of next month
      
      await supabase
        .from('subscriptions')
        .update({ 
          runs_used: 0,
          control_text_used: 0,
          runs_reset_date: newResetDate.toISOString(),
          control_text_reset_date: newResetDate.toISOString()
        })
        .eq('id', subscription.id);
      
      subscription.runs_used = 0;
      subscription.control_text_used = 0;
    }

    // Get tier limits based on user's exact specifications
    const tierLimits = {
      trial: { 
        runs: 3, 
        characters: 1000, 
        control_text: 1000,
        control_text_enabled: true
      },
      starter: { 
        runs: 5, 
        characters: 1000, 
        control_text: 0,
        control_text_enabled: false
      },
      professional: { 
        runs: 25, 
        characters: 1000, 
        control_text: -1, // unlimited
        control_text_enabled: true
      },
      enterprise: { 
        runs: -1, // unlimited
        characters: -1, // unlimited
        control_text: -1, // unlimited
        control_text_enabled: true
      }
    };

    const limits = tierLimits[subscription.plan_type?.toLowerCase()] || tierLimits.trial;
    
    return res.status(200).json({
      success: true,
      usage: {
        runs_used: subscription.runs_used,
        runs_limit: limits.runs,
        runs_remaining: limits.runs === -1 ? -1 : Math.max(0, limits.runs - subscription.runs_used),
        character_limit: limits.characters,
        control_text_used: subscription.control_text_used || 0,
        control_text_limit: limits.control_text,
        control_text_remaining: limits.control_text === -1 ? -1 : Math.max(0, limits.control_text - (subscription.control_text_used || 0)),
        control_text_enabled: limits.control_text_enabled,
        plan: subscription.plan_type?.toLowerCase() || 'trial',
        reset_date: subscription.runs_reset_date,
        subscription_id: subscription.id
      }
    });

  } catch (error) {
    console.error('Usage check error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
