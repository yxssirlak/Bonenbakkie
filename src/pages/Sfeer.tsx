import React from 'react';
import { Camera, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sfeer: React.FC = () => {
  // Voorbeeld galerij foto's. Vervang de src door je eigen foto's in de /public map!
  const galleryItems = [
    { id: 1, src: '/bonenbakkie1.jpeg', alt: 'De wagen in de zon', size: 'large' },
    { id: 2, src: '/bonenbakkie2.png', alt: 'Details van de espressomachine', size: 'small' },
    { id: 3, src: '/bonenbakkie1.jpeg', alt: 'Koffie op een evenement', size: 'small' },
    { id: 4, src: '/bonenbakkie2.png', alt: 'Gezellige opstelling met stoeltjes', size: 'large' },
    { id: 5, src: '/bonenbakkie1.jpeg', alt: 'Vers gezette cappuccino', size: 'small' },
    { id: 6, src: '/bonenbakkie2.png', alt: 'Tevreden klanten', size: 'small' },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Introductie Sectie */}
        <div className="text-center mb-16 fade-in-up">
          <div className="hero-pill mb-6 mx-auto inline-flex">
            <Camera size={16} className="text-[#D4A574]" />
            Kijk mee
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-[#f8ede2] leading-tight">
            Proef de <span className="text-[#D4A574]">sfeer</span>
          </h1>
          <p className="text-lg text-[#ebdad0] max-w-2xl mx-auto leading-relaxed">
            Een beeld zegt meer dan duizend woorden. Bekijk hieronder impressies van onze koffiewagen in actie, onze ambachtelijke koffie en de gezelligheid die we meebrengen.
          </p>
        </div>

        {/* Masonry-stijl Fotogalerij */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {galleryItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`glass-card overflow-hidden group p-2 fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-[1.5rem] h-full w-full">
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${item.size === 'large' ? 'h-80' : 'h-64'}`}
                />
                {/* Donkere overlay met hartje on hover */}
                <div className="absolute inset-0 bg-[#140a07]/0 group-hover:bg-[#140a07]/40 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Heart className="text-[#D4A574] w-10 h-10 transform scale-50 group-hover:scale-100 transition-transform duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Sectie Onderaan */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 sm:p-16 text-center fade-in-up shadow-2xl relative overflow-hidden">
          <div className="absolute -inset-24 bg-[radial-gradient(ellipse_at_center,rgba(212,165,116,0.15),transparent_60%)]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#F5EFE7] mb-4">Zie jij jouw evenement hier al tussen staan?</h2>
            <p className="text-[#ebdad0] mb-8 max-w-2xl mx-auto">
              We brengen deze gezellige sfeer en premium koffie graag naar jouw locatie. Laten we samen iets moois neerzetten.
            </p>
            <Link to="/contact" className="coffee-btn inline-flex items-center gap-2 text-lg">
              Check beschikbaarheid <ArrowRight size={20} />
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Sfeer;