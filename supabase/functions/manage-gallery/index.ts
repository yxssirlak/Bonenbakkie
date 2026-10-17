import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const allowedGalleries = new Set(['home', 'sfeer', 'sfeer_album']);
const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const maxImageSize = 10 * 1024 * 1024;

type GalleryImageInput = {
  id?: string;
  src: string;
  alt?: string;
  title?: string;
  description?: string;
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getExtension(contentType: string): string {
  return contentType === 'image/jpeg' ? 'jpg' : contentType.slice('image/'.length);
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Alleen POST-verzoeken zijn toegestaan.' }, 405);
  }

  try {
    const adminPassword = Deno.env.get('ADMIN_PASSWORD');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!adminPassword || !supabaseUrl || !serviceRoleKey) {
      return jsonResponse({ error: 'De galerijserver is niet volledig geconfigureerd.' }, 500);
    }

    const body: unknown = await request.json();
    if (!isRecord(body) || typeof body.action !== 'string') {
      return jsonResponse({ error: 'Ongeldig verzoek.' }, 400);
    }

    if (body.action === 'login') {
      return body.password === adminPassword
        ? jsonResponse({ data: { authenticated: true } })
        : jsonResponse({ error: 'Ongeldig wachtwoord.' }, 401);
    }

    if (body.password !== adminPassword) {
      return jsonResponse({ error: 'Niet gemachtigd.' }, 401);
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const insertImage = async (gallery: string, image: GalleryImageInput) => {
      if (!allowedGalleries.has(gallery) || !image || typeof image.src !== 'string' || !image.src) {
        return jsonResponse({ error: 'Ongeldige galerijfoto.' }, 400);
      }

      const id = typeof image.id === 'string' && image.id ? image.id : crypto.randomUUID();
      const { data: existing, error: lookupError } = await supabase
        .from('gallery_images')
        .select('id, gallery, src, alt, title, description')
        .eq('id', id)
        .maybeSingle();
      if (lookupError) throw lookupError;
      if (existing) return jsonResponse({ data: existing });
      if (image.src.startsWith('data:')) {
        return jsonResponse({ error: 'Afbeeldingen moeten via de beveiligde upload worden verstuurd.' }, 400);
      }
      if (!image.src.startsWith('/') && !/^https?:\/\//i.test(image.src)) {
        return jsonResponse({ error: 'De afbeeldingslocatie is ongeldig.' }, 400);
      }

      const record = {
        id,
        gallery,
        src: image.src,
        storage_path: null,
        alt: typeof image.alt === 'string' ? image.alt : '',
        title: typeof image.title === 'string' ? image.title : '',
        description: typeof image.description === 'string' ? image.description : '',
      };
      const { data, error: insertError } = await supabase
        .from('gallery_images')
        .insert(record)
        .select('id, gallery, src, alt, title, description')
        .single();
      if (insertError) throw insertError;

      return jsonResponse({ data });
    };

    if (body.action === 'import') {
      if (typeof body.gallery !== 'string' || !isRecord(body.image)) {
        return jsonResponse({ error: 'Ongeldige galerijfoto.' }, 400);
      }
      return await insertImage(body.gallery, body.image as GalleryImageInput);
    }

    if (body.action === 'prepare-upload') {
      if (typeof body.gallery !== 'string' || !allowedGalleries.has(body.gallery)
        || typeof body.contentType !== 'string' || !allowedImageTypes.has(body.contentType)
        || typeof body.size !== 'number' || !Number.isInteger(body.size)
        || body.size < 1 || body.size > maxImageSize) {
        return jsonResponse({ error: 'Gebruik een JPG-, PNG-, WEBP- of GIF-afbeelding tot 10 MB.' }, 400);
      }
      const storagePath = `${body.gallery}/${crypto.randomUUID()}.${getExtension(body.contentType)}`;
      const { data, error: signedUrlError } = await supabase.storage
        .from('site-gallery')
        .createSignedUploadUrl(storagePath);
      if (signedUrlError) throw signedUrlError;
      return jsonResponse({ data: { storagePath: data.path, token: data.token } });
    }

    if (body.action === 'save-upload') {
      if (typeof body.gallery !== 'string' || !allowedGalleries.has(body.gallery)
        || typeof body.storagePath !== 'string'
        || !body.storagePath.startsWith(`${body.gallery}/`)
        || !/^[^/]+\/[0-9a-f-]+\.(jpg|png|webp|gif)$/i.test(body.storagePath)
        || !isRecord(body.image) || typeof body.image.src !== 'string') {
        return jsonResponse({ error: 'Ongeldige galerijfoto.' }, 400);
      }

      const id = typeof body.image.id === 'string' && body.image.id ? body.image.id : crypto.randomUUID();
      const { data: existing, error: lookupError } = await supabase
        .from('gallery_images')
        .select('id, gallery, src, alt, title, description')
        .eq('id', id)
        .maybeSingle();
      if (lookupError) throw lookupError;
      if (existing) {
        const { error: removeError } = await supabase.storage.from('site-gallery').remove([body.storagePath]);
        if (removeError) throw removeError;
        return jsonResponse({ data: existing });
      }

      const { data: fileList, error: listError } = await supabase.storage
        .from('site-gallery')
        .list(body.gallery, { search: body.storagePath.split('/').pop() });
      if (listError) throw listError;
      if (!fileList?.some((file) => `${body.gallery}/${file.name}` === body.storagePath)) {
        return jsonResponse({ error: 'De geüploade afbeelding kon niet worden gevonden.' }, 400);
      }

      const record = {
        id,
        gallery: body.gallery,
        src: supabase.storage.from('site-gallery').getPublicUrl(body.storagePath).data.publicUrl,
        storage_path: body.storagePath,
        alt: typeof body.image.alt === 'string' ? body.image.alt : '',
        title: typeof body.image.title === 'string' ? body.image.title : '',
        description: typeof body.image.description === 'string' ? body.image.description : '',
      };
      const { data, error: insertError } = await supabase
        .from('gallery_images')
        .insert(record)
        .select('id, gallery, src, alt, title, description')
        .single();
      if (insertError) throw insertError;
      return jsonResponse({ data });
    }

    if (body.action === 'cleanup-upload') {
      if (typeof body.storagePath !== 'string'
        || !/^(home|sfeer|sfeer_album)\/[0-9a-f-]+\.(jpg|png|webp|gif)$/i.test(body.storagePath)) {
        return jsonResponse({ error: 'Ongeldig afbeeldingspad.' }, 400);
      }
      const { data: image, error: lookupError } = await supabase
        .from('gallery_images')
        .select('id')
        .eq('storage_path', body.storagePath)
        .maybeSingle();
      if (lookupError) throw lookupError;
      if (image) return jsonResponse({ error: 'De afbeelding is al aan een galerij gekoppeld.' }, 409);
      const { error: removeError } = await supabase.storage.from('site-gallery').remove([body.storagePath]);
      if (removeError) throw removeError;
      return jsonResponse({ data: { deleted: true } });
    }

    if (body.action === 'delete') {
      if (typeof body.id !== 'string' || !body.id) {
        return jsonResponse({ error: 'Ongeldig foto-ID.' }, 400);
      }
      const { data: image, error: lookupError } = await supabase
        .from('gallery_images')
        .select('storage_path')
        .eq('id', body.id)
        .maybeSingle();
      if (lookupError) throw lookupError;
      if (!image) return jsonResponse({ error: 'De foto bestaat niet meer.' }, 404);

      if (image.storage_path) {
        const { error: removeError } = await supabase.storage
          .from('site-gallery')
          .remove([image.storage_path]);
        if (removeError) throw removeError;
      }
      const { error: deleteError } = await supabase.from('gallery_images').delete().eq('id', body.id);
      if (deleteError) throw deleteError;
      return jsonResponse({ data: { deleted: true } });
    }

    return jsonResponse({ error: 'Onbekende actie.' }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Onbekende galerijfout.';
    console.error('manage-gallery failed:', message);
    return jsonResponse({ error: `Galerijactie mislukt: ${message}` }, 500);
  }
});
