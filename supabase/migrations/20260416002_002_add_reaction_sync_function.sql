-- Add function to sync anonymous reactions to authenticated user on login

-- 1. Add column to track if reaction was migrated from anonymous
ALTER TABLE reactions 
ADD COLUMN IF NOT EXISTS migrated_from_anonymous TEXT;

-- 2. Create function to sync anonymous reactions when user authenticates
CREATE OR REPLACE FUNCTION sync_anonymous_reactions(
  p_user_id UUID,
  p_anonymous_id TEXT
)
RETURNS INTEGER AS $$
DECLARE
  v_migrated_count INTEGER := 0;
  v_reaction RECORD;
BEGIN
  -- Check if anonymous_id is provided
  IF p_anonymous_id IS NULL OR p_anonymous_id = '' THEN
    RETURN 0;
  END IF;
  
  -- For each anonymous reaction, try to migrate to user
  FOR v_reaction IN 
    SELECT page_type, entity_id, reaction_type, created_at
    FROM reactions
    WHERE anonymous_id = p_anonymous_id
  LOOP
    -- Check if user already has a reaction for this entity
    IF NOT EXISTS (
      SELECT 1 FROM reactions
      WHERE user_id = p_user_id
        AND page_type = v_reaction.page_type
        AND entity_id = v_reaction.entity_id
        AND reaction_type = v_reaction.reaction_type
    ) THEN
      -- Migrate the reaction
      UPDATE reactions
      SET 
        user_id = p_user_id,
        anonymous_id = NULL,
        migrated_from_anonymous = p_anonymous_id
      WHERE anonymous_id = p_anonymous_id
        AND page_type = v_reaction.page_type
        AND entity_id = v_reaction.entity_id
        AND reaction_type = v_reaction.reaction_type;
      
      v_migrated_count := v_migrated_count + 1;
    ELSE
      -- User already has a reaction, delete the anonymous one
      DELETE FROM reactions
      WHERE anonymous_id = p_anonymous_id
        AND page_type = v_reaction.page_type
        AND entity_id = v_reaction.entity_id
        AND reaction_type = v_reaction.reaction_type;
    END IF;
  END LOOP;
  
  RETURN v_migrated_count;
END;
$$ LANGUAGE plpgsql;

-- 3. Create RPC function callable from client
CREATE OR REPLACE FUNCTION sync_anonymous_reactions_rpc(p_anonymous_id TEXT)
RETURNS INTEGER AS $$
DECLARE
  v_migrated_count INTEGER;
BEGIN
  -- Sync reactions for the current authenticated user
  v_migrated_count := sync_anonymous_reactions(auth.uid(), p_anonymous_id);
  RETURN v_migrated_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Grant execute permission on RPC function
GRANT EXECUTE ON FUNCTION sync_anonymous_reactions_rpc(TEXT) TO authenticated;
