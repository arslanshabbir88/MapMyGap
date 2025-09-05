-- Fix all missing columns in usage_logs table
ALTER TABLE usage_logs ADD COLUMN IF NOT EXISTS action TEXT;
ALTER TABLE usage_logs ADD COLUMN IF NOT EXISTS subscription_id BIGINT;
ALTER TABLE usage_logs ADD COLUMN IF NOT EXISTS document_length INTEGER;
ALTER TABLE usage_logs ADD COLUMN IF NOT EXISTS document_size INTEGER;
ALTER TABLE usage_logs ADD COLUMN IF NOT EXISTS control_text_length INTEGER;
ALTER TABLE usage_logs ADD COLUMN IF NOT EXISTS analysis_type TEXT;

-- Update existing rows to have default values
UPDATE usage_logs SET action = 'analysis' WHERE action IS NULL;
UPDATE usage_logs SET analysis_type = 'analysis' WHERE analysis_type IS NULL;
UPDATE usage_logs SET document_length = 0 WHERE document_length IS NULL;
UPDATE usage_logs SET document_size = 0 WHERE document_size IS NULL;
UPDATE usage_logs SET control_text_length = 0 WHERE control_text_length IS NULL;

-- Add NOT NULL constraints
ALTER TABLE usage_logs ALTER COLUMN action SET NOT NULL;
ALTER TABLE usage_logs ALTER COLUMN analysis_type SET NOT NULL;
ALTER TABLE usage_logs ALTER COLUMN document_length SET NOT NULL;
ALTER TABLE usage_logs ALTER COLUMN document_size SET NOT NULL;
ALTER TABLE usage_logs ALTER COLUMN control_text_length SET NOT NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_usage_logs_action ON usage_logs(action) WHERE action IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_usage_logs_subscription_id ON usage_logs(subscription_id) WHERE subscription_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON usage_logs(user_id) WHERE user_id IS NOT NULL;
