-- Add table_count column to restaurants table
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS table_count INTEGER NOT NULL DEFAULT 1;

-- Update existing restaurants to have at least 1 table
UPDATE restaurants SET table_count = 1 WHERE table_count IS NULL; 