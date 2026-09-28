import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
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
  const bokehRef16 = useRef<HTMLDivElement>(null);
  const bokehRef17 = useRef<HTMLDivElement>(null);
  const bokehRef18 = useRef<HTMLDivElement>(null);
  const bokehRef19 = useRef<HTMLDivElement>(null);
  const bokehRef20 = useRef<HTMLDivElement>(null);
  const bokehRef21 = useRef<HTMLDivElement>(null);
  const bokehRef22 = useRef<HTMLDivElement>(null);
  const bokehRef23 = useRef<HTMLDivElement>(null);
  const bokehRef24 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedGallery = window.localStorage.getItem('bonenbakkie-home-gallery');
      if (storedGallery) {
        const parsed = JSON.parse(storedGallery) as HomeGalleryImage[];
        const images = parsed.filter((item) => item.src).map((item) => ({
          ...item,
          title: item.title || 'Onze koffiewagen',
          description: item.description || 'Sfeer en detail',
        }));
        if (images.length) {
          setGalleryImages(images);
        }
      }
    } catch { }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40;
      const y = (clientY / window.innerHeight - 0.5) * 40;

      const m1 = 1.8;   const m2 = 0.5;   const m3 = 1.2;
      const m4 = 0.8;   const m5 = 0.15;  const m6 = 0.3;
      const m7 = 0.1;   const m8 = 0.6;   const m9 = 0.25;

      if (bokehRef1.current) { bokehRef1.current.style.setProperty('--tx', `${x * m1}px`); bokehRef1.current.style.setProperty('--ty', `${y * m1}px`); }
      if (bokehRef2.current) { bokehRef2.current.style.setProperty('--tx', `${x * m2}px`); bokehRef2.current.style.setProperty('--ty', `${y * m2}px`); }
      if (bokehRef3.current) { bokehRef3.current.style.setProperty('--tx', `${x * m3}px`); bokehRef3.current.style.setProperty('--ty', `${y * m3}px`); }
      if (bokehRef4.current) { bokehRef4.current.style.setProperty('--tx', `${x * m4}px`); bokehRef4.current.style.setProperty('--ty', `${y * m4}px`); }
      if (bokehRef5.current) { bokehRef5.current.style.setProperty('--tx', `${x * m5}px`); bokehRef5.current.style.setProperty('--ty', `${y * m5}px`); }
      if (bokehRef6.current) { bokehRef6.current.style.setProperty('--tx', `${x * m6}px`); bokehRef6.current.style.setProperty('--ty', `${y * m6}px`); }
      if (bokehRef7.current) { bokehRef7.current.style.setProperty('--tx', `${x * m7}px`); bokehRef7.current.style.setProperty('--ty', `${y * m7}px`); }
      if (bokehRef8.current) { bokehRef8.current.style.setProperty('--tx', `${x * m8}px`); bokehRef8.current.style.setProperty('--ty', `${y * m8}px`); }
      if (bokehRef9.current) { bokehRef9.current.style.setProperty('--tx', `${x * m9}px`); bokehRef9.current.style.setProperty('--ty', `${y * m9}px`); }

      const m10 = 1.5;  const m11 = 0.35; const m12 = 0.9;
      const m13 = 0.2;  const m14 = 0.65; const m15 = 0.4;

      if (bokehRef10.current) { bokehRef10.current.style.setProperty('--tx', `${x * m10}px`); bokehRef10.current.style.setProperty('--ty', `${y * m10}px`); }
      if (bokehRef11.current) { bokehRef11.current.style.setProperty('--tx', `${x * m11}px`); bokehRef11.current.style.setProperty('--ty', `${y * m11}px`); }
      if (bokehRef12.current) { bokehRef12.current.style.setProperty('--tx', `${x * m12}px`); bokehRef12.current.style.setProperty('--ty', `${y * m12}px`); }
      if (bokehRef13.current) { bokehRef13.current.style.setProperty('--tx', `${x * m13}px`); bokehRef13.current.style.setProperty('--ty', `${y * m13}px`); }
      if (bokehRef14.current) { bokehRef14.current.style.setProperty('--tx', `${x * m14}px`); bokehRef14.current.style.setProperty('--ty', `${y * m14}px`); }
      if (bokehRef15.current) { bokehRef15.current.style.setProperty('--tx', `${x * m15}px`); bokehRef15.current.style.setProperty('--ty', `${y * m15}px`); }
    
      const m16 = 1.1;  const m17 = 0.05; const m18 = 0.95;
      const m19 = 0.7;  const m20 = 1.4;  const m21 = 0.12;
      const m22 = 0.3;  const m23 = 0.75; const m24 = 0.02;

      if (bokehRef16.current) { bokehRef16.current.style.setProperty('--tx', `${x * m16}px`); bokehRef16.current.style.setProperty('--ty', `${y * m16}px`); }
      if (bokehRef17.current) { bokehRef17.current.style.setProperty('--tx', `${x * m17}px`); bokehRef17.current.style.setProperty('--ty', `${y * m17}px`); }
      if (bokehRef18.current) { bokehRef18.current.style.setProperty('--tx', `${x * m18}px`); bokehRef18.current.style.setProperty('--ty', `${y * m18}px`); }
      if (bokehRef19.current) { bokehRef19.current.style.setProperty('--tx', `${x * m19}px`); bokehRef19.current.style.setProperty('--ty', `${y * m19}px`); }
      if (bokehRef20.current) { bokehRef20.current.style.setProperty('--tx', `${x * m20}px`); bokehRef20.current.style.setProperty('--ty', `${y * m20}px`); }
      if (bokehRef21.current) { bokehRef21.current.style.setProperty('--tx', `${x * m21}px`); bokehRef21.current.style.setProperty('--ty', `${y * m21}px`); }
      if (bokehRef22.current) { bokehRef22.current.style.setProperty('--tx', `${x * m22}px`); bokehRef22.current.style.setProperty('--ty', `${y * m22}px`); }
      if (bokehRef23.current) { bokehRef23.current.style.setProperty('--tx', `${x * m23}px`); bokehRef23.current.style.setProperty('--ty', `${y * m23}px`); }
      if (bokehRef24.current) { bokehRef24.current.style.setProperty('--tx', `${x * m24}px`); bokehRef24.current.style.setProperty('--ty', `${y * m24}px`); }
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
    <main style={{ opacity: 0, animation: 'pageFadeIn 0.5s ease-out forwards' }}>
      <style>{`
        .hero-btn {
          background-color: #f4f1ea !important;
          color: #534026 !important;
          border: 2px solid #f4f1ea !important;
          padding-top: 14px !important;
          padding-bottom: 14px !important;
          padding-left: 24px !important;
          padding-right: 24px !important;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 1.5px !important;
          line-height: 1 !important;
          transition: all 0.3s ease-in-out !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        @media (min-width: 768px) {
          .hero-btn {
            padding-top: 18px !important;
            padding-bottom: 18px !important;
            padding-left: 46px !important;
            padding-right: 46px !important;
            font-size: 15px !important;
            letter-spacing: 2px !important;
          }
        }
        
        .coffee-btn.hero-btn:hover {
          background: transparent !important;
          color: #f4f1ea !important;
          border-color: #f4f1ea !important;
        }

        .coffee-bg {
          background-image: url('/koffiemachine.png');
          background-size: 150% !important; 
          background-position: center 30vh !important; 
          background-repeat: no-repeat;
          filter: invert(1) sepia(0.1) saturate(0.2) brightness(1.8) drop-shadow(-15px 20px 25px rgba(0,0,0,0.6));
          /* Dit zorgt ervoor dat de browser de afbeelding 'onthoudt' op de grafische kaart */
          will-change: transform;
        }

        /* We halen de doorlopende animatie weg zodat de telefoon niet blijft herberekenen tijdens het scrollen */
        .animate-float-bg {
          /* animation: float-bg 7s ease-in-out infinite; */
        }

        @media (min-width: 768px) {
          .coffee-bg {
            /* 55% voor de breedte, 'auto' voor de hoogte. 
               Dit garandeert dat de originele verhouding intact blijft en de lijnen scherp ogen! */
            background-size: 55% auto !important; 
            background-position: 95% center !important; 
          }
        }
        #koffiehuisje h2 {
          color: #534026 !important;
        }

        /* Oude animatie (met de 50% verschuiving) voor de boontjes */
        @keyframes float {
          0%, 100% { transform: translateY(-50%); }
          50% { transform: translateY(calc(-50% - 15px)); }
        }
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }

        /* NIEUWE ANIMATIE: speciaal voor de machine, zónder 50% verschuiving! */
        @keyframes float-bg {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        /* Standaard (mobiel) zetten we hem uit tegen de lag */
        .animate-float-bg {
          animation: none;
        }

        /* Vanaf tablets en PC's (min-width: 768px) zetten we de zweef-animatie weer AAN! */
        @media (min-width: 768px) {
          .animate-float-bg {
            animation: float-bg 7s ease-in-out infinite;
          }
        }

        .bean {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s;
          will-change: transform;
          transform: translate(calc(var(--tx, 0px)), calc(var(--ty, 0px))) rotate(var(--rot, 0deg));
          pointer-events: none;
        }

        .hero-section:hover .bean {
          transform: translate(calc(var(--tx, 0px) * 1.6), calc(var(--ty, 0px) * 1.6)) rotate(var(--rot, 0deg));
        }

        .bean--large { width: 8rem; height: 8rem; }
        .bean--med { width: 6rem; height: 6rem; }
        .bean--small { width: 4.5rem; height: 4.5rem; }

        @keyframes pageFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

      <section id="home" className="hero-section min-h-[100dvh] flex flex-col justify-start pt-36 md:justify-center md:pt-0 px-4 sm:px-6 lg:px-16 relative overflow-hidden">
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(30,15,10,0.45)_150%)] pointer-events-none z-0"></div>
        <div className="absolute right-[0%] top-1/2 transform -translate-y-1/2 w-[60%] h-[80%] bg-[#a37042] rounded-full blur-[160px] opacity-25 pointer-events-none z-0"></div>

        {/* BOKEH / BEAN EFFECTS - Enkele blijven op mobiel, de meeste zijn hidden md:block */}
        <div ref={bokehRef1} className="bean absolute left-[-2%] bottom-[10%] z-30 opacity-60 blur-sm bean--large" style={{ ['--rot' as any]: '-12deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef2} className="bean hidden md:block absolute right-[5%] top-[15%] z-30 opacity-50 blur-sm bean--med" style={{ ['--rot' as any]: '45deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef3} className="bean absolute left-[10%] top-[8%] z-20 opacity-55 blur-sm bean--small" style={{ ['--rot' as any]: '-8deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef4} className="bean hidden md:block absolute right-[18%] bottom-[25%] z-20 opacity-45 blur-sm bean--med" style={{ ['--rot' as any]: '22deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef5} className="bean hidden md:block absolute left-[38%] top-[35%] z-20 opacity-50 blur-sm bean--small" style={{ ['--rot' as any]: '12deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef6} className="bean hidden md:block absolute left-[55%] top-[12%] z-10 opacity-45 blur-sm bean--small" style={{ ['--rot' as any]: '-6deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef7} className="bean hidden md:block absolute right-[2%] bottom-[8%] z-10 opacity-40 blur-sm bean--small" style={{ ['--rot' as any]: '30deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef8} className="bean hidden md:block absolute left-[20%] top-[45%] z-10 opacity-35 blur-sm bean--med" style={{ ['--rot' as any]: '3deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef9} className="bean absolute left-[70%] top-[40%] z-10 opacity-30 blur-sm bean--med" style={{ ['--rot' as any]: '-18deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef10} className="bean hidden md:block absolute left-[82%] top-[20%] z-10 opacity-35 blur-[2px] bean--small" style={{ ['--rot' as any]: '75deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef11} className="bean hidden md:block absolute left-[12%] bottom-[35%] z-20 opacity-45 blur-sm bean--med" style={{ ['--rot' as any]: '-45deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef12} className="bean hidden md:block absolute left-[45%] top-[2%] z-10 opacity-30 blur-[3px] bean--large" style={{ ['--rot' as any]: '105deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef13} className="bean hidden md:block absolute right-[12%] bottom-[50%] z-10 opacity-40 blur-[2px] bean--small" style={{ ['--rot' as any]: '-20deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef14} className="bean absolute right-[28%] top-[60%] z-20 opacity-35 blur-sm bean--med" style={{ ['--rot' as any]: '55deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef15} className="bean hidden md:block absolute left-[4%] top-[65%] z-10 opacity-50 blur-[3px] bean--small" style={{ ['--rot' as any]: '-70deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef16} className="bean hidden md:block absolute left-[25%] top-[75%] z-10 opacity-30 blur-[2px] bean--small" style={{ ['--rot' as any]: '15deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef17} className="bean hidden md:block absolute right-[35%] top-[10%] z-20 opacity-45 blur-sm bean--med" style={{ ['--rot' as any]: '-35deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef18} className="bean hidden md:block absolute right-[3%] top-[45%] z-10 opacity-40 blur-[3px] bean--small" style={{ ['--rot' as any]: '85deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef19} className="bean hidden md:block absolute left-[65%] bottom-[15%] z-30 opacity-55 blur-[1px] bean--med" style={{ ['--rot' as any]: '-115deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef20} className="bean hidden md:block absolute left-[15%] top-[25%] z-10 opacity-25 blur-[4px] bean--small" style={{ ['--rot' as any]: '40deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef21} className="bean hidden md:block absolute right-[22%] top-[35%] z-20 opacity-50 blur-sm bean--small" style={{ ['--rot' as any]: '-90deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef22} className="bean absolute left-[50%] bottom-[5%] z-10 opacity-35 blur-[2px] bean--small" style={{ ['--rot' as any]: '10deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef23} className="bean hidden md:block absolute right-[45%] bottom-[25%] z-10 opacity-40 blur-[3px] bean--med" style={{ ['--rot' as any]: '-160deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>
        <div ref={bokehRef24} className="bean hidden md:block absolute left-[85%] bottom-[50%] z-20 opacity-60 blur-sm bean--small" style={{ ['--rot' as any]: '130deg' }}>
          <img src="/Boontje.png" alt="Koffieboon" className="w-full h-full object-contain" />
        </div>

        {/* KOFFIEMACHINE ACHTERGROND FIX */}
        <div 
          className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-25 md:opacity-40 coffee-bg animate-float-bg transform-gpu"
        />

        <div className="max-w-7xl mx-auto w-full z-20 relative flex flex-col md:flex-row items-center md:pt-10">
          
          <div className="w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left relative z-20">
            
            <div className="animate-fade-in-up mb-40 md:mb-8 flex flex-col items-center md:items-start" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-[#f4f1ea] leading-tight">
                <span className="whitespace-nowrap">Mobiele koffiekar</span> <br />
                <span className="text-[#d4cab4] opacity-100">'t bonenbakkie</span>
              </h1>
            </div>
            
            <p className="animate-fade-in-up max-w-xl text-lg md:text-xl leading-relaxed mb-8 md:mb-10 text-[#f4f1ea] opacity-80 px-4 md:px-0" style={{ animationDelay: '0.5s' }}>
              ‘t bonenbakkie brengt heerlijke vers gezette koffie naar uw locatie. Waar wij stilstaan, begint een koffiemoment.
            </p>
            
            <div className="animate-fade-in-up flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start items-center w-full px-6 sm:px-0 sm:w-auto" style={{ animationDelay: '0.7s' }}>
              <Link to="/contact" className="coffee-btn hero-btn accent-btn w-full sm:w-auto gap-2">
                Proef de sfeer <ArrowRight size={16} />
              </Link>
              <Link to="/menu" className="coffee-btn hero-btn accent-btn w-full sm:w-auto">
                Ontdek het menu
              </Link>
            </div>
          </div>

        </div>

        <div className="animate-fade-in-up absolute bottom-12 left-0 w-full flex justify-center z-20" style={{ animationDelay: '1.2s' }}>
          <a href="#koffiehuisje" onClick={handleScrollDown} aria-label="Scroll naar beneden" className="text-[#f4f1ea] opacity-60 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center animate-bounce">
            <ChevronDown size={40} strokeWidth={1} />
          </a>
        </div>
      </section>

      <section id="koffiehuisje" data-nav-theme="light" className="w-full bg-[#f4f1ea] py-24 px-4 sm:px-6 lg:px-8 relative z-20 text-[#534026] -mt-10 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.2)]">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-10 flex flex-col items-center text-center">
            
            <h2 className="text-4xl md:text-5xl font-serif">
              Onze Koffie Kar
            </h2> 
            
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#534026] opacity-90">
              ‘t bonenbakkie brengt kwaliteit, gezelligheid en flexibiliteit samen. Met lokale koffiebonen en een flexibel menu maken we van ieder evenement een bijzonder koffiemoment.
            </p>
            <div className="mt-6 h-px w-24 bg-white" aria-hidden="true" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {galleryImages.map((image, index) => (
              <div key={`${image.src}-${index}`} className={`group relative overflow-hidden rounded-[2rem] shadow-[0_20px_45px_rgba(0,0,0,0.16)] ${index === 0 ? 'md:col-span-2 md:row-span-2 h-96 md:h-[32rem]' : 'h-72'}`}>
                <img src={image.src} alt={image.alt || `Foto ${index + 1} van 't bonenbakkie`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
};

export default Home;