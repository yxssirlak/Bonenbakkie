import { supabase } from './supabaseClient';
import { BUCKET, invokeAction, validateImageFile } from './gallery';

export type MenuCategory = {
  id: string;
  name: string;
};

export type MenuItem = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  imageUrl?: string;
};

export type MenuData = {
  categories: MenuCategory[];
  items: MenuItem[];
};

export const DEFAULT_MENU: MenuData = {
  categories: [
    { id: '1', name: 'Warme Dranken' },
    { id: '2', name: 'Koude Dranken' },
    { id: '3', name: 'Lekkernijen' },
    { id: '4', name: "Extra's" },
    { id: '5', name: 'Soorten Melk' },
  ],
  items: [
    { id: '101', categoryId: '1', name: 'Espresso', description: 'Een krachtige, pure shot van onze premium bonen.' },
    { id: '102', categoryId: '1', name: 'Koffie', description: 'De klassieke, vertrouwde filterkoffie.' },
    { id: '103', categoryId: '1', name: 'Cappuccino', description: 'Rijke espresso met perfect opgeschuimde volle melk.' },
    { id: '104', categoryId: '1', name: 'Flat White', description: 'Dubbele ristretto met zacht microschuim.' },
    { id: '105', categoryId: '1', name: 'Koffie Verkeerd', description: 'Een milde koffie met veel warme melk.' },
    { id: '106', categoryId: '1', name: 'Latte Machiato', description: 'Warme melk en melkschuim met een shot espresso.' },
    { id: '107', categoryId: '1', name: 'Thee', description: 'Keuze uit diverse theesmaken.' },
    { id: '108', categoryId: '1', name: 'Munthee', description: 'Verse, verwarmende munthee.' },
    { id: '109', categoryId: '1', name: 'Gemberthee', description: 'Kruidige thee met verse gember.' },
    { id: '201', categoryId: '2', name: 'IJskoffie', description: 'Verfrissende ijskoude koffie.' },
    { id: '202', categoryId: '2', name: 'Matcha', description: 'Koude matcha latte met ijs.' },
    { id: '203', categoryId: '2', name: 'Limonade', description: 'Huisgemaakte, frisse limonade.' },
    { id: '301', categoryId: '3', name: 'Stroopwafel', description: 'Heerlijk voor bij de warme koffie.' },
    { id: '401', categoryId: '4', name: 'Karamel', description: 'Voeg een vleugje karamelsiroop toe.' },
    { id: '402', categoryId: '4', name: 'Vanille', description: 'Voeg een vleugje vanillesiroop toe.' },
    { id: '403', categoryId: '4', name: 'Aarbei', description: 'Voeg een vleugje aardbeiensiroop toe.' },
    { id: '404', categoryId: '4', name: 'Hazelnoot', description: 'Voeg een vleugje hazelnootsiroop toe.' },
    { id: '405', categoryId: '4', name: 'Slagroom', description: 'Een flinke toef verse slagroom.' },
    { id: '501', categoryId: '5', name: 'Volle Koemelk', description: 'De klassieke, romige keuze.' },
    { id: '502', categoryId: '5', name: 'Havermelk', description: 'Plantaardig, mild en romig.' },
    { id: '503', categoryId: '5', name: 'Sojamelk', description: 'Plantaardig en vol van smaak.' },
    { id: '504', categoryId: '5', name: 'Kokosmelk', description: 'Plantaardig met een tropisch vleugje.' },
  ],
};

/** Geeft null terug als er nog geen menu in de database staat. */
export async function fetchMenu(): Promise<MenuData | null> {
  const { data, error } = await supabase
    .from('site_menu')
    .select('categories, items')
    .eq('id', 1)
    .maybeSingle();

  if (error) throw new Error(`Menu laden is mislukt: ${error.message}`);
  if (!data) return null;
  return {
    categories: Array.isArray(data.categories) ? (data.categories as MenuCategory[]) : [],
    items: Array.isArray(data.items) ? (data.items as MenuItem[]) : [],
  };
}

/** Roept onChange direct aan bij wijzigingen; peilt daarnaast als vangnet. */
export function subscribeToMenu(onChange: () => void): () => void {
  const channel = supabase
    .channel(`menu-${Math.random().toString(36).slice(2)}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'site_menu' }, onChange)
    .subscribe();
  const interval = window.setInterval(onChange, 20000);
  const onFocus = () => onChange();
  window.addEventListener('focus', onFocus);

  return () => {
    window.clearInterval(interval);
    window.removeEventListener('focus', onFocus);
    void supabase.removeChannel(channel);
  };
}

export function saveMenu(password: string, menu: MenuData): Promise<MenuData> {
  return invokeAction<MenuData>('manage-menu', { action: 'save', password, ...menu });
}

export async function uploadMenuImage(password: string, file: File): Promise<string> {
  const invalid = validateImageFile(file);
  if (invalid) throw new Error(invalid);

  const reservation = await invokeAction<{ storagePath: string; token: string; publicUrl: string }>('manage-menu', {
    action: 'prepare-upload',
    password,
    contentType: file.type,
    size: file.size,
  });
  const { error } = await supabase.storage
    .from(BUCKET)
    .uploadToSignedUrl(reservation.storagePath, reservation.token, file, { contentType: file.type });
  if (error) throw new Error(error.message);
  return reservation.publicUrl;
}
