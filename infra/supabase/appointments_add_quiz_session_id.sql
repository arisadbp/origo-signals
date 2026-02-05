alter table if exists appointments
  add column if not exists quiz_session_id uuid;

create index if not exists appointments_quiz_session_id_idx
  on appointments (quiz_session_id);
