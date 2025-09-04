-- Manual SQL to reset usage for user 6591e93c-2c74-4800-a492-0bb7dcfd1a3e
UPDATE subscriptions 
SET 
  runs_used = 0,
  control_text_used = 0,
  runs_reset_date = NOW(),
  control_text_reset_date = NOW(),
  updated_at = NOW()
WHERE user_id = '6591e93c-2c74-4800-a492-0bb7dcfd1a3e';

-- Check the result
SELECT 
  user_id,
  plan_type,
  runs_used,
  runs_limit,
  status,
  updated_at
FROM subscriptions 
WHERE user_id = '6591e93c-2c74-4800-a492-0bb7dcfd1a3e';
