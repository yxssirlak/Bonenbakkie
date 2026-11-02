import React, { useEffect, useState } from 'react';
import HeroBeans from '../HeroBeans';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchGallery, GalleryImage } from '../gallery';

const Home: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  useEffect(() => {
    let cancelled = false;
    const fallbackImages: GalleryImage[] = [
      { id: 'fallback-home-1', gallery: 'home', src: '/bonenbakkie1.jpeg', alt: "'t bonenbakkie koffiewagen", title: 'Onze koffiewagen', description: 'In actie op locatie' },
      { id: 'fallback-home-2', gallery: 'home', src: '/bonenbakkie2.png', alt: "Interieur van 't bonenbakkie", title: 'Sfeer binnenin', description: 'Een warm en stijlvol interieur' },
      { id: 'fallback-home-3', gallery: 'home', src: '/Logo_bonenbakkie.jpeg', alt: 'Logo van het mobiele koffiehuisje', title: 'Ons merk', description: 'Karakter en identiteit' },
    ];

    fetchGallery(['home', 'sfeer'])
      .then((images) => {
        if (!cancelled) setGalleryImages(images.length ? images : fallbackImages);
      })
      .catch((error: unknown) => {
        console.error('Homepage galerij laden is mislukt:', error);
        if (!cancelled) setGalleryImages(fallbackImages);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('koffiehuisje');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main style={{ opacity: 0, animation: 'pageFadeIn 0.5s ease-out forwards' }}>

      <Helmet>
        <title>Mobiele koffiekar 't bonenbakkie | Koffie op Locatie</title>
        <meta name="description" content="'t bonenbakkie brengt heerlijke vers gezette koffie naar uw locatie. Boek onze mobiele koffiekar voor evenementen, feesten en zakelijke bijeenkomsten door heel Nederland." />
      </Helmet>
      
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

        <HeroBeans />
        {/* KOFFIEMACHINE ACHTERGROND FIX */}
        <div 
          className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-25 md:opacity-40 coffee-bg animate-float-bg transform-gpu"
        />

        <div className="max-w-7xl mx-auto w-full z-20 relative flex flex-col md:flex-row items-center md:pt-10">
          
          <div className="w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left relative z-20">
            
            <div className="animate-fade-in-up mb-40 md:mb-8 flex flex-col items-center md:items-start" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-[2.8rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-[#f4f1ea] leading-tight">
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
