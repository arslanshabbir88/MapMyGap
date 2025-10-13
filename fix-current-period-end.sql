-- Fix current_period_end for subscriptions
-- Run this in Supabase SQL Editor

-- First, let's see what subscriptions have NULL current_period_end
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
WHERE current_period_end IS NULL
ORDER BY created_at DESC;

-- To fix a specific subscription:
-- 1. Copy the stripe_subscription_id from above (e.g., 'sub_1SHPN82LOmx0fW2Y75jFdFFo')
-- 2. Go to Stripe Dashboard → Customers → Find your customer → Click subscription
-- 3. Look for "Current period ends" date
-- 4. Run this (replace the values):

-- UPDATE subscriptions
-- SET current_period_end = '2025-11-12T13:29:04.000Z'  -- Replace with date from Stripe (YYYY-MM-DDTHH:MM:SS.000Z format)
-- WHERE stripe_subscription_id = 'sub_1SHPN82LOmx0fW2Y75jFdFFo';  -- Your subscription ID

-- Example for your current subscription:
-- For sub_1SHPN82LOmx0fW2Y75jFdFFo, if Stripe shows "Nov 12, 2025" then:
UPDATE subscriptions
SET current_period_end = '2025-11-12T13:29:04.000Z'
WHERE stripe_subscription_id = 'sub_1SHPN82LOmx0fW2Y75jFdFFo';

