import React, { useState } from 'react';
import { Coffee } from 'lucide-react';

const Menu: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const menuItems = [
    { name: 'Espresso', description: 'Sterk en intens', icon: Coffee },
    { name: 'Cappuccino', description: 'Zacht en romig', icon: Coffee },
    { name: 'Latte', description: 'Fluweelachtige melkkoffie', icon: Coffee },
    { name: 'Americano', description: 'Zuiver en krachtig', icon: Coffee },
    { name: 'Flat White', description: 'Perfect in balans', icon: Coffee },
    { name: 'Cold Brew', description: 'Verfrissende keuze', icon: Coffee },
  ];

  return (
    <main>
      <section data-nav-theme="light" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-16 text-[#f8ede2]">Ons Menu</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {menuItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="menu-card p-8 rounded-[2rem] border transition-all duration-300 shadow-xl"
                  style={{
                    backgroundColor: hovered === i ? 'rgba(107, 68, 35, 0.9)' : 'rgba(255, 250, 245, 0.65)',
                    backdropFilter: 'blur(12px)', /* Dit zorgt voor het 'melkglas' effect */
                    borderColor: hovered === i ? '#4A3728' : 'rgba(212, 165, 116, 0.4)',
                    color: hovered === i ? 'white' : '#3D2817',
                  }}
                >
                  <div className="text-4xl mb-4"><Icon className="w-10 h-10" style={{ color: hovered === i ? '#F5EFE7' : '#6B4423' }} /></div>
                  <h3 className="text-2xl font-serif font-bold mb-2">{item.name}</h3>
                  <p style={{ color: hovered === i ? '#F5EFE7' : '#6B4423' }}>{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Menu;