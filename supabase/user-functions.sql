-- Function to get user profile with stats
CREATE OR REPLACE FUNCTION get_user_profile(user_uuid UUID)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  username TEXT,
  email TEXT,
  avatar_url TEXT,
  bio TEXT,
  date_of_birth DATE,
  created_at TIMESTAMPTZ,
  last_seen TIMESTAMPTZ,
  is_online BOOLEAN,
  message_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.full_name,
    u.username,
    u.email,
    u.avatar_url,
    u.bio,
    u.date_of_birth,
    u.created_at,
    u.last_seen,
    u.is_online,
    COUNT(m.id) as message_count
  FROM public.users u
  LEFT JOIN messages m ON u.id = m.user_id
  WHERE u.id = user_uuid
  GROUP BY u.id, u.full_name, u.username, u.email, u.avatar_url, u.bio, u.date_of_birth, u.created_at, u.last_seen, u.is_online;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user online status
CREATE OR REPLACE FUNCTION update_user_online_status(user_uuid UUID, online_status BOOLEAN)
RETURNS VOID AS $$
BEGIN
  UPDATE public.users 
  SET 
    is_online = online_status,
    last_seen = CASE WHEN online_status = FALSE THEN NOW() ELSE last_seen END
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate unique username
CREATE OR REPLACE FUNCTION generate_username(base_name TEXT)
RETURNS TEXT AS $$
DECLARE
  new_username TEXT;
  counter INTEGER := 0;
BEGIN
  -- Clean the base name (remove spaces, special chars, make lowercase)
  base_name := LOWER(REGEXP_REPLACE(base_name, '[^a-zA-Z0-9]', '', 'g'));
  
  -- Limit length
  IF LENGTH(base_name) > 20 THEN
    base_name := SUBSTRING(base_name, 1, 20);
  END IF;
  
  new_username := base_name;
  
  -- Check if username exists and increment if needed
  WHILE EXISTS (SELECT 1 FROM public.users WHERE username = new_username) LOOP
    counter := counter + 1;
    new_username := base_name || counter::TEXT;
  END LOOP;
  
  RETURN new_username;
END;
$$ LANGUAGE plpgsql;