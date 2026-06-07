import React from 'react';
import { Sparkles, ArrowRight, Coffee, Award } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <main>
      <section id="home" data-nav-theme="dark" className="hero-section min-h-screen flex items-start justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="hero-glow hero-glow-left"></div>
        <div className="hero-glow hero-glow-right"></div>

        <div className="max-w-5xl mx-auto text-center hero-content">
          <div className="hero-pill mb-8">
            <Sparkles size={16} />
            Mobiele koffie met karakter
          </div>

          <h1 className="hero-title mb-6">
            't Bonenbakkie brengt <span>sfeer in elk kopje</span>
          </h1>

          <p className="hero-copy mb-10">
            Ervaar warme, rijke koffie vanuit onze stijlvolle wagen. Iedere slok voelt als een zorgvuldig samengesteld moment vol smaak, geur en sfeer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="coffee-btn text-lg flex items-center gap-2">
              Proef de sfeer <ArrowRight size={20} />
            </button>
            <button className="coffee-btn-outline text-lg">Ontdek het Menu</button>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" className="py-20 px-4 sm:px-6 lg:px-8 section-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-16">Waarom 't Bonenbakkie?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'Premium Kwaliteit', desc: 'Single-origin bonen, deskundig geroosterd en vers gemalen elke dag' },
              { icon: Coffee, title: 'Met Liefde Gemaakt', desc: 'Elke shot getrokken met precisie op professionele apparatuur' },
              { icon: Sparkles, title: 'Altijd Vers', desc: 'Vers gezet op bestelling. Geen koffie uit een kan. Puur genot in elk kopje' },
            ].map((item, i) => (
              <div
                key={i}
                className="feature-card p-8"
              >
                <item.icon className="w-12 h-12 mb-4" style={{ color: '#6B4423' }} />
                <h3 className="text-xl font-serif font-bold mb-2" style={{ color: '#4A3728' }}>{item.title}</h3>
                <p style={{ color: '#7B6B58' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
