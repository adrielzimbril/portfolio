-- Add 'talk' to page_type CHECK constraint in reactions table

-- First, drop the existing constraint
ALTER TABLE reactions DROP CONSTRAINT IF EXISTS reactions_page_type_check;

-- Then, recreate the constraint with 'talk' included
ALTER TABLE reactions 
ADD CONSTRAINT reactions_page_type_check 
CHECK (page_type IN ('thoughts', 'projects', 'connections', 'quests', 'hub', 'changelog', 'talk'));
