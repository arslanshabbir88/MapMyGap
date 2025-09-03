-- Usage Tracking Setup for MapMyGap
-- This script adds usage tracking columns and tables to support tier limits

-- Add usage tracking columns to subscriptions table
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS runs_used INTEGER DEFAULT 0;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS runs_reset_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS last_analysis_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS control_text_used INTEGER DEFAULT 0;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS control_text_reset_date TIMESTAMP WITH TIME ZONE;

-- Create usage_logs table for detailed tracking (FIXED: using INTEGER for subscription_id)
CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id INTEGER REFERENCES subscriptions(id) ON DELETE CASCADE, -- FIXED: INTEGER instead of UUID
  analysis_type VARCHAR(50) NOT NULL, -- 'comprehensive', 'quick', etc.
  document_size INTEGER NOT NULL, -- character count
  control_text_size INTEGER DEFAULT 0, -- character count for control text generation
  framework VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for usage_logs
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own usage logs" ON usage_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage logs" ON usage_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_subscription_id ON usage_logs(subscription_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_created_at ON usage_logs(created_at);

-- Update existing subscriptions to set initial reset dates
UPDATE subscriptions 
SET 
  runs_reset_date = CASE 
    WHEN plan = 'trial' THEN NOW() + INTERVAL '14 days'
    ELSE date_trunc('month', NOW()) + INTERVAL '1 month'
  END,
  control_text_reset_date = CASE 
    WHEN plan = 'trial' THEN NOW() + INTERVAL '14 days'
    ELSE date_trunc('month', NOW()) + INTERVAL '1 month'
  END
WHERE runs_reset_date IS NULL OR control_text_reset_date IS NULL;
