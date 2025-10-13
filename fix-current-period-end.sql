-- Fix current_period_end for cancelled subscriptions
-- Run this in Supabase SQL Editor

-- First, let's see what we have
SELECT 
  id,
  user_id,
  plan_type,
  status,
  current_period_end,
  stripe_subscription_id,
  cancel_at_period_end,
  created_at
FROM subscriptions
WHERE status = 'canceling'
ORDER BY created_at DESC;

-- If current_period_end is NULL, you'll need to manually update it
-- Get the stripe_subscription_id from the query above, then go to Stripe Dashboard
-- to find the current_period_end date, then run:

-- UPDATE subscriptions
-- SET current_period_end = '2025-XX-XX'  -- Replace with the actual date from Stripe
-- WHERE stripe_subscription_id = 'sub_xxxxx';  -- Replace with your subscription ID

