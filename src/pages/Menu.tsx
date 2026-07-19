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
  imageUrl?: string;
};

const Menu: React.FC = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');

  useEffect(() => {
    const storedCategories = localStorage.getItem('bonenbakkie-menu-categories');
    const storedItems = localStorage.getItem('bonenbakkie-menu-items');

    if (storedCategories && storedCategories !== '[]') {
      const parsedCats = JSON.parse(storedCategories);
      setCategories(parsedCats);
      if (parsedCats.length > 0) setActiveCategory(parsedCats[0].id);
    } else {
      const defaultCats = [
        { id: '1', name: 'Warme Dranken' },
        { id: '2', name: 'Koude Dranken' },
        { id: '3', name: 'Lekkernijen' },
        { id: '4', name: "Extra's" },
        { id: '5', name: 'Soorten Melk' }
      ];
      setCategories(defaultCats);
      setActiveCategory(defaultCats[0].id);
    }

    if (storedItems && storedItems !== '[]') {
      setItems(JSON.parse(storedItems));
    } else {
      setItems([
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
      ]);
    }
  }, []);

  const filteredItems = items.filter(item => item.categoryId === activeCategory);

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Zachte, gladde achtergrond effecten (geen noise meer) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(30,15,10,0.45)_150%)] pointer-events-none z-0"></div>
      <div className="absolute right-[0%] top-1/2 transform -translate-y-1/2 w-[60%] h-[80%] bg-[#a37042] rounded-full blur-[160px] opacity-25 pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <Coffee size={16} className="text-[var(--logo-cream)]" />
            <span className="text-[var(--logo-cream)] uppercase tracking-widest text-xs font-bold">Ons Aanbod</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-[#f4f1ea] mb-6">
            Het <span className="text-[#d4cab4]">Menu</span>
          </h1>
          <p className="max-w-2xl mx-auto text-[#f4f1ea] opacity-80 text-lg">
            Vers bereid met passie. Ontdek onze selectie van premium koffies, verfrissende drankjes, extra's en lekkernijen.
          </p>
        </div>

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {filteredItems.map((item) => (
            <div key={item.id} className="glass-card !bg-white/5 !backdrop-blur-md border border-white/10 flex flex-col overflow-hidden !p-0 transition-transform duration-300 hover:-translate-y-2 group">
              
              {item.imageUrl && item.imageUrl.trim() !== '' && (
                <div className="w-full h-56 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h3 className="text-2xl font-serif text-[#f4f1ea]">{item.name}</h3>
                </div>
                <p className="text-[#f4f1ea] opacity-70 text-sm leading-relaxed font-sans">
                  {item.description}
                </p>
                
                <div className="mt-auto pt-6">
                  <div className="w-12 h-[1px] bg-[#d4cab4]/30"></div>
                </div>
              </div>

            </div>
          ))}

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