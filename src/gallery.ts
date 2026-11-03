import { supabase } from './supabaseClient';

export type GalleryName = 'home' | 'sfeer' | 'sfeer_album';
export type PhotoSize = 'small' | 'wide' | 'tall' | 'large';

export type GalleryImage = {
  id: string;
  gallery: GalleryName;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  size?: PhotoSize;
};

export type GalleryImageChanges = Partial<Pick<GalleryImage, 'title' | 'description' | 'alt' | 'size'>>;

type ActionResponse<T> = {
  data?: T;
  error?: string;
};

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const BUCKET = 'site-gallery';

export async function invokeAction<T>(fn: string, body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke(fn, { body });

  if (error) {
    throw new Error(error.message);
  }

  const response = data as ActionResponse<T>;
  if (response.error) {
    throw new Error(response.error);
  }
  if (response.data === undefined) {
    throw new Error('De server gaf geen gegevens terug.');
  }

  return response.data;
}

const invokeGalleryAction = <T,>(body: Record<string, unknown>) => invokeAction<T>('manage-gallery', body);

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type) || file.size > MAX_IMAGE_BYTES) {
    return 'Gebruik een JPG-, PNG-, WEBP- of GIF-afbeelding van maximaal 10 MB.';
  }
  return null;
}

const extendedColumns = 'id, gallery, src, alt, title, description, size, sort_order';
const basicColumns = 'id, gallery, src, alt, title, description';

export async function fetchGallery(galleries: GalleryName[]): Promise<GalleryImage[]> {
  const extended = await supabase
    .from('gallery_images')
    .select(extendedColumns)
    .in('gallery', galleries)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (!extended.error) return (extended.data ?? []) as unknown as GalleryImage[];

  // Vangnet voor het geval de nieuwste databasemigratie nog niet is uitgevoerd
  const basic = await supabase
    .from('gallery_images')
    .select(basicColumns)
    .in('gallery', galleries)
    .order('created_at', { ascending: true });

  if (basic.error) {
    throw new Error(`Galerijfoto's laden is mislukt: ${basic.error.message}`);
  }
  return (basic.data ?? []) as unknown as GalleryImage[];
}

export function subscribeToGallery(onChange: () => void): () => void {
  const channel = supabase
    .channel(`gallery-${Math.random().toString(36).slice(2)}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_images' }, onChange)
    .subscribe();
  return () => { void supabase.removeChannel(channel); };
}

export function authenticateGalleryAdmin(password: string): Promise<{ authenticated: boolean }> {
  return invokeGalleryAction({ action: 'login', password });
}

export async function uploadGalleryFile(
  password: string,
  gallery: GalleryName,
  file: File,
  meta: Pick<GalleryImage, 'alt' | 'title' | 'description' | 'size'>,
): Promise<GalleryImage> {
  const invalid = validateImageFile(file);
  if (invalid) throw new Error(invalid);

  const reservation = await invokeGalleryAction<{ storagePath: string; token: string }>({
    action: 'prepare-upload',
    password,
    gallery,
    contentType: file.type,
    size: file.size,
  });
  let uploadComplete = false;
  try {
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .uploadToSignedUrl(reservation.storagePath, reservation.token, file, { contentType: file.type });
    if (uploadError) throw new Error(uploadError.message);
    uploadComplete = true;

    const src = supabase.storage.from(BUCKET).getPublicUrl(reservation.storagePath).data.publicUrl;
    return await invokeGalleryAction<GalleryImage>({
      action: 'save-upload',
      password,
      gallery,
      storagePath: reservation.storagePath,
      image: { ...meta, src },
    });
  } catch (error) {
    if (uploadComplete) {
      try {
        await invokeGalleryAction({ action: 'cleanup-upload', password, storagePath: reservation.storagePath });
      } catch (cleanupError) {
        console.error('Tijdelijke galerijafbeelding opruimen is mislukt:', cleanupError);
      }
    }
    throw error;
  }
}

export function updateGalleryImage(password: string, id: string, changes: GalleryImageChanges): Promise<GalleryImage> {
  return invokeGalleryAction({ action: 'update', password, id, changes });
}

export function updateAlbum(password: string, title: string, newTitle: string, description: string): Promise<{ updated: boolean }> {
  return invokeGalleryAction({ action: 'update-album', password, title, newTitle, description });
}

export function deleteAlbum(password: string, title: string): Promise<{ deleted: boolean }> {
  return invokeGalleryAction({ action: 'delete-album', password, title });
}

export function reorderGallery(password: string, ids: string[]): Promise<{ reordered: boolean }> {
  return invokeGalleryAction({ action: 'reorder', password, ids });
}

export function deleteGalleryImage(password: string, id: string): Promise<{ deleted: boolean }> {
  return invokeGalleryAction({ action: 'delete', password, id });
}

export type AlbumGroup = {
  title: string;
  description: string;
  images: GalleryImage[];
};

export function groupAlbums(images: GalleryImage[]): AlbumGroup[] {
  const albums = new Map<string, AlbumGroup>();
  for (const image of images) {
    const title = image.title?.trim() || 'Evenementen';
    const album = albums.get(title) ?? { title, description: image.description || '', images: [] };
    if (!album.description && image.description) album.description = image.description;
    album.images.push(image);
    albums.set(title, album);
  }
  return Array.from(albums.values());
}
