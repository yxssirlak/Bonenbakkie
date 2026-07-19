import React, { useEffect, useState } from 'react';
import { Coffee, Snowflake, Cookie, Milk } from 'lucide-react';

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

const defaultMenuData: MenuData = {
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

const iconMap = {
  coffee: Coffee,
  snowflake: Snowflake,
  cookie: Cookie,
  milk: Milk
};

const Menu: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuData>(defaultMenuData);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('bonenbakkie-menu');
      if (stored) {
        const parsed = JSON.parse(stored) as MenuData;
        if (parsed.categories && parsed.categories.length > 0) {
          setMenuData(parsed);
        }
      }
    } catch {
      // use default
    }
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <section data-nav-theme="dark" className="max-w-4xl mx-auto">
        
        {/* Titel */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif font-black text-[#F5EFE7] tracking-tighter mb-4">MENU</h1>
          <div className="h-1 w-20 bg-[#D4A574] mx-auto rounded-full"></div>
        </div>

        {/* Kaart Container */}
        <div className="glass-card p-10 md:p-16 border border-white/5 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Categorieën in twee kolommen */}
            {menuData.categories.map((category, colIndex) => (
              <div key={category.id} className={colIndex >= 2 ? 'col-span-2 md:col-span-1' : ''}>
                <div className="space-y-12">
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      {React.createElement(iconMap[category.icon], { 
                        className: "text-[#D4A574]", 
                        size: 20 
                      })}
                      <h2 className="text-sm font-bold text-[#F5EFE7] tracking-[0.3em] uppercase">{category.title}</h2>
                    </div>
                    <div className="space-y-5">
                      {category.items.map((item) => (
                        <div key={item.id} className="flex items-start gap-3">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-12 h-12 rounded object-cover flex-shrink-0"
                            />
                          )}
                          <div className="text-[#ebdad0] text-xs font-medium tracking-[0.2em] uppercase hover:text-white transition-colors cursor-default">
                            {item.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Melk opties */}
            <div className="md:col-span-2 pt-8 border-t border-white/5">
              <div className="flex items-center gap-3 mb-8">
                {React.createElement(iconMap.milk, { 
                  className: "text-[#D4A574]", 
                  size: 20 
                })}
                <h2 className="text-sm font-bold text-[#F5EFE7] tracking-[0.3em] uppercase">SOORTEN MELK</h2>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-4">
                {menuData.milkOptions.map((milk) => (
                  <span key={milk} className="text-[#ebdad0] text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">
                    {milk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Menu;