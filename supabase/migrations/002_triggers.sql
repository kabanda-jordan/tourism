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

-- Drop existing trigger if it exists
drop trigger if exists on_review_created on public.reviews;

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

-- Drop existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
