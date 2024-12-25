CREATE TABLE answers
(
  round_id bigint REFERENCES public.rounds ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  created_at timestamptz default now(),
  PRIMARY KEY(round_id, user_id)
);