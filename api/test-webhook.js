import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Testing Supabase connection...');
    
    // Test 1: Check if we can connect
    console.log('Environment check:', {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      supabaseUrl: process.env.SUPABASE_URL?.substring(0, 20) + '...',
    });

    // Test 2: Try to query the subscriptions table
    const { data, error } = await supabase
      .from('subscriptions')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Supabase query error:', error);
      return res.status(500).json({ 
        error: 'Supabase query failed', 
        details: error.message,
        code: error.code 
      });
    }

    console.log('Supabase connection successful!');
    console.log('Subscriptions table accessible, count:', data?.length || 0);

    // Test 3: Try to insert a test record (then delete it)
    const testRecord = {
      user_id: '00000000-0000-0000-0000-000000000000', // dummy UUID
      stripe_subscription_id: 'test_sub_' + Date.now(),
      stripe_customer_id: 'test_cust_' + Date.now(),
      plan_type: 'Test',
      status: 'test',
      current_period_end: new Date().toISOString()
    };

    const { data: insertData, error: insertError } = await supabase
      .from('subscriptions')
      .insert(testRecord);

    if (insertError) {
      console.error('Insert test failed:', insertError);
      return res.status(500).json({ 
        error: 'Insert test failed', 
        details: insertError.message,
        code: insertError.code 
      });
    }

    console.log('Insert test successful!');

    // Clean up test record
    const { error: deleteError } = await supabase
      .from('subscriptions')
      .delete()
      .eq('stripe_subscription_id', testRecord.stripe_subscription_id);

    if (deleteError) {
      console.error('Cleanup failed:', deleteError);
    } else {
      console.log('Cleanup successful!');
    }

    res.status(200).json({ 
      success: true, 
      message: 'Supabase connection and table access working!',
      canQuery: true,
      canInsert: true,
      canDelete: true
    });

  } catch (error) {
    console.error('Test failed:', error);
    res.status(500).json({ 
      error: 'Test failed', 
      details: error.message 
    });
  }
}
