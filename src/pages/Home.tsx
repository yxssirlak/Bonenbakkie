import React, { useEffect, useRef } from 'react'; // <--- useEffect & useRef toegevoegd
import { Sparkles, ArrowRight, Coffee, Award, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  // Parallax refs
  const bokehRef1 = useRef<HTMLDivElement>(null);
  const bokehRef2 = useRef<HTMLDivElement>(null);
  const bokehRef3 = useRef<HTMLDivElement>(null);
  const bokehRef4 = useRef<HTMLDivElement>(null);
  const bokehRef5 = useRef<HTMLDivElement>(null);
  const bokehRef6 = useRef<HTMLDivElement>(null);
  const bokehRef7 = useRef<HTMLDivElement>(null);
  const bokehRef8 = useRef<HTMLDivElement>(null);
  const bokehRef9 = useRef<HTMLDivElement>(null);

  // Parallax logica: laat de boontjes reageren op de muis
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40;
      const y = (clientY / window.innerHeight - 0.5) * 40;

      // Make all beans move in the same direction; use different positive depth multipliers
      const m1 = 1.0;
      const m2 = 0.85;
      const m3 = 0.65;
      const m4 = 0.5;
      const m5 = 0.4;
      const m6 = 0.3;
      const m7 = 0.2;
      const m8 = 0.15;
      const m9 = 0.1;

      if (bokehRef1.current) {
        bokehRef1.current.style.setProperty('--tx', `${x * m1}px`);
        bokehRef1.current.style.setProperty('--ty', `${y * m1}px`);
      }
      if (bokehRef2.current) {
        bokehRef2.current.style.setProperty('--tx', `${x * m2}px`);
        bokehRef2.current.style.setProperty('--ty', `${y * m2}px`);
      }
      if (bokehRef3.current) {
        bokehRef3.current.style.setProperty('--tx', `${x * m3}px`);
        bokehRef3.current.style.setProperty('--ty', `${y * m3}px`);
      }
      if (bokehRef4.current) {
        bokehRef4.current.style.setProperty('--tx', `${x * m4}px`);
        bokehRef4.current.style.setProperty('--ty', `${y * m4}px`);
      }
      if (bokehRef5.current) {
        bokehRef5.current.style.setProperty('--tx', `${x * m5}px`);
        bokehRef5.current.style.setProperty('--ty', `${y * m5}px`);
      }
      if (bokehRef6.current) {
        bokehRef6.current.style.setProperty('--tx', `${x * m6}px`);
        bokehRef6.current.style.setProperty('--ty', `${y * m6}px`);
      }
      if (bokehRef7.current) {
        bokehRef7.current.style.setProperty('--tx', `${x * m7}px`);
        bokehRef7.current.style.setProperty('--ty', `${y * m7}px`);
      }
      if (bokehRef8.current) {
        bokehRef8.current.style.setProperty('--tx', `${x * m8}px`);
        bokehRef8.current.style.setProperty('--ty', `${y * m8}px`);
      }
      if (bokehRef9.current) {
        bokehRef9.current.style.setProperty('--tx', `${x * m9}px`);
        bokehRef9.current.style.setProperty('--ty', `${y * m9}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('koffiehuisje');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <style>{`
        .hero-btn {
          background-color: #f4f1ea !important;
          color: #534026 !important;
          padding-top: 20px !important;
          padding-bottom: 20px !important;
          padding-left: 48px !important;
          padding-right: 48px !important;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
          font-size: 15px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 2px !important;
          line-height: 1 !important;
        }
        
        .hero-btn:hover {
          background-color: transparent !important;
          color: #f4f1ea !important;
        }

        @keyframes float {
          0%, 100% { transform: translateY(-50%); }
          50% { transform: translateY(calc(-50% - 15px)); }
        }
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .noise-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        /* Beans (boontjes) base styles using CSS variables set from JS */
        .bean {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s;
          will-change: transform;
          transform: translate(calc(var(--tx, 0px)), calc(var(--ty, 0px))) rotate(var(--rot, 0deg));
          pointer-events: none;
        }

        /* On hover over the hero-section, amplify the translate values for a stronger effect */
        .hero-section:hover .bean {
          transform: translate(calc(var(--tx, 0px) * 1.6), calc(var(--ty, 0px) * 1.6)) rotate(var(--rot, 0deg));
        }

        /* Individual bean tweaks */
        .bean--large { width: 8rem; height: 8rem; }
        .bean--med { width: 6rem; height: 6rem; }
        .bean--small { width: 4.5rem; height: 4.5rem; }
      `}</style>

      <section id="home" className="hero-section min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-16 relative overflow-hidden">
        
        <div className="noise-overlay"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(30,15,10,0.45)_150%)] pointer-events-none z-0"></div>
        <div className="absolute right-[0%] top-1/2 transform -translate-y-1/2 w-[60%] h-[80%] bg-[#a37042] rounded-full blur-[160px] opacity-25 pointer-events-none z-0"></div>

        {/* BOKEH / BEAN EFFECTS */}
        <div 
          ref={bokehRef1} 
          className="bean absolute left-[-2%] bottom-[10%] z-30 opacity-60 blur-sm bean--large"
          style={{ ['--rot' as any]: '-12deg' }}
        >
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>

        <div 
          ref={bokehRef2} 
          className="bean absolute right-[5%] top-[15%] z-30 opacity-50 blur-sm bean--med"
          style={{ ['--rot' as any]: '45deg' }}
        >
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>

        {/* Extra boontjes toegevoegd */}
        <div
          ref={bokehRef3}
          className="bean absolute left-[10%] top-[8%] z-20 opacity-55 blur-sm bean--small"
          style={{ ['--rot' as any]: '-8deg' }}
        >
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>

        <div
          ref={bokehRef4}
          className="bean absolute right-[18%] bottom-[25%] z-20 opacity-45 blur-sm bean--med"
          style={{ ['--rot' as any]: '22deg' }}
        >
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>

        <div
          ref={bokehRef5}
          className="bean absolute left-[38%] top-[35%] z-20 opacity-50 blur-sm bean--small"
          style={{ ['--rot' as any]: '12deg' }}
        >
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>

        {/* Extra boontjes 6-9 */}
        <div
          ref={bokehRef6}
          className="bean absolute left-[55%] top-[12%] z-10 opacity-45 blur-sm bean--small animate-float"
          style={{ ['--rot' as any]: '-6deg' }}
        >
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>

        <div
          ref={bokehRef7}
          className="bean absolute right-[2%] bottom-[8%] z-10 opacity-40 blur-sm bean--small animate-float"
          style={{ ['--rot' as any]: '30deg' }}
        >
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>

        <div
          ref={bokehRef8}
          className="bean absolute left-[20%] top-[45%] z-10 opacity-35 blur-sm bean--med animate-float"
          style={{ ['--rot' as any]: '3deg' }}
        >
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>

        <div
          ref={bokehRef9}
          className="bean absolute left-[70%] top-[40%] z-10 opacity-30 blur-sm bean--med animate-float"
          style={{ ['--rot' as any]: '-18deg' }}
        >
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        {/* DE KOFFIEMACHINE */}
        <div 
          className="absolute right-[-20%] md:right-[-2%] top-1/2 w-[140%] md:w-[65%] h-[115%] z-10 pointer-events-none opacity-40 animate-float"
          style={{ 
            backgroundImage: "url('/koffiemachine.png')", 
            backgroundSize: 'contain',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat',
            filter: 'invert(1) sepia(0.1) saturate(0.2) brightness(1.8) drop-shadow(-15px 20px 25px rgba(0,0,0,0.6))' 
          }}
        />

        <div className="max-w-7xl mx-auto w-full z-20 relative flex flex-col md:flex-row items-center pt-10">
          
          <div className="w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left relative z-20">
            
            {/* Subtekst ZONDER locatie pin */}
            <div 
              className="animate-fade-in-up mb-6 flex flex-wrap items-center justify-center md:justify-start gap-3 text-[#f4f1ea] uppercase tracking-[0.2em] text-[11px] font-bold opacity-80"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="flex items-center gap-1.5"><Sparkles size={14} /> Mobiele koffie met karakter</span>
            </div>
            
            <h1 
              className="animate-fade-in-up text-6xl md:text-7xl lg:text-8xl font-serif mb-6 text-[#f4f1ea]"
              style={{ animationDelay: '0.3s' }}
            >
              't bonenbakkie brengt <br />
              <span className="opacity-80">sfeer in elk kopje</span>
            </h1>
            
            <p 
              className="animate-fade-in-up max-w-xl text-lg leading-relaxed mb-10 text-[#f4f1ea] opacity-80"
              style={{ animationDelay: '0.5s' }}
            >
              Ervaar warme, rijke koffie vanuit onze stijlvolle wagen. Iedere slok voelt als een zorgvuldig samengesteld moment vol smaak, geur en sfeer.
            </p>
            
            <div 
              className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center w-full sm:w-auto"
              style={{ animationDelay: '0.7s' }}
            >
              <Link to="/contact" className="coffee-btn hero-btn w-full sm:w-auto">
                Proef de sfeer <ArrowRight size={18} />
              </Link>
              <Link to="/menu" className="coffee-btn hero-btn w-full sm:w-auto">
                Ontdek het menu
              </Link>
            </div>

            {/* Google Reviews */}
            <a 
              href="https://maps.google.com" /* <-- VERVANG DIT MET JOUW ECHTE GOOGLE MAPS LINK */
              target="_blank"
              rel="noreferrer"
              className="animate-fade-in-up mt-10 flex items-center justify-center md:justify-start gap-4 cursor-pointer group"
              style={{ animationDelay: '0.9s' }}
            >
              <div className="flex gap-1 transition-transform duration-300 group-hover:scale-105">
                {[1, 2, 3, 4, 5].map((star, i) => (
                  <span 
                    key={i} 
                    className="text-[#f4f1ea] text-2xl md:text-3xl leading-none" 
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="text-[#f4f1ea] font-sans text-sm opacity-90 text-left leading-tight group-hover:opacity-100 transition-opacity">
                <span className="font-bold text-base">5.0/5</span> op Google <br />
                <span className="underline opacity-70 group-hover:opacity-100 transition-opacity">Lees onze reviews</span>
              </div>
            </a>

          </div>
        </div>

        <div 
          className="animate-fade-in-up absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
          style={{ animationDelay: '1.2s' }}
        >
          <a 
            href="#koffiehuisje" 
            onClick={handleScrollDown}
            aria-label="Scroll naar beneden" 
            className="text-[#f4f1ea] opacity-60 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center animate-bounce"
          >
            <ChevronDown size={40} strokeWidth={1} />
          </a>
        </div>
      </section>

      {/* 2. ONS MOBIELE KOFFIEHUISJE */}
      {/* 2. ONS MOBIELE KOFFIEHUISJE */}
      <section 
        id="koffiehuisje" 
        data-nav-theme="light" 
        className="w-full bg-[#f4f1ea] py-24 px-4 sm:px-6 lg:px-8 relative z-20 text-[#534026] -mt-10 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.2)]"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          {/* De titel expliciet bruin maken */}
          {/* De classes 'text-center' en 'mx-auto' dwingen hem in het midden */}
          <h2 className="text-4xl md:text-5xl font-serif text-center mx-auto mb-16 text-[#534026] w-full">
            Ons Mobiele Koffiehuisje
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl">
              <img src="/bonenbakkie1.jpeg" alt="'t bonenbakkie koffiewagen" className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-[2rem] overflow-hidden shadow-2xl">
              <img src="/bonenbakkie2.png" alt="'t bonenbakkie interieur" className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          <div className="mt-12 text-center">
            {/* Ook de paragraaf tekst is hier nu expliciet #534026 */}
            <p className="text-lg max-w-2xl mx-auto font-medium leading-relaxed text-[#534026] opacity-90">
              Vanuit onze karaktervolle koffiewagen serveren we premium koffie rechtstreeks naar jouw favoriete plek. Elk moment voelt speciaal.
            </p>
          </div>
        </div>
      </section>

      {/* 3. WAAROM 'T BONENBAKKIE? */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto z-10 relative">
          <h2 className="section-title text-center mb-16">Waarom 't bonenbakkie?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'Premium Kwaliteit', desc: 'Single-origin bonen, deskundig geroosterd en vers gemalen elke dag.' },
              { icon: Coffee, title: 'Met Liefde Gemaakt', desc: 'Elke shot getrokken met precisie op professionele apparatuur.' },
              { icon: Sparkles, title: 'Altijd Vers', desc: 'Vers gezet op bestelling. Geen koffie uit een kan. Puur genot in elk kopje.' },
            ].map((item, i) => (
              <div key={i} className="glass-card"> 
                <item.icon className="w-12 h-12 mb-6 opacity-80" />
                <h3 className="text-2xl font-serif mb-3 text-[#f4f1ea]">{item.title}</h3>
                <p className="opacity-80 text-[#f4f1ea] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;