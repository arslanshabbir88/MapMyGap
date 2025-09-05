-- Add missing columns to usage_logs table
ALTER TABLE usage_logs ADD COLUMN IF NOT EXISTS action TEXT;
ALTER TABLE usage_logs ADD COLUMN IF NOT EXISTS subscription_id UUID;
ALTER TABLE usage_logs ADD COLUMN IF NOT EXISTS document_length INTEGER;
ALTER TABLE usage_logs ADD COLUMN IF NOT EXISTS control_text_length INTEGER;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_usage_logs_action ON usage_logs(action) WHERE action IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_usage_logs_subscription_id ON usage_logs(subscription_id) WHERE subscription_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON usage_logs(user_id) WHERE user_id IS NOT NULL;
