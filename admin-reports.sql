-- ============================================
-- MAPMYGAP ADMIN REPORTS & ANALYTICS
-- Run these queries in Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. OVERVIEW DASHBOARD
-- ============================================

-- Quick overview of your business
SELECT 
  (SELECT COUNT(DISTINCT user_id) FROM subscriptions WHERE status IN ('active', 'canceling')) as active_users,
  (SELECT COUNT(*) FROM subscriptions WHERE status IN ('active', 'canceling')) as active_subscriptions,
  (SELECT COUNT(*) FROM subscriptions WHERE plan_type = 'Trial' AND status IN ('active', 'canceling')) as trial_users,
  (SELECT COUNT(*) FROM subscriptions WHERE plan_type = 'Starter' AND status IN ('active', 'canceling')) as starter_users,
  (SELECT COUNT(*) FROM subscriptions WHERE plan_type = 'Professional' AND status IN ('active', 'canceling')) as professional_users,
  (SELECT COUNT(*) FROM subscriptions WHERE plan_type = 'Enterprise' AND status IN ('active', 'canceling')) as enterprise_users,
  (SELECT COUNT(*) FROM usage_logs WHERE created_at > NOW() - INTERVAL '30 days') as analyses_last_30_days,
  (SELECT COUNT(*) FROM usage_logs WHERE created_at > NOW() - INTERVAL '7 days') as analyses_last_7_days;


-- ============================================
-- 2. USER ANALYTICS
-- ============================================

-- All users with their subscription details
SELECT 
  u.id as user_id,
  u.email,
  u.created_at as signup_date,
  s.plan_type,
  s.status,
  s.current_period_end,
  s.cancel_at_period_end,
  s.runs_used,
  s.control_text_used,
  CASE 
    WHEN s.current_period_end < NOW() THEN 'Expired'
    WHEN s.cancel_at_period_end = true THEN 'Canceling'
    WHEN s.status = 'active' THEN 'Active'
    ELSE s.status
  END as display_status
FROM auth.users u
LEFT JOIN subscriptions s ON s.user_id = u.id AND s.status IN ('active', 'canceling')
ORDER BY u.created_at DESC;


-- New signups by day (last 30 days)
SELECT 
  DATE(created_at) as signup_date,
  COUNT(*) as new_users
FROM auth.users
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY signup_date DESC;


-- ============================================
-- 3. SUBSCRIPTION ANALYTICS
-- ============================================

-- Subscription breakdown by plan type
SELECT 
  plan_type,
  status,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM subscriptions
WHERE status IN ('active', 'canceling')
GROUP BY plan_type, status
ORDER BY plan_type, status;


-- Subscriptions expiring soon (next 7 days)
SELECT 
  u.email,
  s.plan_type,
  s.status,
  s.current_period_end,
  s.cancel_at_period_end,
  DATE_PART('day', s.current_period_end - NOW()) as days_until_expiration
FROM subscriptions s
JOIN auth.users u ON u.id = s.user_id
WHERE s.current_period_end IS NOT NULL
  AND s.current_period_end BETWEEN NOW() AND NOW() + INTERVAL '7 days'
  AND s.status IN ('active', 'canceling')
ORDER BY s.current_period_end ASC;


-- Cancelled subscriptions (last 30 days)
SELECT 
  u.email,
  s.plan_type,
  s.current_period_end as access_until,
  s.updated_at as cancelled_date,
  DATE_PART('day', s.current_period_end - NOW()) as days_remaining
FROM subscriptions s
JOIN auth.users u ON u.id = s.user_id
WHERE s.cancel_at_period_end = true
  AND s.updated_at > NOW() - INTERVAL '30 days'
ORDER BY s.updated_at DESC;


-- Conversion: Trial to Paid
SELECT 
  COUNT(DISTINCT CASE WHEN plan_type = 'Trial' THEN user_id END) as trial_users,
  COUNT(DISTINCT CASE WHEN plan_type IN ('Starter', 'Professional', 'Enterprise') THEN user_id END) as paid_users,
  ROUND(
    COUNT(DISTINCT CASE WHEN plan_type IN ('Starter', 'Professional', 'Enterprise') THEN user_id END) * 100.0 / 
    NULLIF(COUNT(DISTINCT user_id), 0), 
    2
  ) as conversion_rate_percent
FROM subscriptions
WHERE created_at > NOW() - INTERVAL '90 days';


-- ============================================
-- 4. USAGE ANALYTICS
-- ============================================

-- Analysis usage by plan type (last 30 days)
SELECT 
  s.plan_type,
  COUNT(u.id) as total_analyses,
  COUNT(DISTINCT u.user_id) as unique_users,
  ROUND(COUNT(u.id)::numeric / NULLIF(COUNT(DISTINCT u.user_id), 0), 2) as avg_analyses_per_user
FROM usage_logs u
JOIN subscriptions s ON s.user_id = u.user_id
WHERE u.created_at > NOW() - INTERVAL '30 days'
  AND u.action = 'analysis'
GROUP BY s.plan_type
ORDER BY total_analyses DESC;


-- Daily analysis volume (last 30 days)
SELECT 
  DATE(created_at) as analysis_date,
  COUNT(*) as total_analyses,
  COUNT(DISTINCT user_id) as unique_users
FROM usage_logs
WHERE action = 'analysis'
  AND created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY analysis_date DESC;


-- Top users by analysis count (last 30 days)
SELECT 
  u.email,
  s.plan_type,
  COUNT(ul.id) as total_analyses,
  MAX(ul.created_at) as last_analysis_date
FROM usage_logs ul
JOIN auth.users u ON u.id = ul.user_id
LEFT JOIN subscriptions s ON s.user_id = ul.user_id AND s.status IN ('active', 'canceling')
WHERE ul.action = 'analysis'
  AND ul.created_at > NOW() - INTERVAL '30 days'
GROUP BY u.email, s.plan_type
ORDER BY total_analyses DESC
LIMIT 20;


-- Control text generation usage (last 30 days)
SELECT 
  s.plan_type,
  COUNT(u.id) as total_control_text_generations,
  COUNT(DISTINCT u.user_id) as unique_users,
  SUM(u.characters_used) as total_characters_used
FROM usage_logs u
JOIN subscriptions s ON s.user_id = u.user_id
WHERE u.created_at > NOW() - INTERVAL '30 days'
  AND u.action = 'control_text'
GROUP BY s.plan_type
ORDER BY total_control_text_generations DESC;


-- Users approaching their limits
SELECT 
  u.email,
  s.plan_type,
  s.runs_used,
  CASE 
    WHEN s.plan_type = 'Trial' THEN 3
    WHEN s.plan_type = 'Starter' THEN 10
    WHEN s.plan_type = 'Professional' THEN 50
    ELSE -1
  END as limit,
  CASE 
    WHEN s.plan_type = 'Trial' THEN ROUND((s.runs_used::numeric / 3) * 100, 2)
    WHEN s.plan_type = 'Starter' THEN ROUND((s.runs_used::numeric / 10) * 100, 2)
    WHEN s.plan_type = 'Professional' THEN ROUND((s.runs_used::numeric / 50) * 100, 2)
    ELSE 0
  END as usage_percentage
FROM subscriptions s
JOIN auth.users u ON u.id = s.user_id
WHERE s.status IN ('active', 'canceling')
  AND s.plan_type IN ('Trial', 'Starter', 'Professional')
  AND (
    (s.plan_type = 'Trial' AND s.runs_used >= 2) OR
    (s.plan_type = 'Starter' AND s.runs_used >= 8) OR
    (s.plan_type = 'Professional' AND s.runs_used >= 40)
  )
ORDER BY usage_percentage DESC;


-- ============================================
-- 5. REVENUE INSIGHTS (from Supabase data)
-- ============================================

-- Current MRR estimate by plan
SELECT 
  plan_type,
  COUNT(*) as active_subscriptions,
  CASE 
    WHEN plan_type = 'Starter' THEN COUNT(*) * 49
    WHEN plan_type = 'Professional' THEN COUNT(*) * 149
    WHEN plan_type = 'Enterprise' THEN COUNT(*) * 499
    ELSE 0
  END as estimated_mrr
FROM subscriptions
WHERE status = 'active' 
  AND cancel_at_period_end = false
  AND plan_type IN ('Starter', 'Professional', 'Enterprise')
GROUP BY plan_type
ORDER BY estimated_mrr DESC;


-- Churn analysis (subscriptions cancelled in last 30 days)
SELECT 
  DATE(updated_at) as cancellation_date,
  plan_type,
  COUNT(*) as cancellations
FROM subscriptions
WHERE cancel_at_period_end = true
  AND updated_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(updated_at), plan_type
ORDER BY cancellation_date DESC;


-- ============================================
-- 6. ENGAGEMENT METRICS
-- ============================================

-- User engagement: Last activity date
SELECT 
  u.email,
  s.plan_type,
  s.status,
  MAX(ul.created_at) as last_activity,
  DATE_PART('day', NOW() - MAX(ul.created_at)) as days_since_last_activity,
  COUNT(ul.id) as total_actions
FROM auth.users u
LEFT JOIN subscriptions s ON s.user_id = u.id AND s.status IN ('active', 'canceling')
LEFT JOIN usage_logs ul ON ul.user_id = u.id
WHERE s.id IS NOT NULL
GROUP BY u.email, s.plan_type, s.status
ORDER BY days_since_last_activity DESC;


-- Inactive users (have subscription but no activity in 7+ days)
SELECT 
  u.email,
  s.plan_type,
  s.status,
  s.current_period_end,
  s.created_at as subscription_start,
  MAX(ul.created_at) as last_activity,
  DATE_PART('day', NOW() - MAX(ul.created_at)) as days_inactive
FROM subscriptions s
JOIN auth.users u ON u.id = s.user_id
LEFT JOIN usage_logs ul ON ul.user_id = s.user_id
WHERE s.status IN ('active', 'canceling')
  AND s.plan_type IN ('Starter', 'Professional', 'Enterprise')
GROUP BY u.email, s.plan_type, s.status, s.current_period_end, s.created_at
HAVING MAX(ul.created_at) < NOW() - INTERVAL '7 days' OR MAX(ul.created_at) IS NULL
ORDER BY days_inactive DESC NULLS FIRST;


-- ============================================
-- 7. FRAMEWORK POPULARITY
-- ============================================

-- Most analyzed frameworks (requires analysis_results table with framework column)
-- Note: This will only work if you store framework selection in your database
-- For now, this is a placeholder - we don't currently track this
-- SELECT framework, COUNT(*) as analysis_count
-- FROM analysis_results
-- WHERE created_at > NOW() - INTERVAL '30 days'
-- GROUP BY framework
-- ORDER BY analysis_count DESC;


-- ============================================
-- 8. CUSTOMER SUPPORT QUERIES
-- ============================================

-- Find user by email
-- Replace 'user@example.com' with the actual email
SELECT 
  u.id as user_id,
  u.email,
  u.created_at as signup_date,
  s.plan_type,
  s.status,
  s.current_period_end,
  s.cancel_at_period_end,
  s.runs_used,
  s.control_text_used,
  s.stripe_customer_id,
  s.stripe_subscription_id
FROM auth.users u
LEFT JOIN subscriptions s ON s.user_id = u.id AND s.status IN ('active', 'canceling')
WHERE u.email = 'user@example.com';


-- Get user's recent activity
-- Replace 'USER_ID_HERE' with actual user ID
SELECT 
  action,
  characters_used,
  created_at,
  CASE 
    WHEN action = 'analysis' THEN 'Analysis Run'
    WHEN action = 'control_text' THEN 'Control Text Generated'
    ELSE action
  END as action_type
FROM usage_logs
WHERE user_id = 'USER_ID_HERE'
ORDER BY created_at DESC
LIMIT 50;


-- ============================================
-- 9. HEALTH CHECKS
-- ============================================

-- Subscriptions with missing or invalid data
SELECT 
  u.email,
  s.plan_type,
  s.status,
  s.current_period_end,
  s.stripe_subscription_id,
  s.stripe_customer_id,
  CASE 
    WHEN s.current_period_end IS NULL THEN 'Missing expiration date'
    WHEN s.current_period_end < NOW() AND s.status = 'active' THEN 'Expired but still active'
    WHEN s.stripe_subscription_id IS NULL THEN 'Missing Stripe subscription ID'
    WHEN s.stripe_customer_id IS NULL THEN 'Missing Stripe customer ID'
    ELSE 'Unknown issue'
  END as issue
FROM subscriptions s
JOIN auth.users u ON u.id = s.user_id
WHERE 
  s.current_period_end IS NULL OR
  (s.current_period_end < NOW() AND s.status = 'active') OR
  s.stripe_subscription_id IS NULL OR
  s.stripe_customer_id IS NULL
ORDER BY s.created_at DESC;


-- Users who signed up but never subscribed
SELECT 
  u.id,
  u.email,
  u.created_at as signup_date,
  DATE_PART('day', NOW() - u.created_at) as days_since_signup
FROM auth.users u
LEFT JOIN subscriptions s ON s.user_id = u.id
WHERE s.id IS NULL
ORDER BY u.created_at DESC;


-- ============================================
-- 10. GROWTH METRICS
-- ============================================

-- Weekly growth: New subscriptions by week
SELECT 
  DATE_TRUNC('week', created_at) as week,
  plan_type,
  COUNT(*) as new_subscriptions
FROM subscriptions
WHERE created_at > NOW() - INTERVAL '90 days'
  AND plan_type IN ('Trial', 'Starter', 'Professional', 'Enterprise')
GROUP BY DATE_TRUNC('week', created_at), plan_type
ORDER BY week DESC, plan_type;


-- Monthly Recurring Revenue (MRR) trend
SELECT 
  DATE_TRUNC('month', created_at) as month,
  SUM(
    CASE 
      WHEN plan_type = 'Starter' THEN 49
      WHEN plan_type = 'Professional' THEN 149
      WHEN plan_type = 'Enterprise' THEN 499
      ELSE 0
    END
  ) as new_mrr
FROM subscriptions
WHERE created_at > NOW() - INTERVAL '12 months'
  AND status IN ('active', 'canceling')
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;


-- ============================================
-- 11. USAGE PATTERNS
-- ============================================

-- Peak usage hours (when are users most active?)
SELECT 
  EXTRACT(HOUR FROM created_at) as hour_of_day,
  COUNT(*) as analysis_count,
  COUNT(DISTINCT user_id) as unique_users
FROM usage_logs
WHERE action = 'analysis'
  AND created_at > NOW() - INTERVAL '30 days'
GROUP BY EXTRACT(HOUR FROM created_at)
ORDER BY hour_of_day;


-- Average analyses per user by plan
SELECT 
  s.plan_type,
  COUNT(DISTINCT s.user_id) as total_users,
  COUNT(ul.id) as total_analyses,
  ROUND(COUNT(ul.id)::numeric / NULLIF(COUNT(DISTINCT s.user_id), 0), 2) as avg_analyses_per_user
FROM subscriptions s
LEFT JOIN usage_logs ul ON ul.user_id = s.user_id AND ul.action = 'analysis'
WHERE s.status IN ('active', 'canceling')
GROUP BY s.plan_type
ORDER BY s.plan_type;


-- ============================================
-- 12. ADMIN ACTIONS
-- ============================================

-- Add analysis credits to a user
-- UPDATE subscriptions
-- SET 
--   runs_used = GREATEST(0, runs_used - 5),  -- Add 5 analyses
--   updated_at = NOW()
-- WHERE user_id = (SELECT id FROM auth.users WHERE email = 'user@example.com')
-- RETURNING plan_type, runs_used;


-- Reset usage for a user (new billing period)
-- UPDATE subscriptions
-- SET 
--   runs_used = 0,
--   control_text_used = 0,
--   runs_reset_date = NOW(),
--   control_text_reset_date = NOW(),
--   updated_at = NOW()
-- WHERE user_id = (SELECT id FROM auth.users WHERE email = 'user@example.com')
-- RETURNING plan_type, runs_used, control_text_used;


-- Force update subscription expiration date
-- UPDATE subscriptions
-- SET current_period_end = '2025-12-31T23:59:59.000Z'
-- WHERE stripe_subscription_id = 'sub_xxxxx';


-- ============================================
-- 13. EXPORT DATA FOR EXTERNAL ANALYSIS
-- ============================================

-- Export user + subscription data for Excel/CSV
SELECT 
  u.email,
  u.created_at as signup_date,
  s.plan_type,
  s.status,
  s.current_period_end as expiration_date,
  s.cancel_at_period_end as is_cancelling,
  s.runs_used as analyses_used,
  s.control_text_used,
  s.stripe_customer_id,
  DATE_PART('day', NOW() - u.created_at) as account_age_days
FROM auth.users u
LEFT JOIN subscriptions s ON s.user_id = u.id AND s.status IN ('active', 'canceling')
ORDER BY u.created_at DESC;


-- Export usage logs for analysis
SELECT 
  ul.created_at,
  u.email,
  s.plan_type,
  ul.action,
  ul.characters_used
FROM usage_logs ul
JOIN auth.users u ON u.id = ul.user_id
LEFT JOIN subscriptions s ON s.user_id = ul.user_id AND s.status IN ('active', 'canceling')
WHERE ul.created_at > NOW() - INTERVAL '30 days'
ORDER BY ul.created_at DESC;


-- ============================================
-- USAGE INSTRUCTIONS:
-- ============================================
-- 1. Copy a query from above
-- 2. Go to Supabase Dashboard → SQL Editor
-- 3. Paste and run the query
-- 4. Click "Download as CSV" to export results
-- 5. Open in Excel/Google Sheets for analysis
-- ============================================

