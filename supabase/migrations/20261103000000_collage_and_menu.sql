-- Collage-formaat en volgorde voor galerijfoto's
alter table public.gallery_images
  add column if not exists size text not null default 'small',
  add column if not exists sort_order integer not null default 0;

alter table public.gallery_images
  drop constraint if exists gallery_images_size_check;
alter table public.gallery_images
  add constraint gallery_images_size_check
  check (size in ('small', 'wide', 'tall', 'large'));

-- Menu dat direct met de website synchroniseert (één rij met alle data)
create table if not exists public.site_menu (
  id integer primary key check (id = 1),
  categories jsonb not null default '[]'::jsonb,
  items jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_menu enable row level security;

grant select on public.site_menu to anon, authenticated;
grant all on public.site_menu to service_role;

drop policy if exists "Menu is publicly readable" on public.site_menu;
create policy "Menu is publicly readable"
  on public.site_menu
  for select
  to anon, authenticated
  using (true);

do $$
begin
  alter publication supabase_realtime add table public.site_menu;
exception
  when duplicate_object then null;
  when undefined_object then null;
end $$;
