import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const maxImageSize = 10 * 1024 * 1024;
const bucket = 'site-gallery';
const menuImagePath = /^menu\/[0-9a-f-]+\.(jpg|jpeg|png|webp|gif)$/i;

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

function text(value: unknown, max: number): string {
  return typeof value === 'string' ? value.slice(0, max) : '';
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: 'Alleen POST-verzoeken zijn toegestaan.' }, 405);

  try {
    const adminPassword = Deno.env.get('ADMIN_PASSWORD');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!adminPassword || !supabaseUrl || !serviceRoleKey) {
      return jsonResponse({ error: 'De menuserver is niet volledig geconfigureerd.' }, 500);
    }

    const body: unknown = await request.json();
    if (!isRecord(body) || typeof body.action !== 'string') return jsonResponse({ error: 'Ongeldig verzoek.' }, 400);
    if (body.password !== adminPassword) return jsonResponse({ error: 'Niet gemachtigd.' }, 401);

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    if (body.action === 'prepare-upload') {
      if (typeof body.contentType !== 'string' || !allowedImageTypes.has(body.contentType)
        || typeof body.size !== 'number' || !Number.isInteger(body.size)
        || body.size < 1 || body.size > maxImageSize) {
        return jsonResponse({ error: 'Gebruik een JPG-, PNG-, WEBP- of GIF-afbeelding tot 10 MB.' }, 400);
      }
      const storagePath = `menu/${crypto.randomUUID()}.${getExtension(body.contentType)}`;
      const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(storagePath);
      if (error) throw error;
      return jsonResponse({
        data: {
          storagePath: data.path,
          token: data.token,
          publicUrl: supabase.storage.from(bucket).getPublicUrl(data.path).data.publicUrl,
        },
      });
    }

    if (body.action === 'save') {
      if (!Array.isArray(body.categories) || !Array.isArray(body.items)
        || body.categories.length > 50 || body.items.length > 500) {
        return jsonResponse({ error: 'Ongeldig menu.' }, 400);
      }

      const categories = body.categories.filter(isRecord).map((category) => ({
        id: text(category.id, 64),
        name: text(category.name, 80),
      })).filter((category) => category.id && category.name);
      const categoryIds = new Set(categories.map((category) => category.id));

      const items = body.items.filter(isRecord).map((item) => ({
        id: text(item.id, 64),
        categoryId: text(item.categoryId, 64),
        name: text(item.name, 120),
        description: text(item.description, 600),
        imageUrl: text(item.imageUrl, 600),
      })).filter((item) => item.id && item.name && categoryIds.has(item.categoryId));

      const { data: previous, error: lookupError } = await supabase
        .from('site_menu')
        .select('items')
        .eq('id', 1)
        .maybeSingle();
      if (lookupError) throw lookupError;

      const { error: saveError } = await supabase
        .from('site_menu')
        .upsert({ id: 1, categories, items, updated_at: new Date().toISOString() });
      if (saveError) throw saveError;

      // Verwijder afbeeldingen die niet meer in het menu voorkomen
      const publicPrefix = supabase.storage.from(bucket).getPublicUrl('').data.publicUrl;
      const toPath = (url: unknown): string | null => {
        if (typeof url !== 'string' || !url.startsWith(publicPrefix)) return null;
        const path = url.slice(publicPrefix.length);
        return menuImagePath.test(path) ? path : null;
      };
      const kept = new Set(items.map((item) => toPath(item.imageUrl)).filter(Boolean));
      const obsolete = (Array.isArray(previous?.items) ? previous.items as unknown[] : [])
        .map((item) => (isRecord(item) ? toPath(item.imageUrl) : null))
        .filter((path): path is string => !!path && !kept.has(path));
      if (obsolete.length) {
        const { error: removeError } = await supabase.storage.from(bucket).remove(obsolete);
        if (removeError) console.error('Oude menuafbeeldingen verwijderen mislukt:', removeError.message);
      }

      return jsonResponse({ data: { categories, items } });
    }

    return jsonResponse({ error: 'Onbekende actie.' }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Onbekende menufout.';
    console.error('manage-menu failed:', message);
    return jsonResponse({ error: `Menuactie mislukt: ${message}` }, 500);
  }
});
