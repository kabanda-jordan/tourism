-- ============================================
-- Rwanda Tourism Vehicle Hiring Platform
-- Initial Database Schema + RLS Policies
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- 1. PROFILES (extends auth.users)
-- ============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role text not null default 'tourist' check (role in ('tourist', 'company', 'driver', 'admin')),
  name text not null,
  phone text,
  avatar_url text,
  passport_number text,
  driving_license text,
  verified boolean default false,
  two_factor_enabled boolean default false,
  two_factor_method text check (two_factor_method in ('totp', 'email')),
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

alter table public.profiles enable row level security;

-- Profiles: users can read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Admins can view all profiles
create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- 2. COMPANIES
-- ============================================
create table public.companies (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  description text,
  logo_url text,
  license_number text,
  bank_account text,
  verified boolean default false,
  status text default 'pending' check (status in ('pending', 'approved', 'suspended', 'rejected')),
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

alter table public.companies enable row level security;

create policy "Company owners can view own company"
  on public.companies for select
  using (auth.uid() = owner_id);

create policy "Company owners can update own company"
  on public.companies for update
  using (auth.uid() = owner_id);

create policy "Company owners can insert own company"
  on public.companies for insert
  with check (auth.uid() = owner_id);

-- Public can view approved companies
create policy "Public can view approved companies"
  on public.companies for select
  using (status = 'approved');

-- Admins can manage all companies
create policy "Admins can manage all companies"
  on public.companies for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- 3. VEHICLES
-- ============================================
create table public.vehicles (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id) on delete cascade not null,
  title text not null,
  description text,
  category text not null check (category in ('sedan', 'suv', 'van', 'bus', 'truck', 'motorcycle', 'luxury')),
  transmission text default 'automatic' check (transmission in ('automatic', 'manual')),
  seats integer not null default 4,
  fuel_type text default 'petrol' check (fuel_type in ('petrol', 'diesel', 'electric', 'hybrid')),
  price_per_day numeric(10, 2) not null,
  images text[] default '{}',
  location text not null,
  city text,
  latitude numeric(9, 6),
  longitude numeric(9, 6),
  features text[] default '{}',
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  featured boolean default false,
  average_rating numeric(3, 2) default 0,
  total_reviews integer default 0,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

alter table public.vehicles enable row level security;

-- Public can view approved vehicles
create policy "Public can view approved vehicles"
  on public.vehicles for select
  using (status = 'approved');

-- Company owners can view/manage their own vehicles (any status)
create policy "Company owners can view own vehicles"
  on public.vehicles for select
  using (
    exists (
      select 1 from public.companies
      where id = vehicles.company_id and owner_id = auth.uid()
    )
  );

create policy "Company owners can insert vehicles"
  on public.vehicles for insert
  with check (
    exists (
      select 1 from public.companies
      where id = company_id and owner_id = auth.uid()
    )
  );

create policy "Company owners can update own vehicles"
  on public.vehicles for update
  using (
    exists (
      select 1 from public.companies
      where id = vehicles.company_id and owner_id = auth.uid()
    )
  );

create policy "Company owners can delete own vehicles"
  on public.vehicles for delete
  using (
    exists (
      select 1 from public.companies
      where id = vehicles.company_id and owner_id = auth.uid()
    )
  );

-- Admins can manage all vehicles
create policy "Admins can manage all vehicles"
  on public.vehicles for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- 4. VEHICLE AVAILABILITY
-- ============================================
create table public.vehicle_availability (
  id uuid default uuid_generate_v4() primary key,
  vehicle_id uuid references public.vehicles(id) on delete cascade not null,
  date date not null,
  is_available boolean default true,
  created_at timestamp with time zone default now() not null,
  unique(vehicle_id, date)
);

alter table public.vehicle_availability enable row level security;

-- Public can view availability for approved vehicles
create policy "Public can view vehicle availability"
  on public.vehicle_availability for select
  using (
    exists (
      select 1 from public.vehicles
      where id = vehicle_availability.vehicle_id and status = 'approved'
    )
  );

-- Company owners can manage availability for their vehicles
create policy "Company owners can manage vehicle availability"
  on public.vehicle_availability for all
  using (
    exists (
      select 1 from public.vehicles v
      join public.companies c on c.id = v.company_id
      where v.id = vehicle_availability.vehicle_id and c.owner_id = auth.uid()
    )
  );

-- ============================================
-- 5. BOOKINGS
-- ============================================
create table public.bookings (
  id uuid default uuid_generate_v4() primary key,
  tourist_id uuid references public.profiles(id) on delete cascade not null,
  vehicle_id uuid references public.vehicles(id) on delete cascade not null,
  booking_code text not null unique,
  pickup_date timestamp with time zone not null,
  dropoff_date timestamp with time zone not null,
  pickup_location text,
  dropoff_location text,
  driver_requested boolean default false,
  insurance boolean default false,
  coupon_code text,
  subtotal numeric(10, 2) not null,
  driver_fee numeric(10, 2) default 0,
  insurance_fee numeric(10, 2) default 0,
  discount numeric(10, 2) default 0,
  total_price numeric(10, 2) not null,
  status text default 'pending' check (status in ('pending', 'approved', 'cancelled', 'completed')),
  payment_status text default 'unpaid' check (payment_status in ('unpaid', 'paid', 'refunded', 'partial')),
  notes text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

alter table public.bookings enable row level security;

-- Tourists can view their own bookings
create policy "Tourists can view own bookings"
  on public.bookings for select
  using (auth.uid() = tourist_id);

-- Tourists can create bookings
create policy "Tourists can create bookings"
  on public.bookings for insert
  with check (auth.uid() = tourist_id);

-- Tourists can update their own bookings (for cancellation)
create policy "Tourists can update own bookings"
  on public.bookings for update
  using (auth.uid() = tourist_id);

-- Company owners can view bookings for their vehicles
create policy "Company owners can view vehicle bookings"
  on public.bookings for select
  using (
    exists (
      select 1 from public.vehicles v
      join public.companies c on c.id = v.company_id
      where v.id = bookings.vehicle_id and c.owner_id = auth.uid()
    )
  );

-- Company owners can update bookings for their vehicles
create policy "Company owners can update vehicle bookings"
  on public.bookings for update
  using (
    exists (
      select 1 from public.vehicles v
      join public.companies c on c.id = v.company_id
      where v.id = bookings.vehicle_id and c.owner_id = auth.uid()
    )
  );

-- Admins can manage all bookings
create policy "Admins can manage all bookings"
  on public.bookings for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- 6. PAYMENTS
-- ============================================
create table public.payments (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references public.bookings(id) on delete cascade not null,
  amount numeric(10, 2) not null,
  currency text default 'RWF',
  method text not null check (method in ('card', 'mobile_money', 'bank_transfer', 'cash')),
  status text default 'pending' check (status in ('pending', 'successful', 'failed', 'refunded')),
  transaction_ref text,
  flutterwave_ref text,
  metadata jsonb,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

alter table public.payments enable row level security;

-- Users can view payments for their own bookings
create policy "Users can view own payments"
  on public.payments for select
  using (
    exists (
      select 1 from public.bookings
      where id = payments.booking_id and tourist_id = auth.uid()
    )
  );

-- Company owners can view payments for their vehicle bookings
create policy "Company owners can view vehicle payments"
  on public.payments for select
  using (
    exists (
      select 1 from public.bookings b
      join public.vehicles v on v.id = b.vehicle_id
      join public.companies c on c.id = v.company_id
      where b.id = payments.booking_id and c.owner_id = auth.uid()
    )
  );

-- Admins can manage all payments
create policy "Admins can manage all payments"
  on public.payments for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- 7. REVIEWS
-- ============================================
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references public.bookings(id) on delete cascade not null,
  tourist_id uuid references public.profiles(id) on delete cascade not null,
  vehicle_id uuid references public.vehicles(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  photos text[] default '{}',
  company_reply text,
  company_reply_at timestamp with time zone,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  unique(booking_id)
);

alter table public.reviews enable row level security;

-- Public can view reviews
create policy "Public can view reviews"
  on public.reviews for select
  using (true);

-- Tourists can create reviews for their completed bookings
create policy "Tourists can create reviews"
  on public.reviews for insert
  with check (
    auth.uid() = tourist_id
    and exists (
      select 1 from public.bookings
      where id = booking_id and tourist_id = auth.uid() and status = 'completed'
    )
  );

-- Tourists can update their own reviews
create policy "Tourists can update own reviews"
  on public.reviews for update
  using (auth.uid() = tourist_id);

-- Company owners can reply to reviews on their vehicles
create policy "Company owners can reply to reviews"
  on public.reviews for update
  using (
    exists (
      select 1 from public.vehicles v
      join public.companies c on c.id = v.company_id
      where v.id = reviews.vehicle_id and c.owner_id = auth.uid()
    )
  );

-- Admins can manage all reviews
create policy "Admins can manage all reviews"
  on public.reviews for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- 8. WISHLISTS
-- ============================================
create table public.wishlists (
  id uuid default uuid_generate_v4() primary key,
  tourist_id uuid references public.profiles(id) on delete cascade not null,
  vehicle_id uuid references public.vehicles(id) on delete cascade not null,
  created_at timestamp with time zone default now() not null,
  unique(tourist_id, vehicle_id)
);

alter table public.wishlists enable row level security;

create policy "Tourists can view own wishlist"
  on public.wishlists for select
  using (auth.uid() = tourist_id);

create policy "Tourists can add to wishlist"
  on public.wishlists for insert
  with check (auth.uid() = tourist_id);

create policy "Tourists can remove from wishlist"
  on public.wishlists for delete
  using (auth.uid() = tourist_id);

-- ============================================
-- 9. MESSAGES
-- ============================================
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  receiver_id uuid references public.profiles(id) on delete cascade not null,
  booking_id uuid references public.bookings(id) on delete set null,
  content text not null,
  read boolean default false,
  created_at timestamp with time zone default now() not null
);

alter table public.messages enable row level security;

create policy "Users can view own messages"
  on public.messages for select
  using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Users can send messages"
  on public.messages for insert
  with check (auth.uid() = sender_id);

create policy "Users can update own received messages"
  on public.messages for update
  using (auth.uid() = receiver_id);

-- ============================================
-- 10. NOTIFICATIONS
-- ============================================
create table public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null check (type in ('booking', 'payment', 'review', 'message', 'system', 'promotion')),
  title text not null,
  body text,
  link text,
  read boolean default false,
  created_at timestamp with time zone default now() not null
);

alter table public.notifications enable row level security;

create policy "Users can view own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Users can update own notifications"
  on public.notifications for update
  using (auth.uid() = user_id);

create policy "System can create notifications"
  on public.notifications for insert
  with check (true);

-- ============================================
-- 11. DESTINATIONS
-- ============================================
create table public.destinations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  short_description text,
  images text[] default '{}',
  activities text[] default '{}',
  region text,
  latitude numeric(9, 6),
  longitude numeric(9, 6),
  featured boolean default false,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

alter table public.destinations enable row level security;

-- Public can view destinations
create policy "Public can view destinations"
  on public.destinations for select
  using (true);

-- Admins can manage destinations
create policy "Admins can manage destinations"
  on public.destinations for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- 12. SECURITY LOGS
-- ============================================
create table public.security_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  event_type text not null check (event_type in (
    'login', 'login_failed', 'logout', 'signup',
    'password_change', 'password_reset', 'email_verified',
    'two_factor_enabled', 'two_factor_disabled', 'two_factor_verified',
    'otp_sent', 'otp_verified', 'otp_failed'
  )),
  ip_address inet,
  user_agent text,
  metadata jsonb,
  created_at timestamp with time zone default now() not null
);

alter table public.security_logs enable row level security;

-- Users can view their own security logs
create policy "Users can view own security logs"
  on public.security_logs for select
  using (auth.uid() = user_id);

-- System can insert security logs
create policy "System can insert security logs"
  on public.security_logs for insert
  with check (true);

-- Admins can view all security logs
create policy "Admins can view all security logs"
  on public.security_logs for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- 13. COUPONS
-- ============================================
create table public.coupons (
  id uuid default uuid_generate_v4() primary key,
  code text not null unique,
  discount_percent integer check (discount_percent > 0 and discount_percent <= 100),
  discount_amount numeric(10, 2) check (discount_amount > 0),
  max_uses integer,
  used_count integer default 0,
  valid_from timestamp with time zone default now() not null,
  valid_until timestamp with time zone not null,
  active boolean default true,
  created_at timestamp with time zone default now() not null
);

alter table public.coupons enable row level security;

-- Public can validate coupons (read-only)
create policy "Public can validate coupons"
  on public.coupons for select
  using (active = true and valid_until > now());

-- Admins can manage coupons
create policy "Admins can manage coupons"
  on public.coupons for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- INDEXES for performance
-- ============================================
create index idx_vehicles_company_id on public.vehicles(company_id);
create index idx_vehicles_status on public.vehicles(status);
create index idx_vehicles_category on public.vehicles(category);
create index idx_vehicles_location on public.vehicles(location);
create index idx_vehicles_price on public.vehicles(price_per_day);
create index idx_vehicles_featured on public.vehicles(featured) where featured = true;

create index idx_bookings_tourist_id on public.bookings(tourist_id);
create index idx_bookings_vehicle_id on public.bookings(vehicle_id);
create index idx_bookings_status on public.bookings(status);
create index idx_bookings_dates on public.bookings(pickup_date, dropoff_date);

create index idx_payments_booking_id on public.payments(booking_id);
create index idx_reviews_vehicle_id on public.reviews(vehicle_id);
create index idx_reviews_tourist_id on public.reviews(tourist_id);

create index idx_messages_sender_receiver on public.messages(sender_id, receiver_id);
create index idx_messages_read on public.messages(read) where read = false;

create index idx_notifications_user_id on public.notifications(user_id);
create index idx_notifications_read on public.notifications(read) where read = false;

create index idx_vehicle_availability_vehicle_date on public.vehicle_availability(vehicle_id, date);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update vehicle average rating when review is added/updated
create or replace function public.update_vehicle_rating()
returns trigger as $$
begin
  update public.vehicles
  set
    average_rating = (
      select coalesce(round(avg(rating)::numeric, 2), 0)
      from public.reviews
      where vehicle_id = NEW.vehicle_id
    ),
    total_reviews = (
      select count(*)
      from public.reviews
      where vehicle_id = NEW.vehicle_id
    ),
    updated_at = now()
  where id = NEW.vehicle_id;
  return NEW;
end;
$$ language plpgsql security definer;

create trigger on_review_created
  after insert or update on public.reviews
  for each row
  execute function public.update_vehicle_rating();

-- Function to create a profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, phone, role)
  values (
    NEW.id,
    coalesce(NEW.raw_user_meta_data->>'name', NEW.email),
    coalesce(NEW.raw_user_meta_data->>'phone', null),
    coalesce(NEW.raw_user_meta_data->>'role', 'tourist')
  );
  return NEW;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
