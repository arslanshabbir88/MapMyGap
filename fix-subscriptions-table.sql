-- Fix subscriptions table: Add unique constraint on user_id
-- Run this in your Supabase SQL editor

-- Add unique constraint on user_id column
ALTER TABLE subscriptions 
ADD CONSTRAINT subscriptions_user_id_unique 
UNIQUE (user_id);

-- Verify the constraint was added
SELECT 
    constraint_name,
    constraint_type,
    table_name
FROM information_schema.table_constraints 
WHERE table_name = 'subscriptions' 
AND constraint_type = 'UNIQUE';
