create table if not exists quiz_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  contact jsonb,
  answers jsonb,
  raw_points jsonb,
  raw_score_total numeric,
  score_percent_final numeric,
  tier text,
  insights jsonb,
  utm jsonb,
  device jsonb
);

create index if not exists quiz_sessions_created_at_idx
  on quiz_sessions (created_at desc);
