import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Trash2, Plus, Image as ImageIcon, Coffee, Home, Lock } from 'lucide-react';

// --- STANDAARD DATA (FALLBACKS) ---
const defaultCats = [
  { id: '1', name: 'Warme Dranken' },
  { id: '2', name: 'Koude Dranken' },
  { id: '3', name: 'Lekkernijen' },
  { id: '4', name: "Extra's" },
  { id: '5', name: 'Soorten Melk' }
];

const defaultItems = [
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
];

const defaultHomeGallery = [
  { id: '1', src: '/bonenbakkie1.jpeg', alt: "'t bonenbakkie koffiewagen", title: 'Onze koffiewagen', description: 'In actie op locatie' },
  { id: '2', src: '/bonenbakkie2.png', alt: "Interieur van 't bonenbakkie", title: 'Sfeer binnenin', description: 'Een warm en stijlvol interieur' },
  { id: '3', src: '/Logo_bonenbakkie.jpeg', alt: 'Logo van het mobiele koffiehuisje', title: 'Ons merk', description: 'Karakter en identiteit' },
];

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'home' | 'sfeer' | 'menu'>('menu');
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs om de bestandsvelden leeg te maken na uploaden
  const menuFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);

  // --- MENU STATES ---
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newItemCat, setNewItemCat] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemImgBase64, setNewItemImgBase64] = useState('');

  // --- GALERIJ STATES ---
  const [homeImages, setHomeImages] = useState<any[]>([]);
  const [sfeerImages, setSfeerImages] = useState<any[]>([]);
  const [newGalleryImgBase64, setNewGalleryImgBase64] = useState('');
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryDesc, setNewGalleryDesc] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'bonenbakkie2026') { 
      setIsAuthenticated(true);
    } else {
      alert('Ongeldig wachtwoord');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const storedCats = localStorage.getItem('bonenbakkie-menu-categories');
      const storedItems = localStorage.getItem('bonenbakkie-menu-items');
      const storedHome = localStorage.getItem('bonenbakkie-home-gallery');
      const storedSfeer = localStorage.getItem('bonenbakkie-sfeer-gallery');

      if (storedCats && storedCats !== '[]') setCategories(JSON.parse(storedCats));
      else setCategories(defaultCats);

      if (storedItems && storedItems !== '[]') setItems(JSON.parse(storedItems));
      else setItems(defaultItems);

      if (storedHome && storedHome !== '[]') setHomeImages(JSON.parse(storedHome));
      else setHomeImages(defaultHomeGallery);

      if (storedSfeer && storedSfeer !== '[]') setSfeerImages(JSON.parse(storedSfeer));
      else setSfeerImages([]);

      setIsLoaded(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && isLoaded) {
      localStorage.setItem('bonenbakkie-menu-categories', JSON.stringify(categories));
      localStorage.setItem('bonenbakkie-menu-items', JSON.stringify(items));
      localStorage.setItem('bonenbakkie-home-gallery', JSON.stringify(homeImages));
      localStorage.setItem('bonenbakkie-sfeer-gallery', JSON.stringify(sfeerImages));
    }
  }, [categories, items, homeImages, sfeerImages, isAuthenticated, isLoaded]);

  // Helper functie om een bestand naar Base64 string om te zetten
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setBase64String: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64String(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setBase64String('');
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    const newCat = { id: Date.now().toString(), name: newCategoryName };
    setCategories([...categories, newCat]);
    setNewCategoryName('');
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm('Weet je zeker dat je deze categorie (en alle items erin) wilt verwijderen?')) {
      setCategories(categories.filter(c => c.id !== id));
      setItems(items.filter(i => i.categoryId !== id));
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemCat) {
      alert('Vul in ieder geval een naam en categorie in.');
      return;
    }
    const newItem = {
      id: Date.now().toString(),
      categoryId: newItemCat,
      name: newItemName,
      description: newItemDesc,
      imageUrl: newItemImgBase64,
    };
    setItems([...items, newItem]);
    
    setNewItemName('');
    setNewItemDesc('');
    setNewItemImgBase64('');
    if (menuFileRef.current) menuFileRef.current.value = '';
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryImgBase64) {
      alert('Selecteer eerst een afbeelding om te uploaden.');
      return;
    }
    const newImg = {
      id: Date.now().toString(),
      src: newGalleryImgBase64,
      alt: newGalleryTitle || 'Foto',
      title: newGalleryTitle,
      description: newGalleryDesc,
    };

    if (activeTab === 'home') setHomeImages([...homeImages, newImg]);
    else if (activeTab === 'sfeer') setSfeerImages([...sfeerImages, newImg]);

    setNewGalleryImgBase64('');
    setNewGalleryTitle('');
    setNewGalleryDesc('');
    if (galleryFileRef.current) galleryFileRef.current.value = '';
  };

  const handleDeleteImage = (id: string) => {
    if (activeTab === 'home') setHomeImages(homeImages.filter(i => i.id !== id));
    else if (activeTab === 'sfeer') setSfeerImages(sfeerImages.filter(i => i.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1e0f0a] flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="glass-card !bg-white/5 !backdrop-blur-xl border border-white/10 p-8 max-w-md w-full rounded-3xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-[var(--logo-cream)] rounded-full text-[var(--color-brown-main)]">
              <Lock size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-serif text-center text-[#f4f1ea] mb-8">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wachtwoord"
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white mb-6 focus:outline-none focus:border-[#d4cab4]"
          />
          <button type="submit" className="w-full bg-[#f4f1ea] text-[#534026] font-bold py-3 rounded-xl hover:bg-white transition-colors">
            Inloggen
          </button>
        </form>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#1e0f0a] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-serif text-[#f4f1ea] mb-10 text-center">
          Beheerpaneel
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button onClick={() => setActiveTab('menu')} className={`px-6 py-2 rounded-full font-serif flex items-center gap-2 transition-all ${activeTab === 'menu' ? 'bg-[#f4f1ea] text-[#534026]' : 'bg-white/5 text-[#f4f1ea] hover:bg-white/10'}`}>
            <Coffee size={18} /> Menu Beheren
          </button>
          <button onClick={() => setActiveTab('home')} className={`px-6 py-2 rounded-full font-serif flex items-center gap-2 transition-all ${activeTab === 'home' ? 'bg-[#f4f1ea] text-[#534026]' : 'bg-white/5 text-[#f4f1ea] hover:bg-white/10'}`}>
            <Home size={18} /> Home Galerij
          </button>
          <button onClick={() => setActiveTab('sfeer')} className={`px-6 py-2 rounded-full font-serif flex items-center gap-2 transition-all ${activeTab === 'sfeer' ? 'bg-[#f4f1ea] text-[#534026]' : 'bg-white/5 text-[#f4f1ea] hover:bg-white/10'}`}>
            <ImageIcon size={18} /> Sfeer Galerij
          </button>
        </div>

        {/* --- 1. MENU AANPASSEN TAB --- */}
        {activeTab === 'menu' && (
          <div className="space-y-12 animate-fade-in-up">
            
            <div className="glass-card !bg-white/5 border border-white/10 p-8 rounded-[2rem]">
              <h2 className="text-2xl font-serif text-[#f4f1ea] mb-6 border-b border-white/10 pb-4">1. Menu Tabs (Categorieën)</h2>
              <form onSubmit={handleAddCategory} className="flex gap-4 mb-8">
                <input
                  type="text"
                  placeholder="Bv. Koude Drankjes"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-grow bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4cab4]"
                />
                <button type="submit" className="bg-[#f4f1ea] text-[#534026] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-colors">
                  <Plus size={20} /> Toevoegen
                </button>
              </form>

              <div className="flex flex-wrap gap-3">
                {categories.map(cat => (
                  <div key={cat.id} className="bg-black/30 border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 text-[#f4f1ea]">
                    <span>{cat.name}</span>
                    <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card !bg-white/5 border border-white/10 p-8 rounded-[2rem]">
              <h2 className="text-2xl font-serif text-[#f4f1ea] mb-6 border-b border-white/10 pb-4">2. Items Toevoegen</h2>
              
              {categories.length === 0 ? (
                <p className="text-white/50">Maak eerst een categorie aan hierboven voordat je items kunt toevoegen.</p>
              ) : (
                <form onSubmit={handleAddItem} className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-white/70">Kies Categorie</label>
                    <select value={newItemCat} onChange={(e) => setNewItemCat(e.target.value)} className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none">
                      <option value="" disabled>Selecteer een tab...</option>
                      {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-white/70">Naam Item</label>
                    <input type="text" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder="Bv. Iced Caramel Latte" className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none" />
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm text-white/70">Beschrijving (Optioneel)</label>
                    <textarea value={newItemDesc} onChange={(e) => setNewItemDesc(e.target.value)} placeholder="Wat zit erin?" className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none h-24" />
                  </div>

                  {/* VERNIEUWD: BESTAND UPLOADEN */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm text-white/70">Foto Uploaden (Optioneel)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      ref={menuFileRef}
                      onChange={(e) => handleFileUpload(e, setNewItemImgBase64)}
                      className="bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f4f1ea] file:text-[#534026] hover:file:bg-white transition-colors cursor-pointer" 
                    />
                    {/* Pre-view van de geselecteerde afbeelding */}
                    {newItemImgBase64 && (
                      <div className="mt-3">
                        <img src={newItemImgBase64} alt="Preview" className="w-24 h-24 object-cover rounded-xl border border-white/10" />
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 pt-4">
                    <button type="submit" className="w-full bg-[#f4f1ea] text-[#534026] px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors">
                      <CheckCircle size={20} /> Item Opslaan
                    </button>
                  </div>
                </form>
              )}

              <h3 className="text-xl font-serif text-[#f4f1ea] mb-4">Huidige Items</h3>
              <div className="space-y-4">
                {categories.map(cat => {
                  const catItems = items.filter(i => i.categoryId === cat.id);
                  if (catItems.length === 0) return null;
                  return (
                    <div key={cat.id} className="mb-6">
                      <h4 className="text-[#d4cab4] font-bold uppercase tracking-widest text-sm mb-3">{cat.name}</h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {catItems.map(item => (
                          <div key={item.id} className="bg-black/20 border border-white/10 p-4 rounded-xl flex justify-between items-center group">
                            <div className="flex items-center gap-4">
                              {item.imageUrl ? (
                                <img src={item.imageUrl} className="w-12 h-12 rounded-lg object-cover" alt="preview" />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-white/20"><Coffee size={20} /></div>
                              )}
                              <div>
                                <p className="text-[#f4f1ea] font-bold">{item.name}</p>
                              </div>
                            </div>
                            <button onClick={() => handleDeleteItem(item.id)} className="text-red-400 opacity-50 group-hover:opacity-100 transition-opacity p-2">
                              <Trash2 size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* --- 2. GALERIJ AANPASSEN TAB --- */}
        {(activeTab === 'home' || activeTab === 'sfeer') && (
          <div className="space-y-12 animate-fade-in-up">
            <div className="glass-card !bg-white/5 border border-white/10 p-8 rounded-[2rem]">
              <h2 className="text-2xl font-serif text-[#f4f1ea] mb-6 border-b border-white/10 pb-4">
                Foto Toevoegen aan {activeTab === 'home' ? 'Home' : 'Sfeer'} Galerij
              </h2>
              
              <form onSubmit={handleAddImage} className="grid md:grid-cols-2 gap-6 mb-12">
                
                {/* VERNIEUWD: BESTAND UPLOADEN VOOR GALERIJ */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm text-white/70">Foto Uploaden</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    ref={galleryFileRef}
                    onChange={(e) => handleFileUpload(e, setNewGalleryImgBase64)}
                    className="bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f4f1ea] file:text-[#534026] hover:file:bg-white transition-colors cursor-pointer" 
                  />
                  {newGalleryImgBase64 && (
                    <div className="mt-3">
                      <img src={newGalleryImgBase64} alt="Preview" className="w-full h-48 object-cover rounded-xl border border-white/10" />
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-white/70">Titel (Optioneel)</label>
                  <input type="text" value={newGalleryTitle} onChange={(e) => setNewGalleryTitle(e.target.value)} placeholder="Bv. Onze koffiewagen" className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-white/70">Ondertitel / Beschrijving (Optioneel)</label>
                  <input type="text" value={newGalleryDesc} onChange={(e) => setNewGalleryDesc(e.target.value)} placeholder="Bv. In actie op locatie" className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none" />
                </div>

                <div className="md:col-span-2 pt-4">
                  <button type="submit" className="w-full bg-[#f4f1ea] text-[#534026] px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors">
                    <Plus size={20} /> Foto Opslaan
                  </button>
                </div>
              </form>

              <h3 className="text-xl font-serif text-[#f4f1ea] mb-4">Huidige Foto's in Galerij</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {(activeTab === 'home' ? homeImages : sfeerImages).map(img => (
                  <div key={img.id} className="relative group overflow-hidden rounded-xl border border-white/10">
                    <img src={img.src} alt={img.alt} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                      <div>
                        <p className="text-white font-bold truncate">{img.title || 'Geen titel'}</p>
                        <p className="text-white/70 text-sm truncate">{img.description}</p>
                      </div>
                      <button onClick={() => handleDeleteImage(img.id)} className="bg-red-500/80 text-white py-2 rounded-lg hover:bg-red-500 flex items-center justify-center gap-2">
                        <Trash2 size={16} /> Verwijderen
                      </button>
                    </div>
                  </div>
                ))}
                {(activeTab === 'home' ? homeImages : sfeerImages).length === 0 && (
                  <p className="text-white/50 col-span-full">Nog geen foto's in deze galerij.</p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default Admin;