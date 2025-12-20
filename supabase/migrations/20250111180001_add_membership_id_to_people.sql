-- Add membership_id foreign key to people table
ALTER TABLE people
ADD COLUMN IF NOT EXISTS membership_id UUID REFERENCES memberships(id) ON DELETE SET NULL;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_people_membership_id ON people(membership_id);


