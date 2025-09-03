-- Add document_content column to analysis_history table
-- This allows Professional/Enterprise users to store document content for control text generation

ALTER TABLE analysis_history ADD COLUMN IF NOT EXISTS document_content TEXT;

-- Add index for better performance when querying by document_content
CREATE INDEX IF NOT EXISTS idx_analysis_history_document_content ON analysis_history(document_content) WHERE document_content IS NOT NULL;

-- Add comment to document the purpose of this column
COMMENT ON COLUMN analysis_history.document_content IS 'Stores original document content for Professional/Enterprise users to enable control text generation from historical analysis';
