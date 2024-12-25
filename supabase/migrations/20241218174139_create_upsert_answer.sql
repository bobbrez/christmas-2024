CREATE OR REPLACE FUNCTION upsert_answer(round_id bigint, user_id uuid, new_value jsonb) RETURNS JSONB LANGUAGE SQL AS $$
  INSERT INTO answers (round_id, user_id, value)
    VALUES (round_id, user_id, new_value)
    ON CONFLICT (round_id, user_id) DO UPDATE SET value = new_value
    RETURNING value;
$$;