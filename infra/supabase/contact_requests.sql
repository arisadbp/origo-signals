drop table if exists contact_requests;

create table contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text not null,
  position text not null,
  employee_count text not null,
  industry text not null,
  email text not null,
  phone text,
  message text,
  source text,
  quiz_session_id text,
  metadata jsonb,
  ip text,
  country text,
  region text,
  city text,
  postal text,
  latitude numeric,
  longitude numeric,
  user_agent text,
  referrer text,
  path text
);

create index contact_requests_created_at_idx
  on contact_requests (created_at desc);
