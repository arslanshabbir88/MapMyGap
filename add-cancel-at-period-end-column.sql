-- Add cancel_at_period_end column to subscriptions table
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS cancel_at_period_end BOOLEAN DEFAULT FALSE;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_cancel_at_period_end ON subscriptions(cancel_at_period_end);

