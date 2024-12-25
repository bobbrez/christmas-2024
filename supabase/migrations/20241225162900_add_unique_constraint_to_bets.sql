ALTER TABLE bets ADD CONSTRAINT bets_unique_round_user_id UNIQUE (round_id, user_id);
