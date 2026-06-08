import React from 'react';
import { Coffee, Snowflake, Cookie, Milk } from 'lucide-react';

const Menu: React.FC = () => {
  const menuData = [
    {
      category: 'WARME DRANKEN',
      icon: Coffee,
      items: ['ESPRESSO', 'KOFFIE', 'CAPPUCCINO', 'FLAT WHITE', 'KOFFIE VERKEERD', 'LATTE MACCHIATO', 'THEE', 'MUNTTHEE', 'GEMBERTHEE']
    },
    {
      category: 'KOUDE DRANKEN',
      icon: Snowflake,
      items: ['IJSKOFFIE', 'MATCHA', 'LIMONADE']
    },
    {
      category: 'ZOET & EXTRA',
      icon: Cookie,
      items: ['STROOPWAFEL', 'KARAMEL', 'VANILLE', 'AARDBEI', 'HAZELNOOT', 'SLAGROOM']
    }
  ];

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
            
            {/* Kolom 1 */}
            <div className="space-y-12">
              {menuData.slice(0, 2).map((section, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-8">
                    <section.icon className="text-[#D4A574]" size={20} />
                    <h2 className="text-sm font-bold text-[#F5EFE7] tracking-[0.3em] uppercase">{section.category}</h2>
                  </div>
                  <div className="space-y-5">
                    {section.items.map((item) => (
                      <div key={item} className="text-[#ebdad0] text-xs font-medium tracking-[0.2em] uppercase hover:text-white transition-colors cursor-default">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Kolom 2 */}
            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Cookie className="text-[#D4A574]" size={20} />
                  <h2 className="text-sm font-bold text-[#F5EFE7] tracking-[0.3em] uppercase">{menuData[2].category}</h2>
                </div>
                <div className="space-y-5">
                  {menuData[2].items.map((item) => (
                    <div key={item} className="text-[#ebdad0] text-xs font-medium tracking-[0.2em] uppercase hover:text-white transition-colors cursor-default">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Melk opties */}
              <div className="pt-8 border-t border-white/5">
                <div className="flex items-center gap-3 mb-8">
                  <Milk className="text-[#D4A574]" size={20} />
                  <h2 className="text-sm font-bold text-[#F5EFE7] tracking-[0.3em] uppercase">SOORTEN MELK</h2>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-4">
                  {['VOLLE KOEMELK', 'HAVERMELK', 'SOJAMELK', 'KOKOSMELK'].map((milk) => (
                    <span key={milk} className="text-[#ebdad0] text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">
                      {milk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Menu;