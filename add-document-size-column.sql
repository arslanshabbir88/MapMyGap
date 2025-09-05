-- Add missing document_size column to usage_logs table
ALTER TABLE usage_logs ADD COLUMN IF NOT EXISTS document_size INTEGER;

-- Update existing rows to have a default value
UPDATE usage_logs SET document_size = 0 WHERE document_size IS NULL;

-- Add NOT NULL constraint if it doesn't exist
ALTER TABLE usage_logs ALTER COLUMN document_size SET NOT NULL;
