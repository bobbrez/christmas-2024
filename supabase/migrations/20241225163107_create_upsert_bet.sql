CREATE OR REPLACE FUNCTION upsert_bet(round_id bigint, user_id uuid, bet_amount integer, subject_id uuid) RETURNS integer LANGUAGE SQL AS $$
  INSERT INTO bets (round_id, user_id, amount, subject_id)
    VALUES (round_id, user_id, bet_amount, subject_id)
    ON CONFLICT (round_id, user_id) DO UPDATE SET amount = bet_amount
    RETURNING bet_amount;
$$;