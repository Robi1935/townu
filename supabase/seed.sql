-- TownU initial Tuscaloosa market seed

insert into public.markets (name, city, state, slug)
values ('Tuscaloosa', 'Tuscaloosa', 'Alabama', 'tuscaloosa')
on conflict (slug) do nothing;

with m as (
  select id from public.markets where slug = 'tuscaloosa'
)
insert into public.schools (market_id, name, slug, school_type, email_domains)
select id, 'University of Alabama', 'university-of-alabama', 'university', array['ua.edu'] from m
union all
select id, 'Stillman College', 'stillman-college', 'college', array['stillman.edu'] from m
union all
select id, 'Shelton State Community College', 'shelton-state-community-college', 'community_college', array['sheltonstate.edu'] from m
on conflict (market_id, slug) do nothing;

with m as (
  select id from public.markets where slug = 'tuscaloosa'
)
insert into public.categories (market_id, section, name, slug, icon, sort_order)
select id, 'marketplace', 'Furniture', 'furniture', '🛋️', 1 from m
union all select id, 'marketplace', 'Dorm Essentials', 'dorm-essentials', '🛏️', 2 from m
union all select id, 'marketplace', 'Electronics', 'electronics', '💻', 3 from m
union all select id, 'marketplace', 'Textbooks', 'textbooks', '📚', 4 from m
union all select id, 'marketplace', 'Game Day', 'game-day', '🏈', 5 from m
union all select id, 'marketplace', 'Free Stuff', 'free-stuff', '🆓', 6 from m
union all select id, 'service', 'Laundry', 'laundry', '🧺', 1 from m
union all select id, 'service', 'Cleaning', 'cleaning', '✨', 2 from m
union all select id, 'service', 'Tutoring', 'tutoring', '📖', 3 from m
union all select id, 'service', 'Moving & Unboxing', 'moving-unboxing', '📦', 4 from m
union all select id, 'service', 'Storage', 'storage', '🔐', 5 from m
union all select id, 'service', 'Auto', 'auto', '🚗', 6 from m
union all select id, 'service', 'Beauty', 'beauty', '💇', 7 from m
union all select id, 'service', 'Photography', 'photography', '📸', 8 from m
on conflict (section, slug, market_id) do nothing;

with m as (
  select id from public.markets where slug = 'tuscaloosa'
)
insert into public.care_products (market_id, title, slug, description, price, contents, status)
select id, 'Welcome Drop', 'welcome-drop',
  'A curated Tuscaloosa welcome package for a student arriving in town.',
  59.00,
  array['TownU apparel item','drinkware','keychain','snacks','local offers'],
  'coming_soon'
from m
union all
select id, 'Finals Survival Drop', 'finals-survival-drop',
  'A care package designed for finals week.',
  69.00,
  array['snacks','drinkware','study essentials','local offers'],
  'coming_soon'
from m
on conflict (market_id, slug) do nothing;
