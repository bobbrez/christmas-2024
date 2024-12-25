CREATE TYPE round_status AS ENUM ('pending', 'bets_open', 'bets_closed', 'completed');

ALTER TABLE rounds ADD COLUMN status round_status NOT NULL DEFAULT 'pending';
ALTER TABLE rounds ADD COLUMN winner_id uuid REFERENCES profiles(user_id);