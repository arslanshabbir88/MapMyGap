-- Add missing analysis_type column to usage_logs table
ALTER TABLE usage_logs ADD COLUMN IF NOT EXISTS analysis_type TEXT;

-- Update existing rows to have a default value
UPDATE usage_logs SET analysis_type = 'analysis' WHERE analysis_type IS NULL;

-- Add NOT NULL constraint if it doesn't exist
ALTER TABLE usage_logs ALTER COLUMN analysis_type SET NOT NULL;
