import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ImagePlus, Trash2, ArrowLeft, Image as ImageIcon, Plus } from 'lucide-react';

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
};

type GalleryCollection = {
  id: number;
  title: string;
  description: string;
  images: GalleryImage[];
};

type MenuItem = {
  id: number;
  name: string;
  image?: string;
};

type MenuCategory = {
  id: number;
  title: string;
  icon: 'coffee' | 'snowflake' | 'cookie' | 'milk';
  items: MenuItem[];
};

type MenuData = {
  categories: MenuCategory[];
  milkOptions: string[];
};

const homeStorageKey = 'bonenbakkie-home-gallery';
const galleryStorageKey = 'bonenbakkie-gallery-collections';
const menuStorageKey = 'bonenbakkie-menu';

const defaultHomeGallery: GalleryImage[] = [
  { id: 1, src: '/bonenbakkie1.jpeg', alt: "'t bonenbakkie koffiewagen", title: 'Onze koffiewagen', description: 'In actie op locatie' },
  { id: 2, src: '/bonenbakkie2.png', alt: "Interieur van 't bonenbakkie", title: 'Sfeer binnenin', description: 'Een warm en stijlvol interieur' },
  { id: 3, src: '/Logo_bonenbakkie.jpeg', alt: 'Logo van het mobiele koffiehuisje', title: 'Ons merk', description: 'Karakter en identiteit' },
];

const defaultCollections: GalleryCollection[] = [
  {
    id: 1,
    title: 'Koffie op evenementen',
    description: 'Impressies van onze mobiele koffie op verschillende locaties.',
    images: [
      { id: 11, src: '/bonenbakkie1.jpeg', alt: 'Koffie op een evenement', title: 'Event 1', description: 'Sfeervol en gezellig' },
      { id: 12, src: '/bonenbakkie2.png', alt: 'Koffie en sfeer', title: 'Event 2', description: 'Perfect voor elke bijeenkomst' },
    ],
  },
];

const defaultMenu: MenuData = {
  categories: [
    {
      id: 1,
      title: 'WARME DRANKEN',
      icon: 'coffee',
      items: [
        { id: 1, name: 'ESPRESSO' },
        { id: 2, name: 'KOFFIE' },
        { id: 3, name: 'CAPPUCCINO' },
        { id: 4, name: 'FLAT WHITE' },
        { id: 5, name: 'KOFFIE VERKEERD' },
        { id: 6, name: 'LATTE MACCHIATO' },
        { id: 7, name: 'THEE' },
        { id: 8, name: 'MUNTTHEE' },
        { id: 9, name: 'GEMBERTHEE' }
      ]
    },
    {
      id: 2,
      title: 'KOUDE DRANKEN',
      icon: 'snowflake',
      items: [
        { id: 10, name: 'IJSKOFFIE' },
        { id: 11, name: 'MATCHA' },
        { id: 12, name: 'LIMONADE' }
      ]
    },
    {
      id: 3,
      title: 'ZOET & EXTRA',
      icon: 'cookie',
      items: [
        { id: 13, name: 'STROOPWAFEL' },
        { id: 14, name: 'KARAMEL' },
        { id: 15, name: 'VANILLE' },
        { id: 16, name: 'AARDBEI' },
        { id: 17, name: 'HAZELNOOT' },
        { id: 18, name: 'SLAGROOM' }
      ]
    }
  ],
  milkOptions: ['VOLLE KOEMELK', 'HAVERMELK', 'SOJAMELK', 'KOKOSMELK']
};

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [homeGallery, setHomeGallery] = useState<GalleryImage[]>(defaultHomeGallery);
  const [collections, setCollections] = useState<GalleryCollection[]>(defaultCollections);
  const [menuData, setMenuData] = useState<MenuData>(defaultMenu);
  const [selectedHomeFile, setSelectedHomeFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'sfeer' | 'menu'>('home');
  const [newHomeImage, setNewHomeImage] = useState('');
  const [newHomeAlt, setNewHomeAlt] = useState('Nieuwe homefoto');
  const [newHomeTitle, setNewHomeTitle] = useState('Nieuwe titel');
  const [newHomeDescription, setNewHomeDescription] = useState('Beschrijving');
  const [activeCollectionId, setActiveCollectionId] = useState<number>(defaultCollections[0]?.id ?? 0);
  const [newCollectionTitle, setNewCollectionTitle] = useState('Nieuwe albumtitel');
  const [newCollectionDescription, setNewCollectionDescription] = useState('Beschrijf dit album');
  const [newCollectionImage, setNewCollectionImage] = useState('');
  const [newCollectionImageAlt, setNewCollectionImageAlt] = useState('Nieuwe collagefoto');
  const [newCollectionImageTitle, setNewCollectionImageTitle] = useState('Nieuwe titel');
  const [newCollectionImageDescription, setNewCollectionImageDescription] = useState('Beschrijving');
  const [selectedCollectionFile, setSelectedCollectionFile] = useState<File | null>(null);
  
  // Menu states
  const [newMenuCategoryTitle, setNewMenuCategoryTitle] = useState('');
  const [newMenuCategoryIcon, setNewMenuCategoryIcon] = useState<'coffee' | 'snowflake' | 'cookie' | 'milk'>('coffee');
  const [activeCategoryId, setActiveCategoryId] = useState<number>(defaultMenu.categories[0]?.id ?? 0);
  const [newMenuItemName, setNewMenuItemName] = useState('');
  const [newMenuItemImage, setNewMenuItemImage] = useState('');
  const [selectedMenuItemFile, setSelectedMenuItemFile] = useState<File | null>(null);
  const [newMilkOption, setNewMilkOption] = useState('');

  useEffect(() => {
    try {
      const storedHome = window.localStorage.getItem(homeStorageKey);
      if (storedHome) {
        const parsedHome = JSON.parse(storedHome) as GalleryImage[];
        if (parsedHome.length) {
          setHomeGallery(parsedHome);
        }
      }

      const storedCollections = window.localStorage.getItem(galleryStorageKey);
      if (storedCollections) {
        const parsedCollections = JSON.parse(storedCollections) as GalleryCollection[];
        if (parsedCollections.length) {
          setCollections(parsedCollections);
          setActiveCollectionId(parsedCollections[0].id);
        }
      }
    } catch {
      // fallback to defaults
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(homeStorageKey, JSON.stringify(homeGallery));
      window.localStorage.setItem(galleryStorageKey, JSON.stringify(collections));
    } catch {
      // Ignore storage issues in demo mode
    }
  }, [homeGallery, collections]);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (password.trim().toLowerCase() === 'bonenbakkie') {
      setIsAuthenticated(true);
      setError('');
      return;
    }
    setError('Wachtwoord onjuist. Probeer bonenbakkie.');
  };

  const handleHomeFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedHomeFile(file);
      setNewHomeImage(reader.result as string);
      setNewHomeAlt(file.name.replace(/\.[^.]+$/, ''));
    };
    reader.readAsDataURL(file);
  };

  const handleCollectionFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedCollectionFile(file);
      setNewCollectionImage(reader.result as string);
      setNewCollectionImageAlt(file.name.replace(/\.[^.]+$/, ''));
    };
    reader.readAsDataURL(file);
  };

  const addHomeImage = () => {
    if (!newHomeImage.trim()) return;
    setHomeGallery((current) => [
      {
        id: Date.now(),
        src: newHomeImage,
        alt: newHomeAlt.trim() || 'Nieuwe homefoto',
        title: newHomeTitle.trim() || 'Nieuwe titel',
        description: newHomeDescription.trim() || 'Beschrijving',
      },
      ...current,
    ]);
    setNewHomeImage('');
    setSelectedHomeFile(null);
    setNewHomeAlt('Nieuwe homefoto');
    setNewHomeTitle('Nieuwe titel');
    setNewHomeDescription('Beschrijving');
  };

  const updateHomeImage = (id: number, field: 'src' | 'alt' | 'title' | 'description', value: string) => {
    setHomeGallery((current) => current.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeHomeImage = (id: number) => {
    setHomeGallery((current) => current.filter((item) => item.id !== id));
  };

  const addCollection = () => {
    if (!newCollectionTitle.trim()) return;
    const collection: GalleryCollection = {
      id: Date.now(),
      title: newCollectionTitle.trim(),
      description: newCollectionDescription.trim() || 'Beschrijving',
      images: [],
    };
    setCollections((current) => [collection, ...current]);
    setActiveCollectionId(collection.id);
    setNewCollectionTitle('Nieuwe albumtitel');
    setNewCollectionDescription('Beschrijf dit album');
  };

  const addImageToCollection = () => {
    if (!newCollectionImage.trim() || !activeCollectionId) return;
    setCollections((current) => current.map((collection) => (collection.id === activeCollectionId
      ? {
          ...collection,
          images: [
            {
              id: Date.now(),
              src: newCollectionImage,
              alt: newCollectionImageAlt.trim() || 'Nieuwe collagefoto',
              title: newCollectionImageTitle.trim() || 'Nieuwe titel',
              description: newCollectionImageDescription.trim() || 'Beschrijving',
            },
            ...collection.images,
          ],
        }
      : collection)));
    setNewCollectionImage('');
    setSelectedCollectionFile(null);
    setNewCollectionImageAlt('Nieuwe collagefoto');
    setNewCollectionImageTitle('Nieuwe titel');
    setNewCollectionImageDescription('Beschrijving');
  };

  const updateCollection = (id: number, field: 'title' | 'description', value: string) => {
    setCollections((current) => current.map((collection) => (collection.id === id ? { ...collection, [field]: value } : collection)));
  };

  const removeCollection = (id: number) => {
    setCollections((current) => current.filter((collection) => collection.id !== id));
    if (activeCollectionId === id) {
      const next = collections.find((collection) => collection.id !== id);
      setActiveCollectionId(next?.id ?? 0);
    }
  };

  const updateCollectionImage = (collectionId: number, imageId: number, field: 'src' | 'alt' | 'title' | 'description', value: string) => {
    setCollections((current) => current.map((collection) => (collection.id === collectionId ? {
      ...collection,
      images: collection.images.map((image) => (image.id === imageId ? { ...image, [field]: value } : image)),
    } : collection)));
  };

  const removeCollectionImage = (collectionId: number, imageId: number) => {
    setCollections((current) => current.map((collection) => (collection.id === collectionId ? {
      ...collection,
      images: collection.images.filter((image) => image.id !== imageId),
    } : collection)));
  };

  const summary = useMemo(() => {
    if (!homeGallery.length) return 'Nog geen homefoto\'s toegevoegd.';
    return `${homeGallery.length} homefoto${homeGallery.length === 1 ? '' : 's'} zichtbaar in de collage`;
  }, [homeGallery.length]);

  const activeCollection = collections.find((collection) => collection.id === activeCollectionId) ?? collections[0];

  return (
    <main className="min-h-screen px-4 py-24 sm:px-6 lg:px-8 text-[#f4f1ea]">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(83,64,38,0.95),rgba(44,27,16,0.95))] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[#e8d5b8]">Instellingen voor eigenaren</p>
            <h1 className="text-3xl sm:text-4xl font-serif">Beheer je content</h1>
            <p className="mt-3 max-w-3xl text-sm sm:text-base text-[#f4ebd9] opacity-90">
              Pas de home-collage aan, beheer de gallery-albums en upload nieuwe beelden rechtstreeks vanaf je pc.
            </p>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-[#f4ebd9]/40 px-4 py-2 text-sm text-[#f4ebd9] hover:bg-[#f4ebd9] hover:text-[#2c1b10]">
            <ArrowLeft size={16} /> Terug naar home
          </Link>
        </div>

        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="mt-10 max-w-md rounded-[1.5rem] border border-[#f4ebd9]/20 bg-[#f4ebd9]/10 p-6 backdrop-blur">
            <div className="mb-4 flex items-center gap-3 text-[#f4ebd9]">
              <Lock size={20} />
              <span className="font-semibold">Login voor eigenaren</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Typ het wachtwoord"
              className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-4 py-3 text-[#2c1b10] outline-none"
            />
            {error ? <p className="mt-3 text-sm text-[#ffd1b2]">{error}</p> : null}
            <button type="submit" className="mt-5 rounded-full bg-[#f4ebd9] px-5 py-3 font-semibold text-[#2c1b10] transition hover:translate-y-[-2px]">
              Inloggen
            </button>
          </form>
        ) : (
          <div className="mt-10 space-y-8">
            <div className="flex flex-wrap gap-3 rounded-full border border-[#f4ebd9]/20 bg-[#f4ebd9]/10 p-2">
              <button onClick={() => setActiveTab('home')} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === 'home' ? 'bg-[#f4ebd9] text-[#2c1b10]' : 'text-[#f4ebd9] hover:bg-[#f4ebd9]/10'}`}>
                Home gallery
              </button>
              <button onClick={() => setActiveTab('sfeer')} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === 'sfeer' ? 'bg-[#f4ebd9] text-[#2c1b10]' : 'text-[#f4ebd9] hover:bg-[#f4ebd9]/10'}`}>
                Sfeer gallery
              </button>
            </div>

            {activeTab === 'home' ? (
              <section className="rounded-[1.5rem] border border-[#f4ebd9]/20 bg-[#f4ebd9]/10 p-6 backdrop-blur">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-serif">Home collage</h2>
                    <p className="text-sm text-[#f4ebd9] opacity-80">Beheer de foto's die je op de homepage toont.</p>
                  </div>
                  <div className="rounded-full border border-[#f4ebd9]/20 px-3 py-1 text-sm text-[#f4ebd9]">{summary}</div>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
                  <div className="space-y-4">
                    <label className="flex cursor-pointer items-center gap-3 rounded-full border border-dashed border-[#f4ebd9]/40 px-4 py-3 text-sm text-[#f4ebd9] hover:bg-[#f4ebd9]/10">
                      <ImagePlus size={18} />
                      <span>{selectedHomeFile ? selectedHomeFile.name : 'Kies een afbeelding vanaf je pc'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleHomeFileSelect} />
                    </label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input value={newHomeAlt} onChange={(event) => setNewHomeAlt(event.target.value)} placeholder="Beschrijving" className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-4 py-3 text-[#2c1b10] outline-none" />
                      <input value={newHomeTitle} onChange={(event) => setNewHomeTitle(event.target.value)} placeholder="Titel" className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-4 py-3 text-[#2c1b10] outline-none" />
                    </div>
                    <input value={newHomeDescription} onChange={(event) => setNewHomeDescription(event.target.value)} placeholder="Korte omschrijving" className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-4 py-3 text-[#2c1b10] outline-none" />
                  </div>
                  <button onClick={addHomeImage} className="rounded-full bg-[#f4ebd9] px-5 py-3 font-semibold text-[#2c1b10] transition hover:translate-y-[-2px]">
                    Toevoegen
                  </button>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  {homeGallery.map((item) => (
                    <div key={item.id} className="rounded-[1.25rem] border border-[#f4ebd9]/20 bg-[#fffaf2]/10 p-4">
                      <img src={item.src} alt={item.alt} className="h-44 w-full rounded-[1rem] object-cover" />
                      <div className="mt-4 space-y-3">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <input value={item.alt} onChange={(event) => updateHomeImage(item.id, 'alt', event.target.value)} className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-4 py-2 text-[#2c1b10] outline-none" />
                          <input value={item.title || ''} onChange={(event) => updateHomeImage(item.id, 'title', event.target.value)} className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-4 py-2 text-[#2c1b10] outline-none" />
                        </div>
                        <input value={item.description || ''} onChange={(event) => updateHomeImage(item.id, 'description', event.target.value)} className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-4 py-2 text-[#2c1b10] outline-none" />
                        <div className="flex justify-end pt-2">
                          <button onClick={() => removeHomeImage(item.id)} className="rounded-full border border-[#f4ebd9]/30 px-3 py-2 text-sm text-[#ffd1b2] transition hover:bg-[#f4ebd9]/10">
                            <span className="flex items-center gap-2"><Trash2 size={16} /> Verwijderen</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {activeTab === 'sfeer' ? (
              <section className="rounded-[1.5rem] border border-[#f4ebd9]/20 bg-[#f4ebd9]/10 p-6 backdrop-blur">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-serif">Sfeer gallery</h2>
                    <p className="text-sm text-[#f4ebd9] opacity-80">Maak album-collages aan en vul ze met foto's, titels en beschrijvingen.</p>
                  </div>
                  <div className="rounded-full border border-[#f4ebd9]/20 px-3 py-1 text-sm text-[#f4ebd9]">{collections.length} album{collections.length === 1 ? '' : 's'}</div>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
                  <div className="space-y-4">
                    <input value={newCollectionTitle} onChange={(event) => setNewCollectionTitle(event.target.value)} className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-4 py-3 text-[#2c1b10] outline-none" placeholder="Albumtitel" />
                    <input value={newCollectionDescription} onChange={(event) => setNewCollectionDescription(event.target.value)} className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-4 py-3 text-[#2c1b10] outline-none" placeholder="Beschrijving van dit album" />
                  </div>
                  <button onClick={addCollection} className="rounded-full bg-[#f4ebd9] px-5 py-3 font-semibold text-[#2c1b10] transition hover:translate-y-[-2px]">
                    Nieuw album
                  </button>
                </div>

                <div className="mt-6 grid gap-4 xl:grid-cols-[280px_1fr]">
                  <div className="space-y-3">
                    {collections.map((collection) => (
                      <button
                        key={collection.id}
                        onClick={() => setActiveCollectionId(collection.id)}
                        className={`w-full rounded-[1rem] border px-4 py-3 text-left transition ${activeCollectionId === collection.id ? 'border-[#f4ebd9] bg-[#f4ebd9]/20' : 'border-[#f4ebd9]/20 bg-[#fffaf2]/10'}`}
                      >
                        <div className="flex items-center gap-2 text-[#f4ebd9]">
                          <ImageIcon size={16} />
                          <span className="font-semibold">{collection.title}</span>
                        </div>
                        <p className="mt-2 text-sm text-[#f4ebd9] opacity-80">{collection.description}</p>
                      </button>
                    ))}
                  </div>

                  {activeCollection ? (
                    <div className="rounded-[1.25rem] border border-[#f4ebd9]/20 bg-[#fffaf2]/10 p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-xl font-serif">{activeCollection.title}</h3>
                          <p className="text-sm text-[#f4ebd9] opacity-80">{activeCollection.description}</p>
                        </div>
                        <button onClick={() => removeCollection(activeCollection.id)} className="rounded-full border border-[#f4ebd9]/30 px-3 py-2 text-sm text-[#ffd1b2] transition hover:bg-[#f4ebd9]/10">
                          <span className="flex items-center gap-2"><Trash2 size={16} /> Verwijder album</span>
                        </button>
                      </div>

                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <div className="space-y-3 rounded-[1rem] border border-[#f4ebd9]/20 bg-[#f4ebd9]/10 p-4">
                          <input value={activeCollection.title} onChange={(event) => updateCollection(activeCollection.id, 'title', event.target.value)} className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-4 py-2 text-[#2c1b10] outline-none" placeholder="Albumtitel" />
                          <input value={activeCollection.description} onChange={(event) => updateCollection(activeCollection.id, 'description', event.target.value)} className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-4 py-2 text-[#2c1b10] outline-none" placeholder="Albumbeschrijving" />
                        </div>
                        <div className="space-y-3 rounded-[1rem] border border-[#f4ebd9]/20 bg-[#f4ebd9]/10 p-4">
                          <label className="flex cursor-pointer items-center gap-3 rounded-full border border-dashed border-[#f4ebd9]/40 px-4 py-3 text-sm text-[#f4ebd9] hover:bg-[#f4ebd9]/10">
                            <ImagePlus size={18} />
                            <span>{selectedCollectionFile ? selectedCollectionFile.name : 'Foto toevoegen aan album'}</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleCollectionFileSelect} />
                          </label>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <input value={newCollectionImageAlt} onChange={(event) => setNewCollectionImageAlt(event.target.value)} placeholder="Beschrijving" className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-4 py-3 text-[#2c1b10] outline-none" />
                            <input value={newCollectionImageTitle} onChange={(event) => setNewCollectionImageTitle(event.target.value)} placeholder="Titel" className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-4 py-3 text-[#2c1b10] outline-none" />
                          </div>
                          <input value={newCollectionImageDescription} onChange={(event) => setNewCollectionImageDescription(event.target.value)} placeholder="Korte omschrijving" className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-4 py-3 text-[#2c1b10] outline-none" />
                          <button onClick={addImageToCollection} className="rounded-full bg-[#f4ebd9] px-5 py-3 font-semibold text-[#2c1b10] transition hover:translate-y-[-2px]">
                            Foto toevoegen
                          </button>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {activeCollection.images.map((image) => (
                          <div key={image.id} className="rounded-[1rem] border border-[#f4ebd9]/20 bg-[#fffaf2]/10 p-3">
                            <img src={image.src} alt={image.alt} className="h-40 w-full rounded-[0.9rem] object-cover" />
                            <div className="mt-3 space-y-2">
                              <div className="grid gap-2 sm:grid-cols-2">
                                <input value={image.alt} onChange={(event) => updateCollectionImage(activeCollection.id, image.id, 'alt', event.target.value)} className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-3 py-2 text-[#2c1b10] outline-none" />
                                <input value={image.title || ''} onChange={(event) => updateCollectionImage(activeCollection.id, image.id, 'title', event.target.value)} className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-3 py-2 text-[#2c1b10] outline-none" />
                              </div>
                              <input value={image.description || ''} onChange={(event) => updateCollectionImage(activeCollection.id, image.id, 'description', event.target.value)} className="w-full rounded-full border border-[#f4ebd9]/30 bg-[#fff8ec] px-3 py-2 text-[#2c1b10] outline-none" />
                              <div className="flex justify-end">
                                <button onClick={() => removeCollectionImage(activeCollection.id, image.id)} className="rounded-full border border-[#f4ebd9]/30 px-3 py-2 text-sm text-[#ffd1b2] transition hover:bg-[#f4ebd9]/10">
                                  <span className="flex items-center gap-2"><Trash2 size={16} /> Verwijderen</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </section>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
};

export default Admin;
