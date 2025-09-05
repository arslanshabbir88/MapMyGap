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

    // Get tier limits based on user's exact specifications (same as check-usage.js)
    const tierLimits = {
      trial: { 
        runs: 3, 
        characters: 1000, 
        control_text: 1000,
        control_text_enabled: true
      },
      starter: { 
        runs: 5, 
        characters: -1, // unlimited
        control_text: 0,
        control_text_enabled: false
      },
      professional: { 
        runs: 25, 
        characters: -1, // unlimited
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

    // Check if user has reached limits
    if (subscription.runs_used >= limits.runs && limits.runs !== -1) {
      return res.status(400).json({ error: 'Analysis limit reached' });
    }

    if (subscription.control_text_used + controlTextLength > limits.control_text && limits.control_text !== -1) {
      return res.status(400).json({ error: 'Control text limit reached' });
    }

    // Update usage
    const updates = {
      runs_used: subscription.runs_used + 1
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
        analysis_type: 'analysis',
        document_length: documentLength,
        document_size: documentLength, // Add document_size field
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
      plan: subscription.plan_type?.toLowerCase() || 'trial',
      runs_remaining: limits.runs === -1 ? -1 : limits.runs - (subscription.runs_used + 1),
      runs_used: subscription.runs_used + 1,
      runs_limit: limits.runs,
      character_limit: limits.characters,
      control_text_enabled: limits.control_text_enabled,
      control_text_remaining: limits.control_text === -1 ? -1 : limits.control_text - (subscription.control_text_used + controlTextLength),
      control_text_used: subscription.control_text_used + controlTextLength,
      control_text_limit: limits.control_text,
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
