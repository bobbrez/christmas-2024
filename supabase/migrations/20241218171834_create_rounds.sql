CREATE TABLE rounds
(
  id bigint primary key generated always as identity,
  title text,
  question text,
  created_at timestamptz default now()
);