create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text not null,
  email text not null,
  phone text,
  message text,
  start_time timestamptz not null,
  end_time timestamptz not null,
  timezone text not null default 'Asia/Bangkok',
  status text not null default 'booked',
  source text,
  metadata jsonb
);

create index if not exists appointments_start_time_idx
  on appointments (start_time);

create index if not exists appointments_status_idx
  on appointments (status);
