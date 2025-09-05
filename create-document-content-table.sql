-- Create separate table for document content to avoid row size limits
CREATE TABLE IF NOT EXISTS document_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  analysis_id UUID REFERENCES analysis_history(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  content_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_document_content_analysis_id ON document_content(analysis_id);
CREATE INDEX IF NOT EXISTS idx_document_content_hash ON document_content(content_hash) WHERE content_hash IS NOT NULL;

-- Add document_content_id column to analysis_history table
ALTER TABLE analysis_history ADD COLUMN IF NOT EXISTS document_content_id UUID REFERENCES document_content(id);

-- Remove the document_content column from analysis_history to avoid size issues
ALTER TABLE analysis_history DROP COLUMN IF EXISTS document_content;
