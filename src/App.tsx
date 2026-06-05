import { Coffee, MapPin, Clock, MessageCircle, Award, Sparkles, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Espresso', description: 'Sterk en intens', icon: '☕' },
    { name: 'Cappuccino', description: 'Zacht en romig', icon: '🥛' },
    { name: 'Latte', description: 'Fluweelachtige melkkoffie', icon: '🍶' },
    { name: 'Americano', description: 'Zuiver en krachtig', icon: '💪' },
    { name: 'Flat White', description: 'Perfect in balans', icon: '⚖️' },
    { name: 'Cold Brew', description: 'Verfrissende keuze', icon: '❄️' },
  ];

  return (
    <div style={{ background: 'linear-gradient(to bottom, #FBF8F3, white, #FBF8F3)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 shadow-sm" style={{ backgroundColor: 'rgba(251, 248, 243, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E8DCC8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/Logo_bonenbakkie.jpeg" alt="Boonenbakkie" className="h-10 w-10 rounded-full object-cover" />
            <span className="text-2xl font-serif font-bold" style={{ color: '#4A3728' }}>Boonenbakkie</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#menu" className="transition-colors text-sm font-medium" style={{ color: '#6B4423' }}>Menu</a>
            <a href="#about" className="transition-colors text-sm font-medium" style={{ color: '#6B4423' }}>Over Ons</a>
            <a href="#location" className="transition-colors text-sm font-medium" style={{ color: '#6B4423' }}>Locatie</a>
            <button className="coffee-btn text-sm">Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-40 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: '#D4A574' }}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: '#C9956A' }}></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-8 inline-block">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#F5EFE7', color: '#4A3728' }}>
              <Sparkles size={16} />
              Premium Specialty Koffie op Wielen
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold mb-6 leading-tight" style={{ color: '#4A3728' }}>
            Jouw Dagelijkse <span style={{ color: '#6B4423' }}>Koffie Moment</span>
          </h1>

          <p className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#5D4037' }}>
            Handgemaakte espresso en specialty koffie geserveerd vanuit onze prachtig ontworpen koffiewagen. Ervaar de perfecte combinatie van kwaliteit, gemak en warmte.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="coffee-btn text-lg flex items-center gap-2">
              Vind Ons Nu <ArrowRight size={20} />
            </button>
            <button className="coffee-btn-outline text-lg">Bekijk Menu</button>
          </div>

          <div className="mt-16 flex justify-center">
            <img
              src="/Logo_bonenbakkie.jpeg"
              alt="Boonenbakkie Logo"
              className="w-64 h-64 object-cover rounded-2xl shadow-2xl float"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFAF5' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-16">Waarom Boonenbakkie?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'Premium Kwaliteit', desc: 'Single-origin bonen, deskundig geroosterd en vers gemalen elke dag' },
              { icon: Coffee, title: 'Met Liefde Gemaakt', desc: 'Elke shot getrokken met precisie op professionele apparatuur' },
              { icon: Sparkles, title: 'Altijd Vers', desc: 'Vers gezet op bestelling. Geen koffie uit een kan. Puur genot in elk kopje' },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-xl border-2 hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: '#FBF8F3', borderColor: '#D4A574', color: '#3D2817' }}
              >
                <item.icon className="w-12 h-12 mb-4" style={{ color: '#6B4423' }} />
                <h3 className="text-xl font-serif font-bold mb-2" style={{ color: '#4A3728' }}>{item.title}</h3>
                <p style={{ color: '#5D4037' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to bottom, #FBF8F3, white)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-16">Ons Menu</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {menuItems.map((item, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className="p-8 rounded-xl border-2 transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: hoveredCard === i ? '#6B4423' : 'white',
                  borderColor: hoveredCard === i ? '#4A3728' : '#D4A574',
                  color: hoveredCard === i ? 'white' : '#3D2817',
                  transform: hoveredCard === i ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredCard === i ? '0 20px 25px rgba(74, 55, 40, 0.2)' : 'none',
                }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-serif font-bold mb-2">{item.name}</h3>
                <p style={{ color: hoveredCard === i ? '#F5EFE7' : '#6B4423' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFAF5' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-6">Met Hartstocht Gemaakt</h2>
              <p className="text-lg mb-6 leading-relaxed" style={{ color: '#5D4037' }}>
                Boonenbakkie is niet zomaar een koffiewagen—het is een mobiel paradijs voor koffieliefhebbers. We zijn begonnen met een eenvoudige missie: uitzonderlijke koffie naar je buurt brengen.
              </p>
              <p className="text-lg mb-6 leading-relaxed" style={{ color: '#5D4037' }}>
                Elk kopje wordt bereid door ervaren barista's met alleen de fijnste bonen, vers gemalen en perfect geëxtraheerd. We geloven in kwaliteit boven snelheid, en dat proef je in elke slok.
              </p>
              <div className="flex gap-6">
                <div>
                  <div className="text-3xl font-serif font-bold" style={{ color: '#6B4423' }}>500+</div>
                  <p style={{ color: '#6B4423' }}>Tevreden Klanten Dagelijks</p>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold" style={{ color: '#6B4423' }}>100%</div>
                  <p style={{ color: '#6B4423' }}>Vers Gezet</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl transform rotate-6" style={{ backgroundColor: '#D4A574', opacity: 0.3 }}></div>
              <div className="relative bg-gradient-to-br from-white p-1 rounded-2xl" style={{ backgroundColor: '#F5EFE7' }}>
                <div className="h-96 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#6B4423' }}>
                  <Coffee className="w-32 h-32" style={{ color: '#F5EFE7', opacity: 0.3 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to bottom, #FBF8F3, white)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center mb-16">Vind Ons Vandaag</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="w-8 h-8 mt-1" style={{ color: '#6B4423' }} />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-1" style={{ color: '#4A3728' }}>Wekelijkse Locaties</h3>
                  <p className="mb-2" style={{ color: '#5D4037' }}>Centrum Markt - Maandag tot Vrijdag</p>
                  <p style={{ color: '#5D4037' }}>Centraal Park - Weekends</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Clock className="w-8 h-8 mt-1" style={{ color: '#6B4423' }} />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-1" style={{ color: '#4A3728' }}>Openingstijden</h3>
                  <p className="mb-1" style={{ color: '#5D4037' }}>Maandag - Vrijdag: 07:00 - 18:00</p>
                  <p style={{ color: '#5D4037' }}>Zaterdag - Zondag: 09:00 - 17:00</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MessageCircle className="w-8 h-8 mt-1" style={{ color: '#6B4423' }} />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-1" style={{ color: '#4A3728' }}>Contact</h3>
                  <p className="mb-1" style={{ color: '#5D4037' }}>hallo@boonenbakkie.com</p>
                  <p style={{ color: '#5D4037' }}>+31 6 12345678</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-8 text-white flex flex-col justify-center" style={{ backgroundColor: '#6B4423' }}>
              <h3 className="text-2xl font-serif font-bold mb-4">Neem Contact Op</h3>
              <p className="mb-6" style={{ color: '#F5EFE7' }}>Heb je een vraag of wil je ons boeken voor een evenement? We horen graag van je!</p>
              <button className="px-6 py-3 rounded-lg font-semibold transition-colors w-full" style={{ backgroundColor: 'white', color: '#6B4423' }}>
                Stuur een Bericht
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#4A3728', color: '#F5EFE7' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8" style={{ borderBottom: '1px solid #6B4423' }}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/Logo_bonenbakkie.jpeg" alt="Boonenbakkie" className="h-8 w-8 rounded-full object-cover" />
                <span className="text-xl font-serif font-bold">Boonenbakkie</span>
              </div>
              <p style={{ color: '#D4A574' }}>Premium koffie naar je buurt, één kopje tegelijk.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Snelle Links</h4>
              <ul className="space-y-2" style={{ color: '#D4A574' }}>
                <li><a href="#menu" className="hover:text-white transition-colors">Menu</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Over Ons</a></li>
                <li><a href="#location" className="hover:text-white transition-colors">Vind Ons</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Volg Ons</h4>
              <div className="flex gap-4" style={{ color: '#D4A574' }}>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <div className="text-center text-sm" style={{ color: '#D4A574' }}>
            <p>© 2024 Boonenbakkie. Met liefde gemaakt van de fijnste koffiebonen.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
