alter table public.gallery_images
  drop constraint if exists gallery_images_gallery_check;

alter table public.gallery_images
  add constraint gallery_images_gallery_check
  check (gallery in ('home', 'sfeer', 'sfeer_album', 'homepage_fotos'));
