CREATE TYPE bet_status AS ENUM ('open', 'pending', 'won', 'lost');

create table public.bets (
  id uuid not null primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  round_id integer references rounds(id),
  amount integer not null default 0,
  status bet_status not null default 'open',
  created_at timestamp with time zone not null default now()
);

alter table public.bets enable row level security;

create policy "Public bets are visible to everyone."
on bets for select
to authenticated
using ( true ); -- the actual Policy

create policy "Users can create a bet."
on bets for insert
to authenticated 
with check ( (select auth.uid()) = user_id );

create view public.bets_resolved AS
  SELECT user_id, 
  sum(amount) filter (where status = 'won') as total_won, 
  COALESCE (sum(amount) filter (where status = 'lost'), 0) as total_lost,
  COALESCE (sum(amount) filter (where status = 'won') - sum(amount) filter (where status = 'lost'), 0) as total_balance
  FROM bets
  GROUP BY user_id;