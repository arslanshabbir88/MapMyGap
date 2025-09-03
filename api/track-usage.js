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

  try {
    const { userId, documentLength, controlTextLength = 0 } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    console.log('📊 Tracking usage for user:', userId);
    console.log('📄 Document length:', documentLength);
    console.log('📝 Control text length:', controlTextLength);

    // Get current subscription
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (subError || !subscription) {
      console.error('❌ No active subscription found:', subError);
      return res.status(400).json({ error: 'No active subscription found' });
    }

    // Get subscription plan details
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', subscription.plan_id)
      .single();

    if (planError || !plan) {
      console.error('❌ Plan not found:', planError);
      return res.status(400).json({ error: 'Plan not found' });
    }

    // Check if user has reached limits
    if (subscription.runs_used >= plan.runs_limit && plan.runs_limit !== -1) {
      return res.status(400).json({ error: 'Analysis limit reached' });
    }

    if (subscription.control_text_used + controlTextLength > plan.control_text_limit && plan.control_text_limit !== -1) {
      return res.status(400).json({ error: 'Control text limit reached' });
    }

    // Update usage
    const updates = {
      runs_used: subscription.runs_used + 1,
      last_used: new Date().toISOString()
    };

    if (controlTextLength > 0) {
      updates.control_text_used = subscription.control_text_used + controlTextLength;
    }

    const { error: updateError } = await supabase
      .from('subscriptions')
      .update(updates)
      .eq('id', subscription.id);

    if (updateError) {
      console.error('❌ Failed to update subscription:', updateError);
      return res.status(500).json({ error: 'Failed to update usage' });
    }

    // Log usage
    const { error: logError } = await supabase
      .from('usage_logs')
      .insert({
        user_id: userId,
        subscription_id: subscription.id,
        action: 'analysis',
        document_length: documentLength,
        control_text_length: controlTextLength,
        created_at: new Date().toISOString()
      });

    if (logError) {
      console.error('❌ Failed to log usage:', logError);
      // Don't fail the request for logging errors
    }

    console.log('✅ Usage tracked successfully');

    // Return updated usage info
    const updatedUsage = {
      plan: plan.name.toLowerCase(),
      runs_remaining: plan.runs_limit === -1 ? -1 : plan.runs_limit - (subscription.runs_used + 1),
      runs_used: subscription.runs_used + 1,
      runs_limit: plan.runs_limit,
      character_limit: plan.character_limit,
      control_text_enabled: plan.control_text_limit > 0,
      control_text_remaining: plan.control_text_limit === -1 ? -1 : plan.control_text_limit - (subscription.control_text_used + controlTextLength),
      control_text_used: subscription.control_text_used + controlTextLength,
      control_text_limit: plan.control_text_limit,
      subscription_id: subscription.id
    };

    return res.status(200).json({ 
      success: true, 
      usage: updatedUsage 
    });

  } catch (error) {
    console.error('❌ Usage tracking error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
