import { createClient } from '@supabase/supabase-js';

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
      return res.status(400).json({ error: 'User ID is required' });
    }

    console.log('🆕 Creating trial subscription for new user:', userId);

    // Check if user already has a subscription
    const { data: existingSubscription, error: checkError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (existingSubscription) {
      console.log('✅ User already has a subscription:', existingSubscription.plan_type);
      return res.status(200).json({ 
        subscription: existingSubscription,
        message: 'User already has a subscription'
      });
    }

    // Create a new trial subscription
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 14); // 14 days from now

    const resetDate = new Date();
    resetDate.setDate(resetDate.getDate() + 14); // Reset 14 days from now

    const newSubscription = {
      user_id: userId,
      stripe_subscription_id: `trial_${userId}_${Date.now()}`, // Unique identifier for trial
      stripe_customer_id: `trial_customer_${userId}`, // Placeholder customer ID
      plan_type: 'trial',
      status: 'active',
      current_period_end: trialEndDate.toISOString(),
      runs_used: 0,
      control_text_used: 0,
      runs_reset_date: resetDate.toISOString(),
      control_text_reset_date: resetDate.toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: createdSubscription, error: insertError } = await supabase
      .from('subscriptions')
      .insert(newSubscription)
      .select()
      .single();

    if (insertError) {
      console.error('❌ Error creating trial subscription:', insertError);
      return res.status(500).json({ 
        error: 'Failed to create trial subscription',
        details: insertError.message 
      });
    }

    console.log('✅ Trial subscription created successfully:', createdSubscription);

    return res.status(200).json({ 
      subscription: createdSubscription,
      message: 'Trial subscription created successfully'
    });

  } catch (error) {
    console.error('❌ Error in create-trial-subscription:', error);
    return res.status(500).json({ 
      error: 'Failed to create trial subscription',
      details: error.message 
    });
  }
}

