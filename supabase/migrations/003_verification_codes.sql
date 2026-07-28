-- ============================================
-- Verification codes for email/phone OTP
-- ============================================
create table if not exists public.verification_codes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  email text not null,
  code text not null,
  type text not null check (type in ('signup', 'reset_password', 'email_change')),
  expires_at timestamp with time zone not null,
  used boolean default false,
  created_at timestamp with time zone default now() not null
);

alter table public.verification_codes enable row level security;

-- Users can read their own codes
create policy "Users can view own verification codes"
  on public.verification_codes for select
  using (auth.uid() = user_id or email = (select email from auth.users where id = auth.uid()));

-- System can insert codes
create policy "System can insert verification codes"
  on public.verification_codes for insert
  with check (true);

-- Users can update their own codes (to mark as used)
create policy "Users can update own verification codes"
  on public.verification_codes for update
  using (auth.uid() = user_id);

create index idx_verification_codes_email on public.verification_codes(email);
create index idx_verification_codes_code on public.verification_codes(code);
create index idx_verification_codes_expires on public.verification_codes(expires_at);

-- ============================================
-- Clean up expired codes (run periodically via pg_cron or manual)
-- ============================================
create or replace function public.cleanup_expired_codes()
returns void as $$
begin
  delete from public.verification_codes
  where expires_at < now() or used = true;
end;
$$ language plpgsql security definer;
