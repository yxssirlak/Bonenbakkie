import React, { useEffect, useState } from 'react';
import { Camera, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type GalleryImage = {
  id: number;
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

  useEffect(() => {
    try {
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

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <Camera size={16} className="text-[#d4cab4]" />
            <span className="text-[#d4cab4] uppercase tracking-[0.15em] text-[11px] sm:text-[13px] font-semibold font-sans">
              Kijk mee
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-[#f8ede2] leading-tight">
            Proef de <span className="text-[#d4cab4]">sfeer</span>
          </h1>
          <p className="text-lg text-[#ebdad0] max-w-2xl mx-auto leading-relaxed font-sans">
            Een beeld zegt meer dan duizend woorden. Bekijk hieronder impressies van onze koffiewagen in actie, onze ambachtelijke koffie en de gezelligheid die we meebrengen.
          </p>
        </div>

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

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 sm:p-16 text-center fade-in-up shadow-2xl relative overflow-hidden">
          {/* De kleur van de gloed is hier aangepast naar rgba(212,202,180) wat overeenkomt met #d4cab4 */}
          <div className="absolute -inset-24 bg-[radial-gradient(ellipse_at_center,rgba(212,202,180,0.15),transparent_60%)]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif text-[#F5EFE7] mb-4">Zie jij jouw evenement hier al tussen staan?</h2>
            <p className="text-[#ebdad0] mb-8 max-w-2xl mx-auto font-sans">
              We brengen deze gezellige sfeer en premium koffie graag naar jouw locatie. Laten we samen iets moois neerzetten.
            </p>
            <Link to="/contact" className="coffee-btn inline-flex items-center gap-2 font-sans font-semibold uppercase tracking-[0.15em] text-[11px] sm:text-[13px] py-3 px-8">
              Check beschikbaarheid <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Sfeer;