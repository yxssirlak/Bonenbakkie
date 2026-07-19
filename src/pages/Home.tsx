import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowRight, Coffee, Award, ChevronDown, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

type HomeGalleryImage = {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
};

const Home: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<HomeGalleryImage[]>([]);

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
  const bokehRef10 = useRef<HTMLDivElement>(null);
  const bokehRef11 = useRef<HTMLDivElement>(null);
  const bokehRef12 = useRef<HTMLDivElement>(null);
  const bokehRef13 = useRef<HTMLDivElement>(null);
  const bokehRef14 = useRef<HTMLDivElement>(null);
  const bokehRef15 = useRef<HTMLDivElement>(null);

  // Parallax logica: laat de boontjes reageren op de muis
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('bonenbakkie-home-gallery');
      if (stored) {
        const parsed = JSON.parse(stored) as HomeGalleryImage[];
        const images = parsed.filter((item) => item.src).map((item) => ({
          ...item,
          title: item.title || 'Onze koffiewagen',
          description: item.description || 'Sfeer en detail',
        }));
        if (images.length) {
          setGalleryImages(images);
        }
      }
    } catch {
      // fallback to defaults below
    }
  }, []);

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

      // Boontjes in "Waarom 't bonenbakkie?" sectie
      const m10 = 0.25;
      const m11 = 0.35;
      const m12 = 0.2;
      const m13 = 0.3;
      const m14 = 0.22;
      const m15 = 0.28;

      if (bokehRef10.current) {
        bokehRef10.current.style.setProperty('--tx', `${x * m10}px`);
        bokehRef10.current.style.setProperty('--ty', `${y * m10}px`);
      }
      if (bokehRef11.current) {
        bokehRef11.current.style.setProperty('--tx', `${x * m11}px`);
        bokehRef11.current.style.setProperty('--ty', `${y * m11}px`);
      }
      if (bokehRef12.current) {
        bokehRef12.current.style.setProperty('--tx', `${x * m12}px`);
        bokehRef12.current.style.setProperty('--ty', `${y * m12}px`);
      }
      if (bokehRef13.current) {
        bokehRef13.current.style.setProperty('--tx', `${x * m13}px`);
        bokehRef13.current.style.setProperty('--ty', `${y * m13}px`);
      }
      if (bokehRef14.current) {
        bokehRef14.current.style.setProperty('--tx', `${x * m14}px`);
        bokehRef14.current.style.setProperty('--ty', `${y * m14}px`);
      }
      if (bokehRef15.current) {
        bokehRef15.current.style.setProperty('--tx', `${x * m15}px`);
        bokehRef15.current.style.setProperty('--ty', `${y * m15}px`);
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

  useEffect(() => {
    if (galleryImages.length) return;
    setGalleryImages([
      { id: 1, src: '/bonenbakkie1.jpeg', alt: "'t bonenbakkie koffiewagen", title: 'Onze koffiewagen', description: 'In actie op locatie' },
      { id: 2, src: '/bonenbakkie2.png', alt: "Interieur van 't bonenbakkie", title: 'Sfeer binnenin', description: 'Een warm en stijlvol interieur' },
      { id: 3, src: '/Logo_bonenbakkie.jpeg', alt: 'Logo van het mobiele koffiehuisje', title: 'Ons merk', description: 'Karakter en identiteit' },
    ]);
  }, [galleryImages.length]);

  return (
    <main>
      <style>{`
        .hero-btn {
          background-color: #f4f1ea !important;
          color: #534026 !important;
          border: 2px solid #f4f1ea !important;
          padding-top: 18px !important;
          padding-bottom: 18px !important;
          padding-left: 46px !important;
          padding-right: 46px !important;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
          font-size: 15px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 2px !important;
          line-height: 1 !important;
          transition: all 0.3s ease-in-out !important;
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
          className="absolute right-[-20%] md:right-[-2%] top-3/4 md:top-1/2 w-[140%] md:w-[65%] h-[115%] z-10 pointer-events-none opacity-40 animate-float"
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
            
            <div 
              className="animate-fade-in-up mb-6 flex flex-wrap items-center justify-center md:justify-start gap-3 text-[#f4f1ea] uppercase tracking-[0.2em] text-[11px] font-bold opacity-80"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="flex items-center gap-1.5"><Sparkles size={14} /> Mobiele koffie met karakter</span>
            </div>
            
              <div className="animate-fade-in-up mb-6 flex flex-col items-center md:items-start" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-[#f4f1ea]">
                't bonenbakkie brengt <br />
                <span className="text-[#d4cab4] opacity-100">sfeer in elk kopje</span>
              </h1>
            </div>
            
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
              <Link to="/contact" className="coffee-btn hero-btn accent-btn w-full sm:w-auto">
                Proef de sfeer <ArrowRight size={18} />
              </Link>
              <Link to="/menu" className="coffee-btn hero-btn accent-btn w-full sm:w-auto">
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

      <section 
        id="koffiehuisje" 
        data-nav-theme="light" 
        className="w-full bg-[#f4f1ea] py-24 px-4 sm:px-6 lg:px-8 relative z-20 text-[#534026] -mt-10 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.2)]"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-10 flex flex-col items-center text-center">
            {/* Hier is de titelkleur aangepast naar #d4cab4 */}
            <h2 className="text-4xl md:text-5xl font-serif" style={{ color: '#d4cab4' }}>
              Ons mobiele koffiehuisje
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#534026] opacity-90">
              Vanuit onze karaktervolle koffiewagen serveren we premium koffie rechtstreeks naar jouw favoriete plek. Elk moment voelt speciaal.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
  {galleryImages.map((image, index) => (
    <div
      key={`${image.src}-${index}`}
      className={`group relative overflow-hidden rounded-[2rem] shadow-[0_20px_45px_rgba(0,0,0,0.16)] ${index === 0 ? 'md:col-span-2 md:row-span-2 h-96 md:h-[32rem]' : 'h-72'}`}
    >
      <img
        src={image.src}
        alt={image.alt || `Foto ${index + 1} van 't bonenbakkie`}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#120a07]/70 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-[#f4f1ea]">
        {/* "Foto collage" tekst is hier verwijderd */}
        <p className="text-xl font-semibold">{image.title || 'Onze koffiewagen'}</p>
        <p className="mt-1 text-sm opacity-90">{image.description || 'Sfeer en detail'}</p>
      </div>
    </div>
  ))}
</div>

        </div>
      </section>

      {/* 3. WAAROM 'T BONENBAKKIE? */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decoratieve boontjes in achtergrond */}
        <div ref={bokehRef10} className="bean absolute left-[5%] top-[10%] z-0 opacity-40 blur-sm w-16 h-16 pointer-events-none">
          <img src="/Boontje.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef11} className="bean absolute right-[8%] top-[15%] z-0 opacity-35 blur-sm w-20 h-20 pointer-events-none">
          <img src="/Boontje.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef12} className="bean absolute left-[12%] bottom-[20%] z-0 opacity-30 blur-sm w-14 h-14 pointer-events-none">
          <img src="/Boontje.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef13} className="bean absolute right-[15%] bottom-[15%] z-0 opacity-45 blur-sm w-24 h-24 pointer-events-none">
          <img src="/Boontje.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef14} className="bean absolute left-[35%] top-[5%] z-0 opacity-25 blur-sm w-18 h-18 pointer-events-none">
          <img src="/Boontje.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef15} className="bean absolute right-[25%] bottom-[8%] z-0 opacity-35 blur-sm w-16 h-16 pointer-events-none">
          <img src="/Boontje.png" alt="" className="w-full h-full object-contain" />
        </div>
        
        <div className="max-w-6xl mx-auto z-10 relative">
          <h2 className="section-title text-center mb-16">Waarom 't bonenbakkie?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'Premium Kwaliteit', desc: 'Single-origin bonen, deskundig geroosterd en vers gemalen elke dag.' },
              { icon: Coffee, title: 'Met Liefde Gemaakt', desc: 'Elke shot getrokken met precisie op professionele apparatuur.' },
              { icon: Sparkles, title: 'Altijd Vers', desc: 'Vers gezet op bestelling. Geen koffie uit een kan. Puur genot in elk kopje.' },
            ].map((item, i) => (
              <div key={i} className="glass-card"> 
                <div className="inline-flex items-center justify-center rounded-xl bg-[var(--logo-cream)] p-3 mb-6">
                  <item.icon className="w-6 h-6 text-[var(--color-brown-main)]" />
                </div>
                <h3 className="text-2xl font-serif mb-3 text-[var(--color-brown-main)]">{item.title}</h3>
                <p className="opacity-80 text-[var(--logo-cream)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;