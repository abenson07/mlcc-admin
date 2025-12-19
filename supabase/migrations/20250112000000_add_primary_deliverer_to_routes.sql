-- Add primary deliverer columns to routes table
ALTER TABLE routes
ADD COLUMN IF NOT EXISTS primary_deliverer_email TEXT,
ADD COLUMN IF NOT EXISTS primary_deliverer_id UUID REFERENCES people(id) ON DELETE SET NULL;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_routes_primary_deliverer_email ON routes(primary_deliverer_email);
CREATE INDEX IF NOT EXISTS idx_routes_primary_deliverer_id ON routes(primary_deliverer_id);

