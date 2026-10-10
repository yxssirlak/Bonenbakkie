create table if not exists public.gallery_images (
  id text primary key,
  gallery text not null check (gallery in ('home', 'sfeer', 'homepage_fotos')),
  src text not null,
  storage_path text,
  alt text not null default '',
  title text,
  description text,
  created_at timestamptz not null default now()
);

alter table public.gallery_images enable row level security;

grant select on public.gallery_images to anon, authenticated;
grant all on public.gallery_images to service_role;

drop policy if exists "Gallery images are publicly readable" on public.gallery_images;
create policy "Gallery images are publicly readable"
  on public.gallery_images
  for select
  to anon, authenticated
  using (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-gallery',
  'site-gallery',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "site-gallery objects are publicly readable" on storage.objects;
create policy "site-gallery objects are publicly readable"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'site-gallery');
