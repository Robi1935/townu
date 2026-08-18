-- TownU V1 initial schema
create extension if not exists pgcrypto;

create type public.user_role as enum (
  'student','parent','faculty_staff','alumni','local_resident','business','admin'
);

create type public.verification_status as enum (
  'unverified','pending','verified_student','verified_business','verified_provider','admin_verified'
);

create type public.content_status as enum (
  'draft','active','sold','inactive','removed'
);

create table public.markets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  state text not null,
  slug text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.schools (
  id uuid primary key default gen_random_uuid(),
  market_id uuid not null references public.markets(id) on delete cascade,
  name text not null,
  slug text not null,
  school_type text,
  email_domains text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (market_id, slug)
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  market_id uuid references public.markets(id),
  school_id uuid references public.schools(id),
  role public.user_role not null default 'student',
  verification_status public.verification_status not null default 'unverified',
  first_name text,
  last_name text,
  public_name text,
  bio text,
  avatar_url text,
  move_out_date date,
  is_moving_out boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  market_id uuid references public.markets(id),
  section text not null,
  name text not null,
  slug text not null,
  icon text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  unique(section, slug, market_id)
);

create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  market_id uuid not null references public.markets(id),
  name text not null,
  slug text not null,
  description text,
  logo_url text,
  cover_url text,
  website_url text,
  phone text,
  email text,
  address_line1 text,
  city text,
  state text,
  postal_code text,
  latitude numeric,
  longitude numeric,
  student_discount text,
  verification_status public.verification_status not null default 'unverified',
  is_featured boolean not null default false,
  is_founding_50 boolean not null default false,
  status public.content_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(market_id, slug)
);

create table public.marketplace_listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  market_id uuid not null references public.markets(id),
  school_id uuid references public.schools(id),
  category_id uuid references public.categories(id),
  title text not null,
  description text,
  price numeric(10,2),
  condition text,
  approximate_location text,
  pickup_available boolean not null default true,
  delivery_available boolean not null default false,
  delivery_fee numeric(10,2),
  negotiable boolean not null default false,
  is_free boolean not null default false,
  is_move_out_item boolean not null default false,
  move_out_date date,
  bundle_price numeric(10,2),
  status public.content_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.marketplace_listings(id) on delete cascade,
  storage_path text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.student_services (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.profiles(id) on delete cascade,
  market_id uuid not null references public.markets(id),
  school_id uuid references public.schools(id),
  category_id uuid references public.categories(id),
  name text not null,
  description text,
  starting_price numeric(10,2),
  service_area text,
  availability_text text,
  status public.content_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.business_services (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  category_id uuid references public.categories(id),
  name text not null,
  description text,
  starting_price numeric(10,2),
  status public.content_status not null default 'active',
  created_at timestamptz not null default now()
);

create table public.deals (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  market_id uuid not null references public.markets(id),
  title text not null,
  description text,
  discount_text text,
  promo_code text,
  starts_at timestamptz,
  expires_at timestamptz,
  student_id_required boolean not null default true,
  redemption_instructions text,
  status public.content_status not null default 'active',
  view_count integer not null default 0,
  redemption_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.housing_listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  market_id uuid not null references public.markets(id),
  school_id uuid references public.schools(id),
  listing_type text not null,
  title text not null,
  property_name text,
  description text,
  monthly_rent numeric(10,2),
  available_date date,
  lease_end_date date,
  bedrooms numeric,
  bathrooms numeric,
  furnished boolean,
  utilities_text text,
  parking_text text,
  pet_policy text,
  approximate_location text,
  distance_from_campus text,
  amenities text[],
  status public.content_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references public.profiles(id) on delete set null,
  market_id uuid not null references public.markets(id),
  school_id uuid references public.schools(id),
  name text not null,
  description text,
  category text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location_name text,
  external_url text,
  is_featured boolean not null default false,
  status public.content_status not null default 'active',
  created_at timestamptz not null default now()
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  market_id uuid references public.markets(id),
  context_type text,
  context_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.conversation_participants (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 5000),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  created_at timestamptz not null default now(),
  unique(user_id, entity_type, entity_id)
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_id uuid not null references public.profiles(id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  rating integer not null check (rating between 1 and 5),
  body text,
  status public.content_status not null default 'active',
  created_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  reason text not null,
  details text,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  href text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.care_products (
  id uuid primary key default gen_random_uuid(),
  market_id uuid not null references public.markets(id),
  title text not null,
  slug text not null,
  description text,
  price numeric(10,2),
  contents text[],
  status text not null default 'coming_soon',
  created_at timestamptz not null default now(),
  unique(market_id, slug)
);

create table public.care_product_waitlist (
  id uuid primary key default gen_random_uuid(),
  care_product_id uuid not null references public.care_products(id) on delete cascade,
  email text not null,
  student_school_id uuid references public.schools(id),
  created_at timestamptz not null default now()
);

-- helpful indexes
create index idx_schools_market on public.schools(market_id);
create index idx_marketplace_market_created on public.marketplace_listings(market_id, created_at desc);
create index idx_marketplace_seller on public.marketplace_listings(seller_id);
create index idx_student_services_market on public.student_services(market_id);
create index idx_businesses_market on public.businesses(market_id);
create index idx_deals_market on public.deals(market_id);
create index idx_housing_market_created on public.housing_listings(market_id, created_at desc);
create index idx_messages_conversation_created on public.messages(conversation_id, created_at);
create index idx_notifications_user_created on public.notifications(user_id, created_at desc);

-- enable RLS
alter table public.profiles enable row level security;
alter table public.marketplace_listings enable row level security;
alter table public.listing_images enable row level security;
alter table public.student_services enable row level security;
alter table public.businesses enable row level security;
alter table public.business_services enable row level security;
alter table public.deals enable row level security;
alter table public.housing_listings enable row level security;
alter table public.events enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;
alter table public.favorites enable row level security;
alter table public.reviews enable row level security;
alter table public.reports enable row level security;
alter table public.notifications enable row level security;

-- public catalog-like tables
alter table public.markets enable row level security;
alter table public.schools enable row level security;
alter table public.categories enable row level security;
alter table public.care_products enable row level security;
alter table public.care_product_waitlist enable row level security;

-- read policies for public discoverable content
create policy "Markets are publicly readable" on public.markets for select using (is_active = true);
create policy "Schools are publicly readable" on public.schools for select using (is_active = true);
create policy "Categories are publicly readable" on public.categories for select using (is_active = true);
create policy "Active marketplace listings are readable" on public.marketplace_listings for select using (status = 'active' or seller_id = auth.uid());
create policy "Listing images are readable" on public.listing_images for select using (true);
create policy "Active student services are readable" on public.student_services for select using (status = 'active' or provider_id = auth.uid());
create policy "Active businesses are readable" on public.businesses for select using (status = 'active');
create policy "Business services are readable" on public.business_services for select using (status = 'active');
create policy "Active deals are readable" on public.deals for select using (status = 'active');
create policy "Active housing is readable" on public.housing_listings for select using (status = 'active' or owner_id = auth.uid());
create policy "Active events are readable" on public.events for select using (status = 'active');
create policy "Care products are readable" on public.care_products for select using (true);

-- profile policies
create policy "Profiles are publicly readable" on public.profiles for select using (true);
create policy "Users update own profile" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

-- owner CRUD policies
create policy "Users create own marketplace listings" on public.marketplace_listings for insert with check (seller_id = auth.uid());
create policy "Users update own marketplace listings" on public.marketplace_listings for update using (seller_id = auth.uid()) with check (seller_id = auth.uid());
create policy "Users delete own marketplace listings" on public.marketplace_listings for delete using (seller_id = auth.uid());

create policy "Users create own student services" on public.student_services for insert with check (provider_id = auth.uid());
create policy "Users update own student services" on public.student_services for update using (provider_id = auth.uid()) with check (provider_id = auth.uid());
create policy "Users delete own student services" on public.student_services for delete using (provider_id = auth.uid());

create policy "Users create own housing" on public.housing_listings for insert with check (owner_id = auth.uid());
create policy "Users update own housing" on public.housing_listings for update using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "Users delete own housing" on public.housing_listings for delete using (owner_id = auth.uid());

-- favorites
create policy "Users manage own favorites" on public.favorites for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- conversations/messages
create policy "Participants read conversations" on public.conversations for select using (
  exists (
    select 1 from public.conversation_participants cp
    where cp.conversation_id = conversations.id and cp.user_id = auth.uid()
  )
);

create policy "Participants read memberships" on public.conversation_participants for select using (
  exists (
    select 1 from public.conversation_participants self_cp
    where self_cp.conversation_id = conversation_participants.conversation_id
      and self_cp.user_id = auth.uid()
  )
);

create policy "Participants read messages" on public.messages for select using (
  exists (
    select 1 from public.conversation_participants cp
    where cp.conversation_id = messages.conversation_id and cp.user_id = auth.uid()
  )
);

create policy "Participants send messages" on public.messages for insert with check (
  sender_id = auth.uid() and exists (
    select 1 from public.conversation_participants cp
    where cp.conversation_id = messages.conversation_id and cp.user_id = auth.uid()
  )
);

-- reviews/reports/notifications
create policy "Active reviews readable" on public.reviews for select using (status = 'active');
create policy "Authenticated users create reviews" on public.reviews for insert with check (reviewer_id = auth.uid());
create policy "Users create reports" on public.reports for insert with check (reporter_id = auth.uid());
create policy "Users see own notifications" on public.notifications for select using (user_id = auth.uid());
create policy "Users update own notifications" on public.notifications for update using (user_id = auth.uid());

-- care waitlist can accept inserts from anyone
create policy "Anyone can join care waitlist" on public.care_product_waitlist for insert with check (true);

-- create profile automatically after auth signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, last_name, public_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    coalesce(new.raw_user_meta_data ->> 'first_name', 'TownU Member')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
