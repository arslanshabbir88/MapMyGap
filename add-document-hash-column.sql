-- Add document_hash column to analysis_history table
ALTER TABLE analysis_history ADD COLUMN IF NOT EXISTS document_hash TEXT;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_analysis_history_document_hash ON analysis_history(document_hash) WHERE document_hash IS NOT NULL;

-- Remove the document_content column if it exists (it was causing row size issues)
ALTER TABLE analysis_history DROP COLUMN IF EXISTS document_content;
