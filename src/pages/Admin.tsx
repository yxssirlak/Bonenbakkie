import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Coffee,
  Eye,
  EyeOff,
  Home,
  Images,
  Loader2,
  Lock,
  Plus,
  Sparkles,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  authenticateGalleryAdmin,
  deleteAlbum,
  deleteGalleryImage,
  fetchGallery,
  GalleryImage,
  GalleryName,
  groupAlbums,
  PhotoSize,
  reorderGallery,
  updateAlbum,
  updateGalleryImage,
  uploadGalleryFile,
  validateImageFile,
} from '../gallery';
import { DEFAULT_MENU, fetchMenu, MenuData, MenuItem, saveMenu, uploadMenuImage } from '../menu';
import Dropdown from '../components/Dropdown';
import PhotoCollage, { PHOTO_SIZES } from '../components/PhotoCollage';

type TabId = 'menu' | 'home' | 'sfeer' | 'events';

const TABS: Array<{ id: TabId; label: string; icon: React.ReactNode }> = [
  { id: 'menu', label: 'Menu', icon: <Coffee size={16} /> },
  { id: 'home', label: 'Home collage', icon: <Home size={16} /> },
  { id: 'sfeer', label: 'Carrousel', icon: <Sparkles size={16} /> },
  { id: 'events', label: 'Evenementen', icon: <Images size={16} /> },
];

const NEW_ALBUM = '__new__';

// Donker thema voor het hele paneel: licht gekleurde utilities worden hier omgezet.
const ADMIN_DARK_CSS = `
.admin-dark .text-\\[\\#534026\\] { color: #d4cab4; }
.admin-dark .text-\\[\\#534026\\]\\/80, .admin-dark .text-\\[\\#534026\\]\\/70 { color: rgba(244,241,234,0.7); }
.admin-dark .bg-white\\/60 { background-color: rgba(255,255,255,0.05); }
.admin-dark .bg-white\\/70 { background-color: rgba(255,255,255,0.07); }
.admin-dark .bg-white\\/80 { background-color: rgba(255,255,255,0.08); }
.admin-dark .bg-white\\/90, .admin-dark .bg-white\\/90.text-\\[\\#534026\\] { color: #534026; }
.admin-dark .border-\\[\\#534026\\]\\/15 { border-color: rgba(255,255,255,0.1); }
.admin-dark .border-\\[\\#534026\\]\\/30 { border-color: rgba(212,202,180,0.3); }
.admin-dark .bg-\\[\\#534026\\]\\/10 { background-color: rgba(255,255,255,0.08); }
.admin-dark .bg-\\[\\#534026\\] { background-color: #7a5c35; }
.admin-dark .text-red-700:not(.bg-white\\/90) { color: #fca5a5; }
.admin-dark input:not([type=file]) { color: #f4f1ea; }
.admin-dark input::placeholder { color: rgba(244,241,234,0.4); }
.admin-dark input:focus { border-color: #d4cab4; box-shadow: 0 0 0 2px rgba(212,202,180,0.2); }
.admin-dark button:disabled { opacity: 0.4; }
.admin-dark input[type=file] { color: rgba(244,241,234,0.7); }
.admin-dark input[type=file]::file-selector-button { color: #f4f1ea; background-color: rgba(255,255,255,0.12); }
`;

const inputClass =
  'w-full rounded-xl border border-[#534026]/30 bg-white/70 px-4 py-2.5 text-[#1e0f0a] placeholder:text-[#534026]/50 outline-none transition focus:border-[#534026] focus:ring-2 focus:ring-[#534026]/20';
const buttonClass =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-[#534026] px-5 py-2.5 font-medium text-[#f4f1ea] transition hover:bg-[#3d2e1b] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50';
const cardClass = 'rounded-3xl border border-[#534026]/15 bg-white/60 p-5 shadow-sm sm:p-6';

const errorMessage = (error: unknown, fallback: string) => (error instanceof Error ? error.message : fallback);

const SizePicker: React.FC<{ value: PhotoSize; onChange: (size: PhotoSize) => void; compact?: boolean }> = ({ value, onChange, compact }) => (
  <div className="flex flex-wrap gap-2">
    {PHOTO_SIZES.map((size) => (
      <button
        key={size.value}
        type="button"
        onClick={() => onChange(size.value)}
        className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm transition active:scale-95 ${
          value === size.value
            ? 'border-[#534026] bg-[#534026] text-[#f4f1ea]'
            : 'border-[#534026]/30 bg-white/80 text-[#534026] hover:border-[#534026]'
        }`}
      >
        <span
          className="grid gap-px"
          style={{ gridTemplateColumns: `repeat(${size.cols}, 0.4rem)`, gridTemplateRows: `repeat(${size.rows}, 0.4rem)` }}
        >
          {Array.from({ length: size.cols * size.rows }).map((_, index) => (
            <span key={index} className="rounded-[2px] bg-current opacity-70" />
          ))}
        </span>
        {!compact && size.label}
      </button>
    ))}
  </div>
);

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('menu');
  const [isLoaded, setIsLoaded] = useState(false);
  const [toast, setToast] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  const [menu, setMenu] = useState<MenuData>(DEFAULT_MENU);
  const [menuStatus, setMenuStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const menuTimer = useRef<number | undefined>(undefined);
  const latestMenu = useRef<MenuData>(DEFAULT_MENU);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newItemCat, setNewItemCat] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemImage, setNewItemImage] = useState<File | null>(null);
  const menuFileRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [busy, setBusy] = useState(false);
  const [homeFiles, setHomeFiles] = useState<File[]>([]);
  const [homeSize, setHomeSize] = useState<PhotoSize>('small');
  const homeFileRef = useRef<HTMLInputElement>(null);
  const [slideFiles, setSlideFiles] = useState<File[]>([]);
  const slideFileRef = useRef<HTMLInputElement>(null);
  const [albumChoice, setAlbumChoice] = useState(NEW_ALBUM);
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumDesc, setAlbumDesc] = useState('');
  const [albumFiles, setAlbumFiles] = useState<File[]>([]);
  const albumFileRef = useRef<HTMLInputElement>(null);
  const [openAlbum, setOpenAlbum] = useState<string | null>(null);
  const [albumEdits, setAlbumEdits] = useState<Record<string, { title: string; description: string }>>({});

  const notify = useCallback((type: 'ok' | 'error', text: string) => {
    window.clearTimeout(toastTimer.current);
    setToast({ type, text });
    toastTimer.current = window.setTimeout(() => setToast(null), 3500);
  }, []);

  const homeImages = images.filter((image) => image.gallery === 'home');
  const slideImages = images.filter((image) => image.gallery === 'sfeer');
  const albums = groupAlbums(images.filter((image) => image.gallery === 'sfeer_album'));

  const reloadGallery = useCallback(async () => {
    setImages(await fetchGallery(['home', 'sfeer', 'sfeer_album']));
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      await authenticateGalleryAdmin(password);
      setIsAuthenticated(true);
    } catch (error) {
      setLoginError(errorMessage(error, 'Inloggen is mislukt.'));
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return undefined;
    let cancelled = false;
    const load = async () => {
      try {
        const remoteMenu = await fetchMenu();
        let initial = remoteMenu;
        if (!initial) {
          // Eerste keer: neem het oude lokaal opgeslagen menu over, anders de standaard.
          try {
            const cats = JSON.parse(localStorage.getItem('bonenbakkie-menu-categories') ?? 'null');
            const items = JSON.parse(localStorage.getItem('bonenbakkie-menu-items') ?? 'null');
            if (Array.isArray(cats) && cats.length && Array.isArray(items)) initial = { categories: cats, items };
          } catch {
            initial = null;
          }
        }
        const loaded = initial ?? DEFAULT_MENU;
        if (!cancelled) {
          latestMenu.current = loaded;
          setMenu(loaded);
          setNewItemCat(loaded.categories[0]?.id ?? '');
        }
        await reloadGallery();
      } catch (error) {
        if (!cancelled) notify('error', errorMessage(error, 'Laden is mislukt.'));
      } finally {
        if (!cancelled) setIsLoaded(true);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, reloadGallery, notify]);

  useEffect(() => () => {
    window.clearTimeout(menuTimer.current);
    window.clearTimeout(toastTimer.current);
  }, []);

  const flushMenu = useCallback(async () => {
    setMenuStatus('saving');
    try {
      await saveMenu(password, latestMenu.current);
      setMenuStatus('saved');
    } catch (error) {
      setMenuStatus('error');
      notify('error', errorMessage(error, 'Menu opslaan is mislukt.'));
    }
  }, [password, notify]);

  // Elke menuwijziging wordt (kort gebundeld) direct naar de website gepusht.
  const commitMenu = useCallback((next: MenuData) => {
    latestMenu.current = next;
    setMenu(next);
    setMenuStatus('saving');
    window.clearTimeout(menuTimer.current);
    menuTimer.current = window.setTimeout(() => { void flushMenu(); }, 700);
  }, [flushMenu]);

  const addCategory = () => {
    const name = newCategoryName.trim();
    if (!name) return;
    const id = `cat-${Date.now()}`;
    commitMenu({ ...menu, categories: [...menu.categories, { id, name }] });
    if (!newItemCat) setNewItemCat(id);
    setNewCategoryName('');
  };

  const deleteCategory = (id: string) => {
    if (!window.confirm('Categorie en alle bijbehorende items verwijderen?')) return;
    const categories = menu.categories.filter((category) => category.id !== id);
    commitMenu({ categories, items: menu.items.filter((item) => item.categoryId !== id) });
    if (newItemCat === id) setNewItemCat(categories[0]?.id ?? '');
  };

  const addItem = async () => {
    const name = newItemName.trim();
    if (!name || !newItemCat) {
      notify('error', 'Kies een categorie en vul een naam in.');
      return;
    }
    setBusy(true);
    try {
      const imageUrl = newItemImage ? await uploadMenuImage(password, newItemImage) : undefined;
      const item: MenuItem = { id: `item-${Date.now()}`, categoryId: newItemCat, name, description: newItemDesc.trim(), imageUrl };
      commitMenu({ ...menu, items: [...menu.items, item] });
      setNewItemName('');
      setNewItemDesc('');
      setNewItemImage(null);
      if (menuFileRef.current) menuFileRef.current.value = '';
    } catch (error) {
      notify('error', errorMessage(error, 'Item toevoegen is mislukt.'));
    } finally {
      setBusy(false);
    }
  };

  const updateItem = (id: string, changes: Partial<MenuItem>) => {
    commitMenu({ ...menu, items: menu.items.map((item) => (item.id === id ? { ...item, ...changes } : item)) });
  };

  const setItemImage = async (id: string, file: File) => {
    const problem = validateImageFile(file);
    if (problem) {
      notify('error', problem);
      return;
    }
    setBusy(true);
    try {
      const imageUrl = await uploadMenuImage(password, file);
      commitMenu({
        ...latestMenu.current,
        items: latestMenu.current.items.map((item) => (item.id === id ? { ...item, imageUrl } : item)),
      });
    } catch (error) {
      notify('error', errorMessage(error, 'Foto uploaden is mislukt.'));
    } finally {
      setBusy(false);
    }
  };

  const pickFiles = (event: React.ChangeEvent<HTMLInputElement>, set: (files: File[]) => void) => {
    const files = Array.from(event.target.files ?? []);
    const problem = files.map(validateImageFile).find(Boolean);
    if (problem) {
      notify('error', problem);
      event.target.value = '';
      set([]);
      return;
    }
    set(files);
  };

  const runGalleryAction = async (action: () => Promise<unknown>, success?: string) => {
    setBusy(true);
    try {
      await action();
      await reloadGallery();
      if (success) notify('ok', success);
    } catch (error) {
      notify('error', errorMessage(error, 'Er is iets misgegaan.'));
    } finally {
      setBusy(false);
    }
  };

  const uploadMany = async (files: File[], gallery: GalleryName, meta: { title?: string; description?: string; size?: PhotoSize }) => {
    for (const file of files) {
      await uploadGalleryFile(password, gallery, file, {
        alt: meta.title || file.name.replace(/\.[^.]+$/, ''),
        title: meta.title,
        description: meta.description,
        size: meta.size,
      });
    }
  };

  const uploadHome = () => runGalleryAction(async () => {
    await uploadMany(homeFiles, 'home', { size: homeSize });
    setHomeFiles([]);
    if (homeFileRef.current) homeFileRef.current.value = '';
  }, 'Foto’s toegevoegd aan de collage.');

  const uploadSlides = () => runGalleryAction(async () => {
    await uploadMany(slideFiles, 'sfeer', {});
    setSlideFiles([]);
    if (slideFileRef.current) slideFileRef.current.value = '';
  }, 'Foto’s toegevoegd aan de carrousel.');

  const uploadAlbum = () => {
    const isNew = albumChoice === NEW_ALBUM;
    const title = (isNew ? albumTitle : albumChoice).trim();
    if (!title) {
      notify('error', 'Geef het album een naam.');
      return Promise.resolve();
    }
    const existing = albums.find((album) => album.title === title);
    const description = isNew ? albumDesc.trim() : existing?.description ?? '';
    return runGalleryAction(async () => {
      await uploadMany(albumFiles, 'sfeer_album', { title, description });
      setAlbumFiles([]);
      setAlbumTitle('');
      setAlbumDesc('');
      setAlbumChoice(title);
      setOpenAlbum(title);
      if (albumFileRef.current) albumFileRef.current.value = '';
    }, isNew ? `Album “${title}” aangemaakt.` : `Foto’s toegevoegd aan “${title}”.`);
  };

  const moveHomeImage = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= homeImages.length) return;
    const ids = homeImages.map((image) => image.id);
    [ids[index], ids[target]] = [ids[target], ids[index]];
    setImages((current) => [
      ...current.filter((image) => image.gallery !== 'home'),
      ...ids.map((id) => homeImages.find((image) => image.id === id) as GalleryImage),
    ]);
    void runGalleryAction(() => reorderGallery(password, ids));
  };

  const removeImage = (id: string) => {
    if (!window.confirm('Deze foto verwijderen?')) return;
    void runGalleryAction(() => deleteGalleryImage(password, id), 'Foto verwijderd.');
  };

  const changeSize = (image: GalleryImage, size: PhotoSize) => {
    setImages((current) => current.map((item) => (item.id === image.id ? { ...item, size } : item)));
    void runGalleryAction(() => updateGalleryImage(password, image.id, { size }));
  };

  const albumOptions = [
    { value: NEW_ALBUM, label: 'Nieuw album', hint: 'Maak een nieuw album aan' },
    ...albums.map((album) => ({ value: album.title, label: album.title, hint: `${album.images.length} foto’s` })),
  ];

  const MenuSaveStatus = () => (
    <span className="inline-flex items-center gap-2 text-sm text-[#534026]">
      {menuStatus === 'saving' && (<><Loader2 size={14} className="animate-spin" /> Opslaan…</>)}
      {menuStatus === 'saved' && (<><Check size={14} className="text-green-700" /> Live op de website</>)}
      {menuStatus === 'error' && <span className="text-red-700">Opslaan mislukt</span>}
    </span>
  );

  if (!isAuthenticated) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1e0f0a] px-4">
        <style>{`@keyframes loginShake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}`}</style>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7a5c35]/20 blur-3xl" />
        <form
          onSubmit={handleLogin}
          key={loginError}
          style={loginError ? { animation: 'loginShake 0.4s ease-in-out' } : undefined}
          className="fade-in-up relative w-full max-w-sm rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-10"
        >
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d4cab4]/30 bg-[#d4cab4]/10 text-[#d4cab4]">
              <Lock size={26} />
            </div>
            <h1 className="font-serif text-3xl">Beheer</h1>
            <p className="text-sm text-[#f4f1ea]/60">Log in om menu, foto's en albums te beheren.</p>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => { setPassword(event.target.value); if (loginError) setLoginError(''); }}
              placeholder="Wachtwoord"
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/10 bg-black/25 py-3 pl-4 pr-12 text-[#f4f1ea] placeholder:text-[#f4f1ea]/40 outline-none transition focus:border-[#d4cab4] focus:ring-2 focus:ring-[#d4cab4]/20"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#d4cab4]/70 transition hover:text-[#d4cab4]"
              aria-label={showPassword ? 'Verberg wachtwoord' : 'Toon wachtwoord'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className={`overflow-hidden text-sm text-red-300 transition-all duration-300 ${loginError ? 'mt-3 max-h-10 opacity-100' : 'max-h-0 opacity-0'}`}>{loginError}</p>
          <button
            type="submit"
            disabled={!password || isLoggingIn}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4cab4] px-5 py-3 font-medium text-[#1e0f0a] transition hover:bg-[#e6dec9] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoggingIn && <Loader2 size={16} className="animate-spin" />}
            Inloggen
          </button>
        </form>
      </main>
    );
  }

  const activeIndex = TABS.findIndex((tab) => tab.id === activeTab);

  return (
    <main className="admin-dark min-h-screen bg-[#1e0f0a] px-4 pb-24 pt-28 text-[#f4f1ea] sm:px-6">
      <style>{ADMIN_DARK_CSS}</style>
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 font-serif text-3xl text-[#534026]">Beheerpaneel</h1>
        <p className="mb-6 text-sm text-[#534026]/80">Elke tab hoort bij een pagina op de website. Wijzigingen staan direct live.</p>

        <div className="relative mb-8 grid grid-cols-2 rounded-2xl bg-[#534026]/10 p-1 sm:grid-cols-4">
          <div
            className="absolute bottom-1 top-1 hidden rounded-xl bg-[#534026] shadow transition-transform duration-300 ease-out sm:block"
            style={{ width: 'calc((100% - 0.5rem) / 4)', transform: `translateX(${activeIndex * 100}%)` }}
          />
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative z-10 flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-300 ${
                activeTab === tab.id ? 'bg-[#534026] text-[#f4f1ea] sm:bg-transparent' : 'text-[#534026] hover:text-[#1e0f0a]'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {!isLoaded ? (
          <div className="flex justify-center py-20 text-[#534026]"><Loader2 className="animate-spin" /></div>
        ) : (
          <div key={activeTab} className="fade-in-up space-y-6">
            {activeTab === 'menu' && (
              <>
                <div className="flex justify-end"><MenuSaveStatus /></div>

                <section className={cardClass}>
                  <h2 className="mb-4 font-serif text-xl text-[#534026]">Categorieën</h2>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {menu.categories.map((category) => (
                      <span key={category.id} className="inline-flex items-center gap-2 rounded-full bg-[#534026]/10 py-1.5 pl-4 pr-2 text-sm">
                        {category.name}
                        <button type="button" onClick={() => deleteCategory(category.id)} className="rounded-full p-1 text-[#534026] transition hover:bg-red-100 hover:text-red-700" aria-label={`Verwijder ${category.name}`}>
                          <Trash2 size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={newCategoryName} onChange={(event) => setNewCategoryName(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && addCategory()} placeholder="Nieuwe categorie" className={inputClass} />
                    <button type="button" onClick={addCategory} className={buttonClass}><Plus size={16} /> Toevoegen</button>
                  </div>
                </section>

                <section className={cardClass}>
                  <h2 className="mb-4 font-serif text-xl text-[#534026]">Nieuw item</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Dropdown
                      value={newItemCat}
                      onChange={setNewItemCat}
                      placeholder="Kies categorie"
                      options={menu.categories.map((category) => ({ value: category.id, label: category.name }))}
                    />
                    <input value={newItemName} onChange={(event) => setNewItemName(event.target.value)} placeholder="Naam" className={inputClass} />
                    <input value={newItemDesc} onChange={(event) => setNewItemDesc(event.target.value)} placeholder="Omschrijving" className={`${inputClass} sm:col-span-2`} />
                    <input
                      ref={menuFileRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={(event) => {
                        const file = event.target.files?.[0] ?? null;
                        const problem = file ? validateImageFile(file) : null;
                        if (problem) {
                          notify('error', problem);
                          event.target.value = '';
                          setNewItemImage(null);
                        } else {
                          setNewItemImage(file);
                        }
                      }}
                      className="text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#534026]/10 file:px-3 file:py-2 file:text-[#534026]"
                    />
                    <button type="button" onClick={() => void addItem()} disabled={busy} className={buttonClass}>
                      {busy ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Item toevoegen
                    </button>
                  </div>
                </section>

                {menu.categories.map((category) => {
                  const categoryItems = menu.items.filter((item) => item.categoryId === category.id);
                  return (
                    <section key={category.id} className={cardClass}>
                      <h2 className="mb-4 font-serif text-xl text-[#534026]">{category.name}</h2>
                      {categoryItems.length === 0 && <p className="text-sm text-[#534026]/70">Nog geen items.</p>}
                      <div className="space-y-3">
                        {categoryItems.map((item) => (
                          <div key={item.id} className="grid gap-2 rounded-2xl bg-white/70 p-3 sm:grid-cols-[1fr_1.5fr_auto] sm:items-center">
                            <input defaultValue={item.name} onBlur={(event) => event.target.value !== item.name && updateItem(item.id, { name: event.target.value })} className={inputClass} />
                            <input defaultValue={item.description} onBlur={(event) => event.target.value !== item.description && updateItem(item.id, { description: event.target.value })} className={inputClass} />
                            <div className="flex items-center gap-2">
                              {item.imageUrl && <img src={item.imageUrl} alt="" className="h-10 w-10 rounded-lg object-cover" />}
                              <label className="cursor-pointer rounded-lg bg-[#534026]/10 px-3 py-2 text-xs text-[#534026] transition hover:bg-white/15 active:scale-95">
                                {item.imageUrl ? 'Wijzig foto' : 'Foto toevoegen'}
                                <input
                                  type="file"
                                  accept="image/jpeg,image/png,image/webp,image/gif"
                                  className="hidden"
                                  onChange={(event) => {
                                    const file = event.target.files?.[0];
                                    event.target.value = '';
                                    if (file) void setItemImage(item.id, file);
                                  }}
                                />
                              </label>
                              {item.imageUrl && (
                                <button type="button" onClick={() => updateItem(item.id, { imageUrl: undefined })} className="text-xs text-[#534026] underline">
                                  foto weg
                                </button>
                              )}
                              <button type="button" onClick={() => commitMenu({ ...menu, items: menu.items.filter((other) => other.id !== item.id) })} className="rounded-lg p-2 text-red-700 transition hover:bg-red-100" aria-label={`Verwijder ${item.name}`}>
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </>
            )}

            {activeTab === 'home' && (
              <>
                <section className={cardClass}>
                  <h2 className="mb-1 font-serif text-xl text-[#534026]">Foto’s voor de homepage</h2>
                  <p className="mb-4 text-sm text-[#534026]/80">Kies een formaat en upload. Je kunt het formaat en de volgorde hieronder nog aanpassen.</p>
                  <div className="space-y-4">
                    <SizePicker value={homeSize} onChange={setHomeSize} />
                    <input
                      ref={homeFileRef}
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={(event) => pickFiles(event, setHomeFiles)}
                      className="block text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#534026]/10 file:px-3 file:py-2 file:text-[#534026]"
                    />
                    <button type="button" onClick={() => void uploadHome()} disabled={busy || homeFiles.length === 0} className={buttonClass}>
                      {busy ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} {homeFiles.length > 1 ? `${homeFiles.length} foto’s uploaden` : 'Foto uploaden'}
                    </button>
                  </div>
                </section>

                <section className={cardClass}>
                  <h2 className="mb-4 font-serif text-xl text-[#534026]">Voorbeeld van de collage</h2>
                  {homeImages.length === 0 ? (
                    <p className="text-sm text-[#534026]/70">Nog geen foto’s. De website toont nu de standaardfoto’s.</p>
                  ) : (
                    <PhotoCollage
                      images={homeImages}
                      renderOverlay={(image, index) => (
                        <div className="absolute inset-0 flex flex-col justify-between bg-black/0 p-2 opacity-0 transition duration-300 focus-within:bg-black/40 focus-within:opacity-100 group-hover:bg-black/40 group-hover:opacity-100">
                          <div className="flex justify-between">
                            <div className="flex gap-1">
                              <button type="button" onClick={() => moveHomeImage(index, -1)} disabled={index === 0} className="rounded-lg bg-white/90 p-1.5 text-[#534026] disabled:opacity-40" aria-label="Eerder"><ArrowLeft size={14} /></button>
                              <button type="button" onClick={() => moveHomeImage(index, 1)} disabled={index === homeImages.length - 1} className="rounded-lg bg-white/90 p-1.5 text-[#534026] disabled:opacity-40" aria-label="Later"><ArrowRight size={14} /></button>
                            </div>
                            <button type="button" onClick={() => removeImage(image.id)} className="rounded-lg bg-white/90 p-1.5 text-red-700" aria-label="Verwijderen"><Trash2 size={14} /></button>
                          </div>
                          <SizePicker value={image.size ?? 'small'} onChange={(size) => changeSize(image, size)} compact />
                        </div>
                      )}
                    />
                  )}
                </section>
              </>
            )}

            {activeTab === 'sfeer' && (
              <>
                <section className={cardClass}>
                  <h2 className="mb-1 font-serif text-xl text-[#534026]">Carrousel op de Sfeer-pagina</h2>
                  <p className="mb-4 text-sm text-[#534026]/80">Deze foto’s schuiven bovenaan de Sfeer-pagina voorbij.</p>
                  <div className="space-y-4">
                    <input
                      ref={slideFileRef}
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={(event) => pickFiles(event, setSlideFiles)}
                      className="block text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#534026]/10 file:px-3 file:py-2 file:text-[#534026]"
                    />
                    <button type="button" onClick={() => void uploadSlides()} disabled={busy || slideFiles.length === 0} className={buttonClass}>
                      {busy ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} Uploaden
                    </button>
                  </div>
                </section>

                <section className={cardClass}>
                  <h2 className="mb-4 font-serif text-xl text-[#534026]">Huidige carrousel ({slideImages.length})</h2>
                  {slideImages.length === 0 ? (
                    <p className="text-sm text-[#534026]/70">Nog geen foto’s. De website toont nu de standaardfoto’s.</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                      {slideImages.map((image) => (
                        <div key={image.id} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                          <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                          <button type="button" onClick={() => removeImage(image.id)} className="absolute right-2 top-2 rounded-lg bg-white/90 p-1.5 text-red-700 opacity-0 transition group-hover:opacity-100 focus:opacity-100" aria-label="Verwijderen">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}

            {activeTab === 'events' && (
              <>
                <section className={cardClass}>
                  <h2 className="mb-1 font-serif text-xl text-[#534026]">Foto’s uploaden naar een album</h2>
                  <p className="mb-4 text-sm text-[#534026]/80">Kies een bestaand album of maak een nieuw album. Alle foto’s komen in dat album.</p>
                  <div className="space-y-3">
                    <Dropdown value={albumChoice} onChange={setAlbumChoice} options={albumOptions} />
                    {albumChoice === NEW_ALBUM && (
                      <div className="fade-in-up grid gap-3 sm:grid-cols-2">
                        <input value={albumTitle} onChange={(event) => setAlbumTitle(event.target.value)} placeholder="Albumnaam (bijv. Bruiloft Lisa & Tom)" className={inputClass} />
                        <input value={albumDesc} onChange={(event) => setAlbumDesc(event.target.value)} placeholder="Korte omschrijving" className={inputClass} />
                      </div>
                    )}
                    <input
                      ref={albumFileRef}
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={(event) => pickFiles(event, setAlbumFiles)}
                      className="block text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#534026]/10 file:px-3 file:py-2 file:text-[#534026]"
                    />
                    <button type="button" onClick={() => void uploadAlbum()} disabled={busy || albumFiles.length === 0} className={buttonClass}>
                      {busy ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} {albumFiles.length > 1 ? `${albumFiles.length} foto’s uploaden` : 'Uploaden'}
                    </button>
                  </div>
                </section>

                {albums.length === 0 && <p className="text-sm text-[#534026]/70">Nog geen albums.</p>}
                {albums.map((album) => {
                  const isOpen = openAlbum === album.title;
                  const edit = albumEdits[album.title] ?? { title: album.title, description: album.description };
                  return (
                    <section key={album.title} className={`${cardClass} overflow-hidden`}>
                      <button type="button" onClick={() => setOpenAlbum(isOpen ? null : album.title)} className="flex w-full items-center justify-between gap-4 text-left">
                        <span>
                          <span className="block font-serif text-xl text-[#534026]">{album.title}</span>
                          <span className="text-sm text-[#534026]/70">{album.images.length} foto’s</span>
                        </span>
                        <ChevronDown className={`shrink-0 text-[#534026] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'mt-5 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_1.5fr_auto]">
                            <input value={edit.title} onChange={(event) => setAlbumEdits({ ...albumEdits, [album.title]: { ...edit, title: event.target.value } })} className={inputClass} />
                            <input value={edit.description} onChange={(event) => setAlbumEdits({ ...albumEdits, [album.title]: { ...edit, description: event.target.value } })} placeholder="Omschrijving" className={inputClass} />
                            <button
                              type="button"
                              disabled={busy || !edit.title.trim()}
                              onClick={() => void runGalleryAction(async () => {
                                await updateAlbum(password, album.title, edit.title.trim(), edit.description.trim());
                                setAlbumEdits((current) => {
                                  const rest = { ...current };
                                  delete rest[album.title];
                                  return rest;
                                });
                                setOpenAlbum(edit.title.trim());
                              }, 'Album bijgewerkt.')}
                              className={buttonClass}
                            >
                              Opslaan
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                            {album.images.map((image) => (
                              <div key={image.id} className="group relative aspect-square overflow-hidden rounded-2xl">
                                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                                <button type="button" onClick={() => removeImage(image.id)} className="absolute right-2 top-2 rounded-lg bg-white/90 p-1.5 text-red-700 opacity-0 transition group-hover:opacity-100 focus:opacity-100" aria-label="Verwijderen">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Album “${album.title}” met alle foto’s verwijderen?`)) {
                                void runGalleryAction(() => deleteAlbum(password, album.title), 'Album verwijderd.');
                              }
                            }}
                            className="mt-4 inline-flex items-center gap-2 text-sm text-red-700 transition hover:underline"
                          >
                            <Trash2 size={14} /> Hele album verwijderen
                          </button>
                        </div>
                      </div>
                    </section>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>

      {toast && (
        <div className={`fade-in-up fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl px-5 py-3 text-sm shadow-xl ${toast.type === 'ok' ? 'bg-[#534026] text-[#f4f1ea]' : 'bg-red-700 text-white'}`}>
          {toast.text}
        </div>
      )}
    </main>
  );
};

export default Admin;
