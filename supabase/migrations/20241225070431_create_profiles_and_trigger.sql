create table public.profiles (
  user_id uuid not null references auth.users on delete cascade,
  first_name text,
  last_name text,

  primary key (user_id)
);

alter table public.profiles enable row level security;

create policy "Public profiles are visible to everyone."
on profiles for select
to authenticated
using ( true ); -- the actual Policy

create policy "Users can create a profile."
on profiles for insert
to authenticated 
with check ( (select auth.uid()) = user_id );

create policy "Users can update their own profile."
on profiles for update
to authenticated                    -- the Postgres Role (recommended)
using ( (select auth.uid()) = user_id )
with check ( (select auth.uid()) = user_id );


-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (user_id, first_name, last_name)
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
  