import React, { useState, useEffect } from 'react';
import { CheckCircle, Trash2, Plus, Image as ImageIcon, Coffee, Home, Lock } from 'lucide-react';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'home' | 'sfeer' | 'menu'>('menu'); // 'menu' als default voor het gemak nu

  // --- MENU STATES ---
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [items, setItems] = useState<any[]>([]);
  
  // Nieuwe Categorie form
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // Nieuw Item form
  const [newItemCat, setNewItemCat] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemImg, setNewItemImg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'bonenbakkie2026') { // VERANDER DIT NAAR JOUW WACHTWOORD
      setIsAuthenticated(true);
    } else {
      alert('Ongeldig wachtwoord');
    }
  };

  // Laad alle opgeslagen data bij het inloggen
  useEffect(() => {
    if (isAuthenticated) {
      const storedCats = localStorage.getItem('bonenbakkie-menu-categories');
      if (storedCats) setCategories(JSON.parse(storedCats));
      
      const storedItems = localStorage.getItem('bonenbakkie-menu-items');
      if (storedItems) setItems(JSON.parse(storedItems));
    }
  }, [isAuthenticated]);

  // Sla data op in localStorage wanneer deze verandert
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('bonenbakkie-menu-categories', JSON.stringify(categories));
      localStorage.setItem('bonenbakkie-menu-items', JSON.stringify(items));
    }
  }, [categories, items, isAuthenticated]);

  // --- MENU LOGICA ---
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
    if (!newItemName || !newItemCat || !newItemPrice) {
      alert('Vul in ieder geval een naam, categorie en prijs in.');
      return;
    }
    const newItem = {
      id: Date.now().toString(),
      categoryId: newItemCat,
      name: newItemName,
      description: newItemDesc,
      price: newItemPrice,
      imageUrl: newItemImg,
    };
    setItems([...items, newItem]);
    
    // Reset form
    setNewItemName('');
    setNewItemDesc('');
    setNewItemPrice('');
    setNewItemImg('');
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
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

        {/* Tabblad Navigatie */}
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

        {/* --- MENU AANPASSEN TAB --- */}
        {activeTab === 'menu' && (
          <div className="space-y-12 animate-fade-in-up">
            
            {/* Categorieën Beheren */}
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
                {categories.length === 0 && <p className="text-white/50 text-sm">Nog geen categorieën. Voeg er eerst een toe!</p>}
              </div>
            </div>

            {/* Items Beheren */}
            <div className="glass-card !bg-white/5 border border-white/10 p-8 rounded-[2rem]">
              <h2 className="text-2xl font-serif text-[#f4f1ea] mb-6 border-b border-white/10 pb-4">2. Items Toevoegen</h2>
              
              {categories.length === 0 ? (
                <p className="text-white/50">Maak eerst een categorie aan hierboven voordat je items kunt toevoegen.</p>
              ) : (
                <form onSubmit={handleAddItem} className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-white/70">Kies Categorie</label>
                    <select 
                      value={newItemCat} 
                      onChange={(e) => setNewItemCat(e.target.value)}
                      className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                    >
                      <option value="" disabled>Selecteer een tab...</option>
                      {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-white/70">Naam Item</label>
                    <input type="text" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder="Bv. Iced Caramel Latte" className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none" />
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm text-white/70">Beschrijving</label>
                    <textarea value={newItemDesc} onChange={(e) => setNewItemDesc(e.target.value)} placeholder="Wat zit erin?" className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none h-24" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-white/70">Prijs</label>
                    <input type="text" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} placeholder="Bv. € 3,50" className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-white/70">Foto URL (Optioneel)</label>
                    <input type="text" value={newItemImg} onChange={(e) => setNewItemImg(e.target.value)} placeholder="Bv. /bonenbakkie1.jpeg of leeg laten" className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none" />
                  </div>

                  <div className="md:col-span-2 pt-4">
                    <button type="submit" className="w-full bg-[#f4f1ea] text-[#534026] px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors">
                      <CheckCircle size={20} /> Item Opslaan
                    </button>
                  </div>
                </form>
              )}

              {/* Overzicht van toegevoegde items */}
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
                                <p className="text-[#f4f1ea] opacity-60 text-sm">{item.price}</p>
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

        {/* --- ANDERE TABS (Tijdelijke placeholders voor Home/Sfeer als je die logica daar al in had) --- */}
        {(activeTab === 'home' || activeTab === 'sfeer') && (
          <div className="glass-card !bg-white/5 border border-white/10 p-12 text-center rounded-[2rem] text-white/50 animate-fade-in-up">
            <ImageIcon size={48} className="mx-auto mb-4 opacity-30" />
            <p>Hier staat jouw bestaande code voor de {activeTab} galerij.</p>
          </div>
        )}

      </div>
    </main>
  );
};

export default Admin;