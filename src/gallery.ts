import { supabase } from './supabaseClient';

export type GalleryName = 'home' | 'sfeer' | 'homepage_fotos';

export type GalleryImage = {
  id: string;
  gallery: GalleryName;
  src: string;
  alt: string;
  title?: string;
  description?: string;
};

type GalleryActionResponse<T> = {
  data?: T;
  error?: string;
};

async function invokeGalleryAction<T>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke('manage-gallery', { body });

  if (error) {
    throw new Error(error.message);
  }

  const response = data as GalleryActionResponse<T>;
  if (response.error) {
    throw new Error(response.error);
  }
  if (response.data === undefined) {
    throw new Error('De galerijserver gaf geen gegevens terug.');
  }

  return response.data;
}

export async function fetchGallery(galleries: GalleryName[]): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('id, gallery, src, alt, title, description')
    .in('gallery', galleries)
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(`Galerijfoto's laden is mislukt: ${error.message}`);
  }

  return (data ?? []) as GalleryImage[];
}

export function authenticateGalleryAdmin(password: string): Promise<{ authenticated: boolean }> {
  return invokeGalleryAction({ action: 'login', password });
}

export function importGalleryImage(
  password: string,
  gallery: GalleryName,
  image: Omit<GalleryImage, 'gallery'>,
): Promise<GalleryImage> {
  if (image.src.startsWith('data:')) {
    return uploadGalleryImage(password, gallery, image);
  }
  return invokeGalleryAction({ action: 'import', password, gallery, image });
}

export function uploadGalleryImage(
  password: string,
  gallery: GalleryName,
  image: Omit<GalleryImage, 'gallery'>,
): Promise<GalleryImage> {
  return uploadImageFile(password, gallery, image);
}

async function uploadImageFile(
  password: string,
  gallery: GalleryName,
  image: Omit<GalleryImage, 'gallery'>,
): Promise<GalleryImage> {
  const match = /^data:(image\/(?:jpeg|png|webp|gif));base64,([A-Za-z0-9+/]+=*)$/.exec(image.src);
  if (!match) throw new Error('De afbeeldingsgegevens zijn ongeldig.');

  const contentType = match[1];
  const bytes = Uint8Array.from(atob(match[2]), (character) => character.charCodeAt(0));
  if (bytes.byteLength > 10 * 1024 * 1024) throw new Error('De afbeelding mag maximaal 10 MB zijn.');

  const reservation = await invokeGalleryAction<{ storagePath: string; token: string }>({
    action: 'prepare-upload',
    password,
    gallery,
    contentType,
    size: bytes.byteLength,
  });
  let uploadComplete = false;
  try {
    const { error: uploadError } = await supabase.storage
      .from('site-gallery')
      .uploadToSignedUrl(reservation.storagePath, reservation.token, new Blob([bytes], { type: contentType }), { contentType });
    if (uploadError) throw new Error(uploadError.message);
    uploadComplete = true;

    const src = supabase.storage.from('site-gallery').getPublicUrl(reservation.storagePath).data.publicUrl;
    return await invokeGalleryAction<GalleryImage>({
      action: 'save-upload',
      password,
      gallery,
      storagePath: reservation.storagePath,
      image: { ...image, src },
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

export function deleteGalleryImage(password: string, id: string): Promise<{ deleted: boolean }> {
  return invokeGalleryAction({ action: 'delete', password, id });
}
