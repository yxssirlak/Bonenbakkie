import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';

type GalleryImage = {
  id: number | string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
};

type GalleryCollection = {
  id: number;
  title: string;
  description: string;
  images: GalleryImage[];
};

const Sfeer: React.FC = () => {
  const [collections, setCollections] = useState<GalleryCollection[]>([]);
  const [carouselImages, setCarouselImages] = useState<GalleryImage[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselPointer, setCarouselPointer] = useState({ x: 0, y: 0, direction: 'right' as 'left' | 'right', visible: false });
  const beanRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 40;
      const y = (event.clientY / window.innerHeight - 0.5) * 40;

      beanRefs.current.forEach((bean, index) => {
        if (!bean) return;
        const depth = 0.15 + index * 0.08;
        bean.style.setProperty('--tx', `${x * depth}px`);
        bean.style.setProperty('--ty', `${y * depth}px`);
      });
    };

    const handleScroll = () => {
      setCarouselPointer((current) => ({ ...current, visible: false }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const beanPositions = [
    'right-[-2%] top-[12%] opacity-45 bean-large',
    'left-[4%] top-[26%] opacity-35 bean-small',
    'right-[12%] top-[38%] opacity-30 bean-medium',
    'left-[-3%] top-[52%] opacity-40 bean-medium',
    'right-[-2%] top-[64%] opacity-35 bean-small',
    'left-[10%] bottom-[12%] opacity-30 bean-large',
    'right-[20%] bottom-[8%] opacity-35 bean-small',
    'left-[42%] top-[8%] opacity-25 bean-small',
  ];

  useEffect(() => {
    try {
      const storedSfeerImages = window.localStorage.getItem('bonenbakkie-sfeer-gallery');
      const storedImages = storedSfeerImages ? JSON.parse(storedSfeerImages) as GalleryImage[] : [];
      const fallbackImages: GalleryImage[] = [
        { id: 'fallback-1', src: '/bonenbakkie1.jpeg', alt: "'t bonenbakkie koffiewagen" },
        { id: 'fallback-2', src: '/bonenbakkie2.png', alt: "Interieur van 't bonenbakkie" },
        { id: 'fallback-3', src: '/Logo_bonenbakkie.jpeg', alt: "Logo van 't bonenbakkie" },
      ];
      setCarouselImages(storedImages.filter((image) => image.src).length ? storedImages.filter((image) => image.src) : fallbackImages);

      const stored = window.localStorage.getItem('bonenbakkie-gallery-collections');
      if (stored) {
        const parsed = JSON.parse(stored) as GalleryCollection[];
        if (parsed.length) {
          setCollections(parsed);
        }
      }
    } catch {
      // fallback to empty state
    }
  }, []);

  const showPreviousSlide = () => {
    setActiveSlide((current) => (current - 1 + carouselImages.length) % carouselImages.length);
  };

  const showNextSlide = () => {
    setActiveSlide((current) => (current + 1) % carouselImages.length);
  };

  const handleCarouselPointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setCarouselPointer({
      x: event.clientX,
      y: event.clientY,
      direction: event.clientX < bounds.left + bounds.width / 2 ? 'left' : 'right',
      visible: true,
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <style>{`
        .sfeer-bean {
          position: absolute;
          z-index: 0;
          width: 5rem;
          height: 5rem;
          pointer-events: none;
          filter: blur(3px);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s;
          transform: translate(var(--tx, 0px), var(--ty, 0px)) rotate(var(--rot, 0deg));
          will-change: transform;
        }

        .bean-large { width: 8rem; height: 8rem; }
        .bean-medium { width: 6rem; height: 6rem; }
        .bean-small { width: 4.5rem; height: 4.5rem; }

        .carousel-hit-zone {
          cursor: none !important;
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(30,15,10,0.45)_150%)] pointer-events-none z-0" />
      <div className="absolute left-[5%] top-1/3 h-[70%] w-[60%] -translate-y-1/2 rounded-full bg-[#a37042] blur-[160px] opacity-20 pointer-events-none z-0" />
      {beanPositions.map((position, index) => (
        <div
          key={position}
          ref={(element) => { beanRefs.current[index] = element; }}
          className={`sfeer-bean ${position}`}
          style={{ ['--rot' as any]: `${[28, -18, 48, -32, 12, -8, 34, -24][index]}deg` }}
        >
          <img src="/Boontje.png" alt="" className="h-full w-full object-contain" />
        </div>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-16 fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-[#f8ede2] leading-tight">
            Proef de <span className="text-white">sfeer</span>
          </h1>
          <p className="text-lg text-[#ebdad0] max-w-2xl mx-auto leading-relaxed font-sans">
            Een beeld zegt meer dan duizend woorden. Bekijk hieronder impressies van onze koffiewagen in actie en de gezelligheid die we meebrengen.
          </p>
        </div>

        {carouselImages.length > 0 && (
          <section className="relative mb-24" aria-label="Uitgelichte sfeerfoto's">
            <div
              className="relative mx-auto h-[22rem] w-full max-w-5xl overflow-visible sm:h-[30rem]"
              onMouseMove={handleCarouselPointerMove}
              onMouseEnter={() => setCarouselPointer((current) => ({ ...current, visible: true }))}
              onMouseLeave={() => setCarouselPointer((current) => ({ ...current, visible: false }))}
            >
              {carouselImages.map((image, index) => (
                <img
                  key={image.id}
                  src={image.src}
                  alt={image.alt || `Uitgelichte sfeerfoto ${index + 1}`}
                  className={`absolute top-0 h-full w-[78%] rounded-[2rem] border border-white/20 object-cover shadow-[0_24px_50px_rgba(0,0,0,0.35)] transition-[left,transform,opacity] duration-700 ease-in-out ${
                    index === activeSlide
                      ? 'left-1/2 z-20 -translate-x-1/2 scale-100 opacity-100'
                      : index === (activeSlide + 1) % carouselImages.length
                        ? 'left-[70%] z-10 -translate-x-1/2 scale-[0.84] opacity-60'
                        : index === (activeSlide - 1 + carouselImages.length) % carouselImages.length
                          ? 'left-[30%] z-10 -translate-x-1/2 scale-[0.84] opacity-60'
                          : 'left-1/2 z-0 -translate-x-1/2 scale-[0.72] opacity-0'
                  }`}
                  aria-hidden={index !== activeSlide}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#140a07]/50 via-transparent to-transparent pointer-events-none" />

              {carouselImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousSlide}
                    aria-label="Vorige sfeerfoto"
                    className="carousel-hit-zone absolute inset-y-0 left-0 z-30 w-1/3"
                  >
                    <span className="sr-only">Vorige sfeerfoto</span>
                  </button>
                  <button
                    type="button"
                    onClick={showNextSlide}
                    aria-label="Volgende sfeerfoto"
                    className="carousel-hit-zone absolute inset-y-0 right-0 z-30 w-1/3"
                  >
                    <span className="sr-only">Volgende sfeerfoto</span>
                  </button>
                  <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
                    {carouselImages.map((image, index) => (
                      <button key={image.id} type="button" onClick={() => setActiveSlide(index)} aria-label={`Ga naar sfeerfoto ${index + 1}`} className={`h-2 rounded-full transition-all ${index === activeSlide ? 'w-8 bg-white' : 'w-2 bg-white/60 hover:bg-white'}`} />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div
              className={`pointer-events-none fixed z-[60] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f4f1ea] text-[#534026] shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-opacity duration-300 ${carouselPointer.visible ? 'opacity-100' : 'opacity-0'}`}
              style={{ left: carouselPointer.x, top: carouselPointer.y }}
              aria-hidden="true"
            >
              {carouselPointer.direction === 'left' ? <ArrowLeft size={26} /> : <ArrowRight size={26} />}
            </div>
          </section>
        )}

        {collections.length ? (
          <div className="mb-24 space-y-8">
            {collections.map((collection, collectionIndex) => (
              <section key={collection.id} className="fade-in-up" style={{ animationDelay: `${collectionIndex * 0.1}s` }}>
                  <div className="mb-6 rounded-[2rem] glass-card p-6 border border-white/10 bg-white/5 backdrop-blur-md">
                    <h2 className="text-3xl font-serif text-[#F5EFE7]">{collection.title}</h2>
                    <p className="mt-2 max-w-2xl text-[#ebdad0] font-sans">{collection.description}</p>
                  </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collection.images.map((item, index) => (
                    <div key={item.id} className="glass-card overflow-hidden group p-2 border border-white/10 bg-white/5">
                      <div className="relative overflow-hidden rounded-[1.5rem] h-full w-full">
                        <img src={item.src} alt={item.alt} className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${index % 2 === 0 ? 'h-72' : 'h-64'}`} />
                        <div className="absolute inset-0 bg-[#140a07]/0 group-hover:bg-[#140a07]/40 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Heart className="text-[#d4cab4] w-10 h-10 transform scale-50 group-hover:scale-100 transition-transform duration-500" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#140a07]/90 to-transparent p-5 text-[#f4f1ea]">
                          <p className="font-sans font-semibold uppercase tracking-[0.15em] text-[10px] sm:text-[11px] text-[#d4cab4] opacity-90 mb-2">
                            {collection.title}
                          </p>
                          <h3 className="text-xl font-serif text-[#F5EFE7]">{item.title || collection.title}</h3>
                          <p className="mt-1 text-sm opacity-90 text-[#ebdad0] font-sans">{item.description || collection.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            <div className="glass-card overflow-hidden group p-2 border border-white/10 bg-white/5 fade-in-up">
              <div className="relative overflow-hidden rounded-[1.5rem] h-full w-full">
                <img src="/bonenbakkie1.jpeg" alt="Voorbeeld foto" className="h-72 w-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#140a07]/90 to-transparent p-5 text-[#f4f1ea]">
                  <p className="font-sans font-semibold uppercase tracking-[0.15em] text-[10px] sm:text-[11px] text-[#d4cab4] opacity-90 mb-2">Sfeer</p>
                  <h3 className="text-xl font-serif text-[#F5EFE7]">Nog geen albums beschikbaar</h3>
                  <p className="mt-1 text-sm opacity-90 text-[#ebdad0] font-sans">Gebruik de instellingenpagina om albums en foto's toe te voegen.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default Sfeer;