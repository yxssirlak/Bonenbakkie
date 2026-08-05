import React from 'react';
import { Heart, Coffee } from 'lucide-react';

const About: React.FC = () => {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      {/* HIER ZIT DE FIX: data-nav-theme="dark" */}
      <section data-nav-theme="dark" className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <Heart size={16} className="text-[#d4cab4]" />
            <span className="text-[#d4cab4] uppercase tracking-[0.15em] text-[11px] sm:text-[13px] font-semibold font-sans">
              Ons Verhaal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#f8ede2] mb-6">Over Ons</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="glass-card fade-in-up border border-white/10 bg-white/5 p-8 sm:p-10 lg:p-12">
            <h2 className="text-3xl font-serif mb-8 text-[#F5EFE7]">Van droom naar werkelijkheid</h2>
            
            <p className="text-base sm:text-lg mb-6 leading-relaxed text-[#ebdad0] font-sans">
              Van beste vrienden naar collega’s: wij zijn Quinn en Renske, de oprichters van ’t bonenbakkie.
            </p>

            <p className="text-base sm:text-lg mb-6 leading-relaxed text-[#ebdad0] font-sans">
              Al voordat we aan de ondernemersopleiding begonnen, waren we beste vriendinnen. Tijdens deze opleiding hebben we veel samengewerkt en ontstond het idee om samen een eigen bedrijf te starten. Omdat we allebei gek zijn op koffie en graag genieten van een goed bakkie buiten de deur, was het idee voor een koffiekar snel geboren.
            </p>

            <p className="text-base sm:text-lg mb-6 leading-relaxed text-[#ebdad0] font-sans">
              Wat begon als een leuk plan, groeide uit tot een echte onderneming. We volgden verschillende cursussen, verdiepten ons in de wereld van koffie en gingen op zoek naar een koffiekar die bij ons paste. Toen we die hadden gevonden, hebben we hem opgeknapt en ingericht naar onze eigen stijl.
            </p>

            <p className="text-base sm:text-lg mb-6 leading-relaxed text-[#ebdad0] font-sans">
              Met veel enthousiasme, creativiteit en hard werken hebben we de kar omgetoverd tot het ’t Bonenbakkie zoals het vandaag de dag is. Nu gaan we samen op pad naar evenementen, bedrijfsfeesten, markten en andere gelegenheden om mensen te voorzien van heerlijke koffie en een gezellige sfeer.
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-[#ebdad0] font-sans">
              Met ’t Bonenbakkie combineren we onze passie voor koffie, onze vriendschap en ons ondernemerschap. Dat maakt dit avontuur voor ons extra bijzonder.
            </p>
          </div>
          
          <div className="relative fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 rounded-[2.5rem] transform rotate-3 bg-[#d4cab4]/20 blur-lg"></div>
            <div className="relative glass-card p-2 border border-white/10 bg-white/5">
              <div className="h-[36rem] rounded-[2rem] flex items-center justify-center bg-[#140a07]/50 overflow-hidden">
                {/* TIP: Super leuk om hier later een foto van jullie twee in te zetten! Bijv: <img src="/foto-quinn-renske.jpg" className="w-full h-full object-cover" /> */}
                <Coffee className="w-32 h-32 text-[#d4cab4] opacity-80" />
              </div>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
};

export default About;