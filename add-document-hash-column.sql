-- Ensure document_content column exists for compressed content storage
ALTER TABLE analysis_history ADD COLUMN IF NOT EXISTS document_content TEXT;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_analysis_history_document_content ON analysis_history(document_content) WHERE document_content IS NOT NULL;
