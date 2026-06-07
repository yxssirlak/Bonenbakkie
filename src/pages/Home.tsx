import React from 'react';
import { Sparkles, ArrowRight, Coffee, Award, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('koffiehuisje');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      {/* 1. HERO SECTIE */}
      <section id="home" data-nav-theme="dark" className="hero-section min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        <div className="max-w-5xl mx-auto text-center hero-content -mt-24">
          
          {/* De pill heeft nu ook een mooi glass hover effect vanuit de CSS */}
          <div className="hero-pill mb-8 mx-auto">
            <Sparkles size={16} className="text-[#D4A574]" />
            Mobiele koffie met karakter
          </div>

          <h1 className="hero-title mb-6">
            't Bonenbakkie brengt <span>sfeer in elk kopje</span>
          </h1>

          <p className="hero-copy mb-10">
            Ervaar warme, rijke koffie vanuit onze stijlvolle wagen. Iedere slok voelt als een zorgvuldig samengesteld moment vol smaak, geur en sfeer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" className="coffee-btn text-lg flex items-center justify-center gap-2 w-full sm:w-auto">
              Proef de sfeer <ArrowRight size={20} />
            </Link>
            {/* De outline button heeft nu een sterk glazen glow bij hover */}
            <Link to="/menu" className="coffee-btn-outline text-lg text-center w-full sm:w-auto">
              Ontdek het Menu
            </Link>
          </div>
        </div>

        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <a 
            href="#koffiehuisje" 
            onClick={handleScrollDown}
            aria-label="Scroll naar beneden" 
            className="text-[#D4A574] hover:text-[#f8ede2] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(212,165,116,0.3)]"
          >
            <ChevronDown size={48} strokeWidth={1.5} />
          </a>
        </div>
      </section>

      {/* 2. ONS MOBIELE KOFFIEHUISJE */}
      <section id="koffiehuisje" className="w-full bg-[#fcf6ef] py-24 px-4 sm:px-6 lg:px-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-[#2b120b]">
            Ons Mobiele Koffiehuisje
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl">
              <img src="/bonenbakkie1.jpeg" alt="'t Bonenbakkie koffiewagen" className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-[2rem] overflow-hidden shadow-2xl">
              <img src="/bonenbakkie2.png" alt="'t Bonenbakkie interieur" className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg max-w-2xl mx-auto text-[#7a4e36] font-medium leading-relaxed">
              Vanuit onze karaktervolle koffiewagen serveren we premium koffie rechtstreeks naar jouw favoriete plek. Elk moment voelt speciaal.
            </p>
          </div>
        </div>
      </section>
      
      {/* 3. WAAROM 'T BONENBAKKIE? */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-16" style={{ color: '#f8ede2' }}>Waarom 't Bonenbakkie?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'Premium Kwaliteit', desc: 'Single-origin bonen, deskundig geroosterd en vers gemalen elke dag' },
              { icon: Coffee, title: 'Met Liefde Gemaakt', desc: 'Elke shot getrokken met precisie op professionele apparatuur' },
              { icon: Sparkles, title: 'Altijd Vers', desc: 'Vers gezet op bestelling. Geen koffie uit een kan. Puur genot in elk kopje' },
            ].map((item, i) => (
              // Hier wordt de speciale .glass-card class gebruikt!
              <div key={i} className="glass-card"> 
                <item.icon className="w-12 h-12 mb-4" style={{ color: '#D4A574' }} />
                <h3 className="text-xl font-serif font-bold mb-2" style={{ color: '#F5EFE7' }}>{item.title}</h3>
                <p style={{ color: '#ebdad0' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;