import React, { useEffect, useState } from 'react';
import { Coffee, Sparkles } from 'lucide-react';

export type MenuCategory = {
  id: string;
  name: string;
};

export type MenuItem = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
};

const Menu: React.FC = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');

  useEffect(() => {
    // Laad categorieën
    const storedCategories = localStorage.getItem('bonenbakkie-menu-categories');
    if (storedCategories) {
      const parsedCats = JSON.parse(storedCategories);
      setCategories(parsedCats);
      if (parsedCats.length > 0) setActiveCategory(parsedCats[0].id);
    } else {
      // Fallback standaard categorieën als de admin nog leeg is
      const defaultCats = [
        { id: '1', name: 'Warme Dranken' },
        { id: '2', name: 'Koude Dranken' },
        { id: '3', name: 'Lekkernijen' }
      ];
      setCategories(defaultCats);
      setActiveCategory(defaultCats[0].id);
    }

    // Laad items
    const storedItems = localStorage.getItem('bonenbakkie-menu-items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else {
      // Fallback items
      setItems([
        { id: '101', categoryId: '1', name: 'Espresso', description: 'Krachtig en puur. Een perfecte shot van onze premium bonen.', price: '€ 2,50' },
        { id: '102', categoryId: '1', name: 'Cappuccino', description: 'Rijke espresso met perfect opgeschuimde volle melk.', price: '€ 3,20', imageUrl: '/bonenbakkie1.jpeg' },
        { id: '103', categoryId: '2', name: 'Iced Latte', description: 'Verfrissende espresso met ijskoude melk en ijsblokjes.', price: '€ 3,80' },
      ]);
    }
  }, []);

  // Filter items op basis van de actieve tab
  const filteredItems = items.filter(item => item.categoryId === activeCategory);

  return (
    <main className="min-h-screen bg-[#1e0f0a] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Achtergrond gloed */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_10%,rgba(30,15,10,0.8)_100%)] pointer-events-none z-0"></div>
      <div className="absolute right-[-10%] top-[10%] w-[50%] h-[50%] bg-[#a37042] rounded-full blur-[160px] opacity-20 pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Sectie */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <Coffee size={16} className="text-[var(--logo-cream)]" />
            <span className="text-[var(--logo-cream)] uppercase tracking-widest text-xs font-bold">Ons Aanbod</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-[#f4f1ea] mb-6">
            Het <span className="text-[#d4cab4]">Menu</span>
          </h1>
          <p className="max-w-2xl mx-auto text-[#f4f1ea] opacity-80 text-lg">
            Vers bereid met passie. Ontdek onze met zorg samengestelde selectie van premium koffies, verfrissende drankjes en bijpassende lekkernijen.
          </p>
        </div>

        {/* Categorie Tabs */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-3 rounded-full font-serif text-lg transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#f4f1ea] text-[#534026] shadow-[0_0_20px_rgba(244,241,234,0.3)]'
                    : 'bg-white/5 text-[#f4f1ea] border border-white/10 hover:bg-white/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {filteredItems.map((item) => (
            <div key={item.id} className="glass-card !bg-white/5 !backdrop-blur-md border border-white/10 flex flex-col overflow-hidden !p-0 transition-transform duration-300 hover:-translate-y-2 group">
              
              {/* ALLES-OF-NIETS AFBEELDING: Wordt alleen gerenderd als er een imageUrl is ingevuld */}
              {item.imageUrl && item.imageUrl.trim() !== '' && (
                <div className="w-full h-56 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              
              {/* Content Deel */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h3 className="text-2xl font-serif text-[#f4f1ea]">{item.name}</h3>
                  <span className="font-bold text-[#d4cab4] text-xl whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-[#f4f1ea] opacity-70 text-sm leading-relaxed font-sans">
                  {item.description}
                </p>
                
                {/* Decoratief streepje onderaan (optioneel, geeft een chique touch) */}
                <div className="mt-auto pt-6">
                  <div className="w-12 h-[1px] bg-[#d4cab4]/30"></div>
                </div>
              </div>

            </div>
          ))}

          {/* Als een categorie leeg is */}
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-12 text-[#f4f1ea] opacity-60">
              <Sparkles className="mx-auto mb-4 opacity-50" size={32} />
              <p>Er zijn nog geen items toegevoegd aan deze categorie.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
};

export default Menu;